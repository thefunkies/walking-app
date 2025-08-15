import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  Users,
  Award,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  TrendingUp
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  participants: number;
  daysLeft: number;
  progress: number;
  goal: number;
  currentSteps: number;
  reward: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'completed' | 'upcoming';
}

const ChallengesScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '10K Daily Challenge',
      description: 'Walk 10,000 steps every day this week',
      type: 'daily',
      participants: 156,
      daysLeft: 3,
      progress: 75,
      goal: 10000,
      currentSteps: 7500,
      reward: '🏆 Daily Champion Badge',
      icon: <Target size={24} color="#6366f1" />,
      color: '#6366f1',
      status: 'active'
    },
    {
      id: '2',
      title: 'Weekend Warriors',
      description: 'Complete 15,000 steps on weekends',
      type: 'weekly',
      participants: 89,
      daysLeft: 2,
      progress: 60,
      goal: 15000,
      currentSteps: 9000,
      reward: '🌟 Weekend Warrior Trophy',
      icon: <Trophy size={24} color="#f59e0b" />,
      color: '#f59e0b',
      status: 'active'
    },
    {
      id: '3',
      title: 'Morning Walkers',
      description: 'Walk 5,000 steps before 9 AM',
      type: 'daily',
      participants: 234,
      daysLeft: 5,
      progress: 90,
      goal: 5000,
      currentSteps: 4500,
      reward: '🌅 Early Bird Badge',
      icon: <Clock size={24} color="#10b981" />,
      color: '#10b981',
      status: 'active'
    },
    {
      id: '4',
      title: 'Monthly Marathon',
      description: 'Walk 300,000 steps this month',
      type: 'monthly',
      participants: 67,
      daysLeft: 15,
      progress: 45,
      goal: 300000,
      currentSteps: 135000,
      reward: '🏃‍♂️ Marathon Runner Medal',
      icon: <TrendingUp size={24} color="#ef4444" />,
      color: '#ef4444',
      status: 'active'
    },
    {
      id: '5',
      title: 'Community Challenge',
      description: 'Help your community reach 1M steps',
      type: 'special',
      participants: 456,
      daysLeft: 7,
      progress: 100,
      goal: 1000000,
      currentSteps: 1000000,
      reward: '🏘️ Community Hero Badge',
      icon: <Users size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      status: 'completed'
    }
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  const filteredChallenges = selectedFilter === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.status === selectedFilter);

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
      opacity.value = withTiming(0.8);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    };

    const getStatusColor = () => {
      switch (challenge.status) {
        case 'completed':
          return '#10b981';
        case 'upcoming':
          return '#f59e0b';
        default:
          return challenge.color;
      }
    };

    const getStatusText = () => {
      switch (challenge.status) {
        case 'completed':
          return 'Completed';
        case 'upcoming':
          return 'Upcoming';
        default:
          return 'Active';
      }
    };

    return (
      <Animated.View style={[styles.challengeCard, animatedStyle]}>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => console.log('Challenge pressed:', challenge.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
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
            
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}15` }]}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressValue}>{challenge.progress}%</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View style={styles.progressTrack}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${challenge.progress}%`, 
                      backgroundColor: challenge.color 
                    }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.stepsInfo}>
              <Text style={styles.stepsText}>
                {challenge.currentSteps.toLocaleString()} / {challenge.goal.toLocaleString()} steps
              </Text>
            </View>
          </View>
          
          <View style={styles.rewardSection}>
            <View style={styles.rewardInfo}>
              <Star size={16} color="#f59e0b" />
              <Text style={styles.rewardText}>{challenge.reward}</Text>
            </View>
            
            {challenge.status === 'active' && (
              <TouchableOpacity style={[styles.joinButton, { backgroundColor: challenge.color }]}>
                <Play size={16} color="#ffffff" />
                <Text style={styles.joinButtonText}>Continue</Text>
              </TouchableOpacity>
            )}
            
            {challenge.status === 'completed' && (
              <View style={styles.completedBadge}>
                <CheckCircle size={16} color="#10b981" />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenges</Text>
        <Text style={styles.subtitle}>Join walking challenges and earn rewards</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.challengesList} showsVerticalScrollIndicator={false}>
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {filteredChallenges.length === 0 
              ? 'No challenges found for this filter' 
              : 'Keep walking to unlock more challenges!'}
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  challengesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    fontSize: 18,
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  progressBar: {
    marginBottom: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stepsInfo: {
    alignItems: 'center',
  },
  stepsText: {
    fontSize: 12,
    color: '#64748b',
  },
  rewardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    gap: 6,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default ChallengesScreen;