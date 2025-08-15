import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Users, 
  Trophy, 
  Target, 
  Calendar, 
  Star,
  Award,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Footprints
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  company: string;
  steps: number;
  rank: number;
  achievements: number;
  level: number;
  isOnline: boolean;
}

interface CommunityStats {
  totalMembers: number;
  totalSteps: number;
  activeChallenges: number;
  averageSteps: number;
}

const CommunityScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'company' | 'friends' | 'leaders'>('all');

  const communityStats: CommunityStats = {
    totalMembers: 1247,
    totalSteps: 15478920,
    activeChallenges: 8,
    averageSteps: 12450
  };

  const communityMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      company: 'Tech University',
      steps: 12450,
      rank: 1,
      achievements: 15,
      level: 8,
      isOnline: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      company: 'Innovation Corp',
      steps: 11890,
      rank: 2,
      achievements: 12,
      level: 7,
      isOnline: true
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      company: 'Central High School',
      steps: 11230,
      rank: 3,
      achievements: 18,
      level: 9,
      isOnline: false
    },
    {
      id: '4',
      name: 'Alex (You)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      company: 'Tech University',
      steps: 10890,
      rank: 4,
      achievements: 10,
      level: 6,
      isOnline: true
    },
    {
      id: '5',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      company: 'Green Valley Community',
      steps: 10240,
      rank: 5,
      achievements: 8,
      level: 5,
      isOnline: false
    }
  ];

  const filters = [
    { key: 'all', label: 'All Members' },
    { key: 'company', label: 'My Company' },
    { key: 'friends', label: 'Friends' },
    { key: 'leaders', label: 'Leaders' },
  ];

  const filteredMembers = selectedFilter === 'all' 
    ? communityMembers 
    : selectedFilter === 'company'
    ? communityMembers.filter(member => member.company === 'Tech University')
    : selectedFilter === 'leaders'
    ? communityMembers.filter(member => member.rank <= 10)
    : communityMembers;

  const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) => {
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
          <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
            {icon}
          </View>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statLabel}>{title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const MemberCard = ({ member }: { member: CommunityMember }) => {
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

    const getRankColor = () => {
      switch (member.rank) {
        case 1:
          return '#fbbf24'; // Gold
        case 2:
          return '#9ca3af'; // Silver
        case 3:
          return '#cd7f32'; // Bronze
        default:
          return '#6366f1';
      }
    };

    return (
      <Animated.View style={[styles.memberCard, animatedStyle]}>
        <TouchableOpacity
          style={styles.memberContent}
          onPress={() => console.log('Member pressed:', member.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <View style={styles.memberHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: member.avatar }} style={styles.avatar} />
              {member.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.memberInfo}>
              <View style={styles.nameRow}>
                <Text style={[
                  styles.memberName,
                  member.name.includes('(You)') && styles.yourName
                ]}>
                  {member.name}
                </Text>
                <View style={[styles.rankBadge, { backgroundColor: `${getRankColor()}15` }]}>
                  <Text style={[styles.rankText, { color: getRankColor() }]}>#{member.rank}</Text>
                </View>
              </View>
              
              <Text style={styles.memberCompany}>{member.company}</Text>
              
              <View style={styles.memberStats}>
                <View style={styles.statItem}>
                  <Footprints size={12} color="#64748b" />
                  <Text style={styles.statText}>{member.steps.toLocaleString()} steps</Text>
                </View>
                <View style={styles.statItem}>
                  <Award size={12} color="#64748b" />
                  <Text style={styles.statText}>Level {member.level}</Text>
                </View>
                <View style={styles.statItem}>
                  <Trophy size={12} color="#64748b" />
                  <Text style={styles.statText}>{member.achievements} achievements</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.memberActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={16} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={16} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={16} color="#10b981" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Connect with fellow walkers</Text>
      </View>

      {/* Community Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Community Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Members"
            value={communityStats.totalMembers.toLocaleString()}
            icon={<Users size={20} color="#6366f1" />}
            color="#6366f1"
          />
          <StatCard
            title="Total Steps"
            value={(communityStats.totalSteps / 1000000).toFixed(1) + 'M'}
            icon={<Footprints size={20} color="#10b981" />}
            color="#10b981"
          />
          <StatCard
            title="Active Challenges"
            value={communityStats.activeChallenges.toString()}
            icon={<Trophy size={20} color="#f59e0b" />}
            color="#f59e0b"
          />
          <StatCard
            title="Avg Steps"
            value={communityStats.averageSteps.toLocaleString()}
            icon={<TrendingUp size={20} color="#ef4444" />}
            color="#ef4444"
          />
        </View>
      </View>

      {/* Filter Tabs */}
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

      {/* Members List */}
      <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {filteredMembers.length === 0 
              ? 'No members found for this filter' 
              : 'Keep walking to climb the ranks!'}
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
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
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
  membersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  memberContent: {
    padding: 16,
  },
  memberHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  memberInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginRight: 8,
  },
  yourName: {
    color: '#6366f1',
  },
  rankBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
  },
  memberCompany: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  memberStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
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

export default CommunityScreen;