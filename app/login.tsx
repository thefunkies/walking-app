import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Building, 
  Shield, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Footprints,
  Mail,
  Lock
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { router } from 'expo-router';

const LoginScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'individual' | 'company' | 'admin'>('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  const handlePressIn = () => {
    scaleValue.value = withSpring(0.95);
    opacityValue.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1);
    opacityValue.value = withTiming(1);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept any login
      if (selectedType === 'admin') {
        router.replace('/(tabs)/admin');
      } else {
        router.replace('/(tabs)');
      }
    }, 1500);
  };

  const handleSignUp = () => {
    if (selectedType === 'individual') {
      router.push('/signup-individual');
    } else if (selectedType === 'company') {
      router.push('/signup-company');
    }
  };

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Mail size={20} color="#64748b" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Lock size={20} color="#64748b" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isLoading}
      >
        <Animated.View style={[styles.loginButtonContent, animatedStyle]}>
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Text>
          <ArrowRight size={20} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Footprints size={48} color="#6366f1" />
          </View>
          <Text style={styles.title}>Walking Challenge</Text>
          <Text style={styles.subtitle}>Track your steps, join challenges, and stay active</Text>
        </View>

        {/* User Type Selection */}
        <View style={styles.typeContainer}>
          <Text style={styles.typeTitle}>Sign in as:</Text>
          
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'individual' && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType('individual')}
            >
              <User size={24} color={selectedType === 'individual' ? '#6366f1' : '#64748b'} />
              <Text style={[
                styles.typeButtonText,
                selectedType === 'individual' && styles.typeButtonTextActive
              ]}>
                Individual
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'company' && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType('company')}
            >
              <Building size={24} color={selectedType === 'company' ? '#6366f1' : '#64748b'} />
              <Text style={[
                styles.typeButtonText,
                selectedType === 'company' && styles.typeButtonTextActive
              ]}>
                Company
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'admin' && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType('admin')}
            >
              <Shield size={24} color={selectedType === 'admin' ? '#6366f1' : '#64748b'} />
              <Text style={[
                styles.typeButtonText,
                selectedType === 'admin' && styles.typeButtonTextActive
              ]}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Form */}
        {renderLoginForm()}

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Walking Challenge</Text>
          <Text style={styles.infoText}>
            Join walking challenges with your community, track your daily steps, 
            and compete with friends and colleagues. Connect your fitness devices 
            for accurate step tracking.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  typeContainer: {
    marginBottom: 32,
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  typeButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 8,
  },
  typeButtonTextActive: {
    color: '#6366f1',
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 16,
  },
  passwordToggle: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  loginButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 8,
  },
  signUpButton: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#64748b',
  },
  signUpLink: {
    color: '#6366f1',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
});

export default LoginScreen;