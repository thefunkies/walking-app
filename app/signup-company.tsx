import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Building, 
  Mail, 
  Lock, 
  MapPin, 
  Phone,
  Globe,
  Users,
  Eye, 
  EyeOff, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { router } from 'expo-router';

const SignupCompanyScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    companyType: '',
    description: '',
    contactPerson: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  const companyTypes = [
    'University',
    'School',
    'Gated Community',
    'Office',
    'Hospital',
    'Government',
    'Non-Profit',
    'Other'
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

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    updateFormData('companyType', type);
  };

  const validateForm = () => {
    if (!formData.companyName.trim()) {
      Alert.alert('Error', 'Please enter company name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter phone number');
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter address');
      return false;
    }
    if (!formData.city.trim()) {
      Alert.alert('Error', 'Please enter city');
      return false;
    }
    if (!formData.state.trim()) {
      Alert.alert('Error', 'Please enter state/province');
      return false;
    }
    if (!formData.zipCode.trim()) {
      Alert.alert('Error', 'Please enter ZIP/postal code');
      return false;
    }
    if (!formData.country.trim()) {
      Alert.alert('Error', 'Please enter country');
      return false;
    }
    if (!formData.companyType) {
      Alert.alert('Error', 'Please select company type');
      return false;
    }
    if (!formData.contactPerson.trim()) {
      Alert.alert('Error', 'Please enter contact person name');
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
        'Registration Submitted!',
        'Your company registration has been submitted for admin approval. You will receive an email once your account is approved.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login')
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
          <Text style={styles.title}>Register Company</Text>
          <Text style={styles.subtitle}>Join the walking challenge as an organization</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Company Name */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Building size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Company/Organization Name"
              value={formData.companyName}
              onChangeText={(value) => updateFormData('companyName', value)}
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
              placeholder="Business Email"
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
              placeholder="Business Phone"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Website */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Globe size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Website (optional)"
              value={formData.website}
              onChangeText={(value) => updateFormData('website', value)}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <MapPin size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={formData.address}
              onChangeText={(value) => updateFormData('address', value)}
              autoCapitalize="words"
            />
          </View>

          {/* City, State, ZIP */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={formData.city}
                onChangeText={(value) => updateFormData('city', value)}
                autoCapitalize="words"
              />
            </View>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={styles.input}
                placeholder="State/Province"
                value={formData.state}
                onChangeText={(value) => updateFormData('state', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={styles.input}
                placeholder="ZIP/Postal Code"
                value={formData.zipCode}
                onChangeText={(value) => updateFormData('zipCode', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={formData.country}
                onChangeText={(value) => updateFormData('country', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Company Type */}
          <View style={styles.typeContainer}>
            <Text style={styles.label}>Company Type</Text>
            <View style={styles.typeGrid}>
              {companyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.typeButtonActive
                  ]}
                  onPress={() => handleTypeSelect(type)}
                >
                  <Text style={[
                    styles.typeButtonText,
                    selectedType === type && styles.typeButtonTextActive
                  ]}>
                    {type}
                  </Text>
                  {selectedType === type && (
                    <CheckCircle size={16} color="#6366f1" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact Person */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Users size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Contact Person Name"
              value={formData.contactPerson}
              onChangeText={(value) => updateFormData('contactPerson', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Description */}
          <View style={styles.textAreaContainer}>
            <View style={styles.inputIcon}>
              <FileText size={20} color="#64748b" />
            </View>
            <TextInput
              style={styles.textArea}
              placeholder="Brief description of your organization (optional)"
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
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
                {isLoading ? 'Submitting...' : 'Submit Registration'}
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    minHeight: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  typeContainer: {
    marginBottom: 24,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '48%',
  },
  typeButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    flex: 1,
  },
  typeButtonTextActive: {
    color: '#6366f1',
  },
  checkIcon: {
    marginLeft: 4,
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

export default SignupCompanyScreen;