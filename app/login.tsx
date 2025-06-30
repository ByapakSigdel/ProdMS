import LoginScreen from '@/components/LoginScreen';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    router.replace('/(tabs)');
  };

  return <LoginScreen onLogin={handleLogin} />;
}
