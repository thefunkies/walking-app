import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Star, 
  Play, 
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import LoadingDemo from '@/components/LoadingDemo';
import FloatingActionButton from '@/components/FloatingActionButton';
import NotificationBanner from '@/components/NotificationBanner';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

interface ProgressCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Start Learning',
    subtitle: 'Begin a new session',
    icon: <Play size={24} color="#ffffff" />,
    color: '#6366f1',
    onPress: () => console.log('Start learning pressed')
  },
  {
    id: '2',
    title: 'Set Goal',
    subtitle: 'Create a new target',
    icon: <Target size={24} color="#ffffff" />,
    color: '#10b981',
    onPress: () => console.log('Set goal pressed')
  },
  {
    id: '3',
    title: 'View Progress',
    subtitle: 'Check your stats',
    icon: <TrendingUp size={24} color="#ffffff" />,
    color: '#f59e0b',
    onPress: () => console.log('View progress pressed')
  }
];

const progressCards: ProgressCard[] = [
  {
    id: '1',
    title: 'Daily Goal',
    value: '75%',
    subtitle: '3 of 4 tasks completed',
    icon: <Target size={20} color="#6366f1" />,
    color: '#6366f1',
    progress: 75
  },
  {
    id: '2',
    title: 'Weekly Streak',
    value: '5 days',
    subtitle: 'Keep it up!',
    icon: <Calendar size={20} color="#10b981" />,
    color: '#10b981',
    progress: 71
  },
  {
    id: '3',
    title: 'Points Earned',
    value: '1,247',
    subtitle: '+45 this week',
    icon: <Star size={20} color="#f59e0b" />,
    color: '#f59e0b',
    progress: 62
  }
];

const QuickActionCard = ({ action }: { action: QuickAction }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.quickActionCard, animatedStyle]}>
      <TouchableOpacity
        style={[styles.quickActionContent, { backgroundColor: action.color }]}
        onPress={action.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.quickActionIcon}>
          {action.icon}
        </View>
        <Text style={styles.quickActionTitle}>{action.title}</Text>
        <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ProgressCardComponent = ({ card }: { card: ProgressCard }) => {
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
    <Animated.View style={[styles.progressCard, animatedStyle]}>
      <TouchableOpacity
        style={styles.progressContent}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={styles.progressHeader}>
          <View style={[styles.progressIcon, { backgroundColor: `${card.color}15` }]}>
            {card.icon}
          </View>
          <Text style={styles.progressValue}>{card.value}</Text>
        </View>
        
        <Text style={styles.progressTitle}>{card.title}</Text>
        <Text style={styles.progressSubtitle}>{card.subtitle}</Text>
        
        <View style={styles.progressBar}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${card.progress}%`, 
                  backgroundColor: card.color 
                }
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const [user] = useState({
    name: 'Alex',
    greeting: 'Good morning'
  });

  const [notification, setNotification] = useState({
    visible: false,
    type: 'success' as const,
    title: '',
    message: ''
  });

  const showNotification = (type: 'success' | 'warning' | 'info' | 'error', title: string, message: string) => {
    setNotification({
      visible: true,
      type,
      title,
      message
    });
  };

  const handleQuickActionPress = (actionId: string) => {
    switch (actionId) {
      case 'goal':
        showNotification('info', 'Set Goal', 'Goal setting feature coming soon!');
        break;
      case 'learn':
        showNotification('success', 'Start Learning', 'Learning session started!');
        break;
      case 'progress':
        showNotification('info', 'View Progress', 'Redirecting to progress view...');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationBanner
        type={notification.type}
        title={notification.title}
        message={notification.message}
        visible={notification.visible}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
        autoHide={true}
        duration={3000}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <Text style={styles.greeting}>{user.greeting}, {user.name}! 👋</Text>
            <Text style={styles.welcomeSubtitle}>Ready to achieve your goals today?</Text>
          </View>
          
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressGrid}>
            {progressCards.map((card) => (
              <ProgressCardComponent key={card.id} card={card} />
            ))}
          </View>
        </View>

        {/* Loading Animations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Loading Animations</Text>
            <Text style={styles.sectionSubtitle}>Beautiful loading states for your app</Text>
          </View>
          
          <LoadingDemo />
        </View>
      </ScrollView>

      <FloatingActionButton
        showQuickActions={true}
        onQuickActionPress={handleQuickActionPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingBottom: 24,
  },
  welcomeHeader: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
  },
  quickActionContent: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginRight: 4,
  },
  progressGrid: {
    gap: 12,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressContent: {
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  progressBar: {
    marginTop: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});