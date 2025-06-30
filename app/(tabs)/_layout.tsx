import { Tabs } from "expo-router";

import { ScrollableTabBar } from "@/components/ScrollableTabBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <ScrollableTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="links"
        options={{
          title: "Links",
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
