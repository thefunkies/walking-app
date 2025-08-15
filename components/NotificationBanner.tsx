import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

interface NotificationBannerProps {
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
  autoHide?: boolean;
  duration?: number;
  visible: boolean;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type,
  title,
  message,
  onClose,
  autoHide = true,
  duration = 5000,
  visible
}) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f59e0b" />;
      case 'error':
        return <AlertTriangle size={20} color="#ef4444" />;
      case 'info':
        return <Info size={20} color="#6366f1" />;
      default:
        return <Bell size={20} color="#6366f1" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#f0fdf4';
      case 'warning':
        return '#fffbeb';
      case 'error':
        return '#fef2f2';
      case 'info':
        return '#f0f9ff';
      default:
        return '#f8fafc';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      case 'info':
        return '#6366f1';
      default:
        return '#e2e8f0';
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const showNotification = () => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const hideNotification = () => {
    translateY.value = withSpring(-100, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withSpring(0.8, { damping: 15, stiffness: 150 });
  };

  const handleClose = () => {
    hideNotification();
    if (onClose) {
      setTimeout(() => {
        runOnJS(onClose)();
      }, 300);
    }
  };

  useEffect(() => {
    if (visible) {
      showNotification();
      
      if (autoHide) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      hideNotification();
    }
  }, [visible, autoHide, duration]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[
        styles.banner,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor()
        }
      ]}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <X size={16} color="#64748b" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});

export default NotificationBanner;