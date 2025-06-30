import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function ScrollableTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getTabIcon = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "house.fill";
      case "calendar":
        return "calendar";
      case "links":
        return "link";
      case "projects":
        return "folder.fill";
      case "profile":
        return "person.fill";
      default:
        return "circle";
    }
  };

  const getTabTitle = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "Dashboard";
      case "calendar":
        return "Calendar";
      case "links":
        return "Links";
      case "projects":
        return "Projects";
      case "profile":
        return "Profile";
      default:
        return routeName;
    }
  };

  const onTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // Add haptic feedback
      if (process.env.EXPO_OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.tabIconDefault,
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconName = getTabIcon(route.name);
          const title = getTabTitle(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => onTabPress(route, isFocused)}
              style={[
                styles.tabItem,
                isFocused && { backgroundColor: colors.tint + "20" },
              ]}
              activeOpacity={0.7}
            >
              <IconSymbol
                size={24}
                name={iconName}
                color={isFocused ? colors.tint : colors.tabIconDefault}
              />
              <ThemedText
                style={[
                  styles.tabLabel,
                  { color: isFocused ? colors.tint : colors.tabIconDefault },
                ]}
              >
                {title}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
    minWidth: screenWidth,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    minWidth: 80,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});
