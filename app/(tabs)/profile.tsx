import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Edit3, 
  Settings, 
  Award, 
  Target, 
  Calendar, 
  Star,
  Trophy,
  TrendingUp,
  BookOpen,
  Clock,
  ChevronRight,
  Share2,
  Heart,
  MessageCircle
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress?: number;
}

const stats: StatItem[] = [
  {
    id: '1',
    label: 'Days Active',
    value: '23',
    icon: <Calendar size={20} color="#6366f1" />,
    color: '#6366f1'
  },
  {
    id: '2',
    label: 'Points Earned',
    value: '1,247',
    icon: <Star size={20} color="#f59e0b" />,
    color: '#f59e0b'
  },
  {
    id: '3',
    label: 'Goals Completed',
    value: '8',
    icon: <Target size={20} color="#10b981" />,
    color: '#10b981'
  },
  {
    id: '4',
    label: 'Study Hours',
    value: '47.5',
    icon: <Clock size={20} color="#ef4444" />,
    color: '#ef4444'
  }
];

const achievements: AchievementItem[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete 5 morning sessions',
    icon: <BookOpen size={24} color="#10b981" />,
    color: '#10b981',
    unlocked: true
  },
  {
    id: '2',
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: <TrendingUp size={24} color="#6366f1" />,
    color: '#6366f1',
    unlocked: true
  },
  {
    id: '3',
    title: 'Goal Crusher',
    description: 'Complete 10 goals',
    icon: <Target size={24} color="#f59e0b" />,
    color: '#f59e0b',
    unlocked: false,
    progress: 80
  },
  {
    id: '4',
    title: 'Social Butterfly',
    description: 'Share 5 achievements',
    icon: <Share2 size={24} color="#ef4444" />,
    color: '#ef4444',
    unlocked: false,
    progress: 60
  }
];

const StatCard = ({ stat }: { stat: StatItem }) => {
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
    <Animated.View style={[styles.statCard, animatedStyle]}>
      <TouchableOpacity
        style={styles.statContent}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
          {stat.icon}
        </View>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const AchievementCard = ({ achievement }: { achievement: AchievementItem }) => {
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
    <Animated.View style={[styles.achievementCard, animatedStyle]}>
      <TouchableOpacity
        style={styles.achievementContent}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={[
          styles.achievementIcon, 
          { 
            backgroundColor: achievement.unlocked ? `${achievement.color}15` : '#f1f5f9',
            opacity: achievement.unlocked ? 1 : 0.5
          }
        ]}>
          {achievement.icon}
        </View>
        
        <View style={styles.achievementInfo}>
          <Text style={[
            styles.achievementTitle,
            !achievement.unlocked && styles.achievementTitleLocked
          ]}>
            {achievement.title}
          </Text>
          <Text style={styles.achievementDescription}>{achievement.description}</Text>
          
          {!achievement.unlocked && achievement.progress && (
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${achievement.progress}%`, backgroundColor: achievement.color }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{achievement.progress}%</Text>
            </View>
          )}
        </View>
        
        {achievement.unlocked && (
          <Trophy size={16} color={achievement.color} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ProfileScreen() {
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Passionate learner and goal achiever. Always striving to improve and grow.',
    level: 12,
    experience: 75
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userBio}>{user.bio}</Text>
          
          <View style={styles.levelContainer}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Level {user.level}</Text>
              <Text style={styles.experienceText}>{user.experience}/100 XP</Text>
            </View>
            <View style={styles.levelProgress}>
              <View style={styles.levelTrack}>
                <View style={[styles.levelFill, { width: `${user.experience}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Settings size={20} color="#6366f1" />
              </View>
              <Text style={styles.actionText}>Settings</Text>
              <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Share2 size={20} color="#10b981" />
              </View>
              <Text style={styles.actionText}>Share Profile</Text>
              <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Heart size={20} color="#ef4444" />
              </View>
              <Text style={styles.actionText}>Support Us</Text>
              <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  levelContainer: {
    width: '100%',
    maxWidth: 300,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  experienceText: {
    fontSize: 14,
    color: '#64748b',
  },
  levelProgress: {
    width: '100%',
  },
  levelTrack: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
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
    marginBottom: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#9ca3af',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    minWidth: 30,
  },
  actionsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
});