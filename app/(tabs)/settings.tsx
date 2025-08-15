import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  Moon, 
  Sun, 
  Palette, 
  Shield, 
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  User,
  Smartphone,
  Globe,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Download,
  Trash2
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout pressed') }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'This will permanently delete all your data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear Data', style: 'destructive', onPress: () => console.log('Clear data pressed') }
      ]
    );
  };

  const settingsSections: SettingSection[] = [
    {
      id: 'notifications',
      title: 'Notifications',
      items: [
        {
          id: 'push_notifications',
          title: 'Push Notifications',
          subtitle: 'Receive notifications about your progress',
          icon: <Bell size={20} color="#6366f1" />,
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications
        },
        {
          id: 'sound',
          title: 'Sound',
          subtitle: 'Play sounds for notifications',
          icon: notifications ? <Volume2 size={20} color="#10b981" /> : <VolumeX size={20} color="#9ca3af" />,
          type: 'toggle',
          value: soundEnabled,
          onToggle: setSoundEnabled
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      items: [
        {
          id: 'dark_mode',
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          icon: darkMode ? <Moon size={20} color="#6366f1" /> : <Sun size={20} color="#f59e0b" />,
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode
        },
        {
          id: 'theme',
          title: 'Theme',
          subtitle: 'Customize app colors',
          icon: <Palette size={20} color="#8b5cf6" />,
          type: 'navigation',
          onPress: () => console.log('Theme pressed')
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      items: [
        {
          id: 'biometric',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face ID to unlock',
          icon: <Shield size={20} color="#ef4444" />,
          type: 'toggle',
          value: biometricAuth,
          onToggle: setBiometricAuth
        },
        {
          id: 'privacy_settings',
          title: 'Privacy Settings',
          subtitle: 'Manage your data and privacy',
          icon: <Eye size={20} color="#6366f1" />,
          type: 'navigation',
          onPress: () => console.log('Privacy settings pressed')
        }
      ]
    },
    {
      id: 'data',
      title: 'Data & Storage',
      items: [
        {
          id: 'auto_sync',
          title: 'Auto Sync',
          subtitle: 'Automatically sync your data',
          icon: <Globe size={20} color="#10b981" />,
          type: 'toggle',
          value: autoSync,
          onToggle: setAutoSync
        },
        {
          id: 'wifi_only',
          title: 'WiFi Only',
          subtitle: 'Only sync when connected to WiFi',
          icon: wifiOnly ? <Wifi size={20} color="#10b981" /> : <WifiOff size={20} color="#9ca3af" />,
          type: 'toggle',
          value: wifiOnly,
          onToggle: setWifiOnly
        },
        {
          id: 'export_data',
          title: 'Export Data',
          subtitle: 'Download your data as backup',
          icon: <Download size={20} color="#6366f1" />,
          type: 'action',
          onPress: () => console.log('Export data pressed')
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: <HelpCircle size={20} color="#6366f1" />,
          type: 'navigation',
          onPress: () => console.log('Help pressed')
        },
        {
          id: 'about',
          title: 'About',
          subtitle: 'App version and information',
          icon: <Info size={20} color="#64748b" />,
          type: 'navigation',
          onPress: () => console.log('About pressed')
        }
      ]
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          icon: <User size={20} color="#6366f1" />,
          type: 'navigation',
          onPress: () => console.log('Edit profile pressed')
        },
        {
          id: 'clear_data',
          title: 'Clear All Data',
          subtitle: 'Permanently delete all your data',
          icon: <Trash2 size={20} color="#ef4444" />,
          type: 'action',
          onPress: handleClearData
        },
        {
          id: 'logout',
          title: 'Logout',
          subtitle: 'Sign out of your account',
          icon: <LogOut size={20} color="#ef4444" />,
          type: 'action',
          onPress: handleLogout
        }
      ]
    }
  ];

  const SettingItemComponent = ({ item }: { item: SettingItem }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <Animated.View style={[styles.settingItem, animatedStyle]}>
        <TouchableOpacity
          style={styles.settingContent}
          onPress={item.onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          disabled={item.type === 'toggle'}
        >
          <View style={styles.settingIcon}>
            {item.icon}
          </View>
          
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
          
          {item.type === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#e2e8f0', true: '#6366f1' }}
              thumbColor={item.value ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#e2e8f0"
            />
          )}
          
          {item.type === 'navigation' && (
            <ChevronRight size={16} color="#9ca3af" />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <SettingItemComponent key={item.id} item={item} />
              ))}
            </View>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
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
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});