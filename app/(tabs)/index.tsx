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
  ChevronRight,
  Trophy,
  Users,
  MapPin,
  Clock
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import StepTracker from '@/components/StepTracker';
import FloatingActionButton from '@/components/FloatingActionButton';
import NotificationBanner from '@/components/NotificationBanner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  steps: number;
  rank: number;
  avatar: string;
}

const WalkingChallengeApp: React.FC = () => {
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

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '10K Daily Challenge',
      description: 'Walk 10,000 steps every day this week',
      participants: 156,
      daysLeft: 3,
      progress: 75,
      icon: <Target size={20} color="#6366f1" />,
      color: '#6366f1'
    },
    {
      id: '2',
      title: 'Weekend Warriors',
      description: 'Complete 15,000 steps on weekends',
      participants: 89,
      daysLeft: 2,
      progress: 60,
      icon: <Trophy size={20} color="#f59e0b" />,
      color: '#f59e0b'
    },
    {
      id: '3',
      title: 'Morning Walkers',
      description: 'Walk 5,000 steps before 9 AM',
      participants: 234,
      daysLeft: 5,
      progress: 90,
      icon: <Clock size={20} color="#10b981" />,
      color: '#10b981'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Sarah Johnson', steps: 12450, rank: 1, avatar: '👑' },
    { id: '2', name: 'Mike Chen', steps: 11890, rank: 2, avatar: '🥈' },
    { id: '3', name: 'Emma Davis', steps: 11230, rank: 3, avatar: '🥉' },
    { id: '4', name: 'Alex (You)', steps: 10890, rank: 4, avatar: '👤' },
    { id: '5', name: 'David Wilson', steps: 10240, rank: 5, avatar: '👤' }
  ];

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
        showNotification('success', 'Start Walking', 'Step tracking activated!');
        break;
      case 'progress':
        showNotification('info', 'View Progress', 'Redirecting to progress view...');
        break;
    }
  };

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
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
      <Animated.View style={[styles.challengeCard, animatedStyle]}>
        <TouchableOpacity
          style={styles.challengeContent}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <View style={[styles.challengeIcon, { backgroundColor: `${challenge.color}15` }]}>
            {challenge.icon}
          </View>
          
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            
            <View style={styles.challengeMeta}>
              <View style={styles.metaItem}>
                <Users size={12} color="#64748b" />
                <Text style={styles.metaText}>{challenge.participants} participants</Text>
              </View>
              <View style={styles.metaItem}>
                <Calendar size={12} color="#64748b" />
                <Text style={styles.metaText}>{challenge.daysLeft} days left</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.challengeProgress}>
            <Text style={styles.progressText}>{challenge.progress}%</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${challenge.progress}%`, backgroundColor: challenge.color }
                ]} 
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const LeaderboardItem = ({ entry, index }: { entry: LeaderboardEntry; index: number }) => {
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
      <Animated.View style={[styles.leaderboardItem, animatedStyle]}>
        <TouchableOpacity
          style={styles.leaderboardContent}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{entry.rank}</Text>
            <Text style={styles.avatarText}>{entry.avatar}</Text>
          </View>
          
          <View style={styles.leaderboardInfo}>
            <Text style={[
              styles.leaderboardName,
              entry.name.includes('(You)') && styles.yourName
            ]}>
              {entry.name}
            </Text>
            <Text style={styles.leaderboardSteps}>{entry.steps.toLocaleString()} steps</Text>
          </View>
          
          {entry.rank <= 3 && (
            <View style={[styles.medal, { backgroundColor: entry.rank === 1 ? '#fbbf24' : entry.rank === 2 ? '#9ca3af' : '#cd7f32' }]}>
              <Trophy size={16} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
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
            <Text style={styles.welcomeSubtitle}>Ready to walk your way to better health?</Text>
          </View>
        </View>

        {/* Step Tracker */}
        <StepTracker />

        {/* Active Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.challengesList}>
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Leaderboard</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.leaderboardContainer}>
            {leaderboard.map((entry, index) => (
              <LeaderboardItem key={entry.id} entry={entry} index={index} />
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TrendingUp size={20} color="#10b981" />
              </View>
              <Text style={styles.statValue}>68,450</Text>
              <Text style={styles.statLabel}>Total Steps</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MapPin size={20} color="#f59e0b" />
              </View>
              <Text style={styles.statValue}>54.8 km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Star size={20} color="#ef4444" />
              </View>
              <Text style={styles.statValue}>2,738</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Award size={20} color="#8b5cf6" />
              </View>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Challenges</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <FloatingActionButton
        showQuickActions={true}
        onQuickActionPress={handleQuickActionPress}
      />
    </SafeAreaView>
  );
};

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
    paddingBottom: 16,
  },
  welcomeHeader: {
    marginBottom: 16,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginRight: 4,
  },
  challengesList: {
    gap: 12,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  challengeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
  },
  challengeProgress: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  leaderboardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  leaderboardItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  avatarText: {
    fontSize: 20,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  yourName: {
    color: '#6366f1',
    fontWeight: '700',
  },
  leaderboardSteps: {
    fontSize: 14,
    color: '#64748b',
  },
  medal: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
});

export default WalkingChallengeApp;