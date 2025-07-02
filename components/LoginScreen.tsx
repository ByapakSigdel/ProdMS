import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase'; // Import your supabase client

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      if (data.user) {
        onLogin();
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        Alert.alert('Sign Up Failed', error.message);
        return;
      }

      if (data.user) {
        Alert.alert(
          'Success', 
          'Account created successfully! Please check your email for verification.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50 justify-center"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="mx-8 p-6 bg-white rounded-xl shadow-lg">
        <Text className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </Text>
        <Text className="text-base text-center mb-8 text-gray-600">
          Please sign in to continue
        </Text>
       
        <View className="mb-5">
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-4 text-base bg-gray-50"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!loading}
          />
         
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-4 text-base bg-gray-50"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </View>
       
        <TouchableOpacity 
          className={`bg-blue-500 rounded-lg p-4 items-center mb-4 min-h-[50px] justify-center ${loading ? 'opacity-60' : ''}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-base font-bold">Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className={`bg-transparent rounded-lg p-4 items-center border border-blue-500 ${loading ? 'opacity-60' : ''}`}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-blue-500 text-sm font-medium">
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;