import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar, 
  Clock, 
  Heart,
  MessageCircle,
  Share2,
  ChevronRight
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

interface ActivityItem {
  id: string;
  type: 'achievement' | 'goal' | 'milestone' | 'reminder';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
  likes?: number;
  comments?: number;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Completed 7-day streak!',
    description: 'You\'ve maintained your daily goal for a full week',
    timestamp: '2 hours ago',
    icon: <Award size={20} color="#10b981" />,
    color: '#10b981',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    type: 'goal',
    title: 'New goal set: Learn React Native',
    description: 'Target: Complete 3 projects by end of month',
    timestamp: '1 day ago',
    icon: <Target size={20} color="#6366f1" />,
    color: '#6366f1',
    likes: 8,
    comments: 1
  },
  {
    id: '3',
    type: 'milestone',
    title: 'Reached 1000 points!',
    description: 'You\'ve earned the "Dedicated Learner" badge',
    timestamp: '3 days ago',
    icon: <TrendingUp size={20} color="#f59e0b" />,
    color: '#f59e0b',
    likes: 24,
    comments: 7
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Daily check-in reminder',
    description: 'Don\'t forget to log your progress today',
    timestamp: '5 days ago',
    icon: <Calendar size={20} color="#ef4444" />,
    color: '#ef4444'
  }
];

const ActivityCard = ({ activity, onPress }: { activity: ActivityItem; onPress: () => void }) => {
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

  return (
    <Animated.View style={[styles.activityCard, animatedStyle]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${activity.color}15` }]}>
          {activity.icon}
        </View>
        
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          
          <View style={styles.activityMeta}>
            <View style={styles.timestampContainer}>
              <Clock size={12} color="#9ca3af" />
              <Text style={styles.timestamp}>{activity.timestamp}</Text>
            </View>
            
            {(activity.likes || activity.comments) && (
              <View style={styles.interactions}>
                {activity.likes && (
                  <View style={styles.interactionItem}>
                    <Heart size={12} color="#ef4444" />
                    <Text style={styles.interactionText}>{activity.likes}</Text>
                  </View>
                )}
                {activity.comments && (
                  <View style={styles.interactionItem}>
                    <MessageCircle size={12} color="#6366f1" />
                    <Text style={styles.interactionText}>{activity.comments}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        
        <ChevronRight size={16} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ActivityScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'achievement', label: 'Achievements' },
    { key: 'goal', label: 'Goals' },
    { key: 'milestone', label: 'Milestones' },
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.subtitle}>Your recent progress and achievements</Text>
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
              onPress={() => setSelectedFilter(filter.key)}
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

      <ScrollView style={styles.activitiesList} showsVerticalScrollIndicator={false}>
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onPress={() => console.log('Activity pressed:', activity.id)}
          />
        ))}
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {filteredActivities.length === 0 
              ? 'No activities found for this filter' 
              : 'You\'re all caught up!'}
          </Text>
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
  activitiesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  interactionText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
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