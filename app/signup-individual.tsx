import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Calendar, 
  Building,
  Eye, 
  EyeOff, 
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { router } from 'expo-router';

interface Company {
  id: string;
  name: string;
  type: string;
}

const SignupIndividualScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    companyId: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | ''>('');

  // Mock companies data
  const companies: Company[] = [
    { id: '1', name: 'Tech University', type: 'University' },
    { id: '2', name: 'Central High School', type: 'School' },
    { id: '3', name: 'Green Valley Community', type: 'Gated Community' },
    { id: '4', name: 'Innovation Corp', type: 'Office' },
    { id: '5', name: 'City Hospital', type: 'Hospital' }
  ];

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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender: 'male' | 'female' | 'other') => {
    setSelectedGender(gender);
    updateFormData('gender', gender);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!formData.dateOfBirth) {
      Alert.alert('Error', 'Please select your date of birth');
      return false;
    }
    if (!formData.gender) {
      Alert.alert('Error', 'Please select your gender');
      return false;
    }
    if (!formData.companyId) {
      Alert.alert('Error', 'Please select your company/organization');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success!',
        'Your account has been created successfully. Please check your email for verification.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#64748b" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the walking challenge community</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Phone size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Calendar size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (MM/DD/YYYY)"
              value={formData.dateOfBirth}
              onChangeText={(value) => updateFormData('dateOfBirth', value)}
            />
          </View>

          {/* Gender Selection */}
          <View style={styles.genderContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderButtons}>
              {['male', 'female', 'other'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    selectedGender === gender && styles.genderButtonActive
                  ]}
                  onPress={() => handleGenderSelect(gender as 'male' | 'female' | 'other')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    selectedGender === gender && styles.genderButtonTextActive
                  ]}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                  {selectedGender === gender && (
                    <CheckCircle size={16} color="#6366f1" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Company Selection */}
          <View style={styles.companyContainer}>
            <Text style={styles.label}>Company/Organization</Text>
            <View style={styles.companyDropdown}>
              {companies.map((company) => (
                <TouchableOpacity
                  key={company.id}
                  style={[
                    styles.companyOption,
                    formData.companyId === company.id && styles.companyOptionActive
                  ]}
                  onPress={() => updateFormData('companyId', company.id)}
                >
                  <View style={styles.companyInfo}>
                    <Text style={[
                      styles.companyName,
                      formData.companyId === company.id && styles.companyNameActive
                    ]}>
                      {company.name}
                    </Text>
                    <Text style={styles.companyType}>{company.type}</Text>
                  </View>
                  {formData.companyId === company.id && (
                    <CheckCircle size={20} color="#6366f1" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isLoading}
          >
            <Animated.View style={[styles.signUpButtonContent, animatedStyle]}>
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
              <ArrowRight size={20} color="#ffffff" />
            </Animated.View>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLinkText}>Sign in</Text>
            </Text>
          </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  genderContainer: {
    marginBottom: 24,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  genderButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  genderButtonTextActive: {
    color: '#6366f1',
  },
  checkIcon: {
    marginLeft: 8,
  },
  companyContainer: {
    marginBottom: 24,
  },
  companyDropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  companyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  companyOptionActive: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  companyNameActive: {
    color: '#6366f1',
  },
  companyType: {
    fontSize: 14,
    color: '#64748b',
  },
  signUpButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  signUpButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 8,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#64748b',
  },
  loginLinkText: {
    color: '#6366f1',
    fontWeight: '600',
  },
});

export default SignupIndividualScreen;