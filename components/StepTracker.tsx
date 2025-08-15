import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { 
  Footprints, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock,
  Trophy,
  Zap,
  MapPin
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withRepeat,
  interpolate,
  Easing
} from 'react-native-reanimated';

import * as Location from 'expo-location';
import * as Device from 'expo-device';

interface StepData {
  steps: number;
  goal: number;
  distance: number;
  calories: number;
  activeMinutes: number;
  streak: number;
}

const StepTracker: React.FC = () => {
  const [stepData, setStepData] = useState<StepData>({
    steps: 0,
    goal: 10000,
    distance: 0,
    calories: 0,
    activeMinutes: 0,
    streak: 7
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  const progressValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);
  const rotationValue = useSharedValue(0);

  // Animated styles
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationValue.value}deg` }],
  }));

  // Request permissions and initialize step tracking
  useEffect(() => {
    initializeStepTracking();
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Pulse animation for the main step counter
    pulseValue.value = withRepeat(
      withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Rotation animation for the trophy icon
    rotationValue.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );
  };

  const initializeStepTracking = async () => {
    try {
      // Request location permissions
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (locationStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is needed to track your steps accurately.',
          [{ text: 'OK' }]
        );
        return;
      }

      // For now, use mock data since expo-health is not available
      setHasPermission(true);
      await fetchTodaySteps();
    } catch (error) {
      console.error('Error initializing step tracking:', error);
      // Fallback to mock data for demo purposes
      setMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodaySteps = async () => {
    try {
      // For demo purposes, use mock data
      // In a real app, this would integrate with HealthKit, Google Fit, or other health APIs
      setMockData();
    } catch (error) {
      console.error('Error fetching step data:', error);
      setMockData();
    }
  };

  const setMockData = () => {
    const mockSteps = Math.floor(Math.random() * 15000) + 2000;
    const mockData = {
      steps: mockSteps,
      goal: 10000,
      distance: mockSteps * 0.0008, // Rough conversion to km
      calories: mockSteps * 0.04, // Rough conversion to calories
      activeMinutes: Math.floor(mockSteps / 100),
      streak: 7
    };
    setStepData(mockData);
    updateProgress(mockSteps, 10000);
  };

  const updateProgress = (steps: number, goal: number) => {
    const progress = Math.min((steps / goal) * 100, 100);
    progressValue.value = withSpring(progress, { damping: 15, stiffness: 100 });
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  const formatCalories = (calories: number): string => {
    return `${Math.round(calories)} cal`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.loadingIcon, rotationStyle]}>
          <Footprints size={40} color="#6366f1" />
        </Animated.View>
        <Text style={styles.loadingText}>Loading step data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Main Step Counter */}
      <View style={styles.mainCounter}>
        <Animated.View style={[styles.stepIcon, pulseStyle]}>
          <Footprints size={48} color="#6366f1" />
        </Animated.View>
        
        <Text style={styles.stepCount}>{formatNumber(stepData.steps)}</Text>
        <Text style={styles.stepLabel}>steps today</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressStyle]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round((stepData.steps / stepData.goal) * 100)}% of daily goal
          </Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={20} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{formatNumber(stepData.goal)}</Text>
          <Text style={styles.statLabel}>Daily Goal</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <MapPin size={20} color="#f59e0b" />
          </View>
          <Text style={styles.statValue}>{formatDistance(stepData.distance)}</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Zap size={20} color="#ef4444" />
          </View>
          <Text style={styles.statValue}>{formatCalories(stepData.calories)}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Clock size={20} color="#8b5cf6" />
          </View>
          <Text style={styles.statValue}>{stepData.activeMinutes}m</Text>
          <Text style={styles.statLabel}>Active Time</Text>
        </View>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <Animated.View style={[styles.streakIcon, rotationStyle]}>
          <Trophy size={24} color="#f59e0b" />
        </Animated.View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakTitle}>Current Streak</Text>
          <Text style={styles.streakValue}>{stepData.streak} days</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchTodaySteps}>
          <TrendingUp size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  mainCounter: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepIcon: {
    marginBottom: 16,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  streakIcon: {
    marginRight: 16,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#92400e',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default StepTracker;