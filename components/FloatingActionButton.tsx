import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Plus, Target, BookOpen, TrendingUp, X } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withSequence,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

interface FloatingActionButtonProps {
  onPress?: () => void;
  onQuickActionPress?: (action: string) => void;
  showQuickActions?: boolean;
}

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  onQuickActionPress,
  showQuickActions = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const quickActions: QuickAction[] = [
    {
      id: 'goal',
      icon: <Target size={20} color="#ffffff" />,
      label: 'Set Goal',
      color: '#10b981'
    },
    {
      id: 'learn',
      icon: <BookOpen size={20} color="#ffffff" />,
      label: 'Start Learning',
      color: '#6366f1'
    },
    {
      id: 'progress',
      icon: <TrendingUp size={20} color="#ffffff" />,
      label: 'View Progress',
      color: '#f59e0b'
    }
  ];

  const mainButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const quickActionStyle = (index: number) => useAnimatedStyle(() => {
    const translateY = interpolate(
      rotation.value,
      [0, 1],
      [0, -(index + 1) * 60],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      rotation.value,
      [0, 0.5, 1],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      rotation.value,
      [0, 0.5, 1],
      [0.5, 0.8, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateY },
        { scale }
      ],
      opacity,
    };
  });

  const handlePress = () => {
    if (showQuickActions) {
      if (isExpanded) {
        // Collapse
        rotation.value = withSpring(0, { damping: 15, stiffness: 150 });
        scale.value = withSpring(1);
        setIsExpanded(false);
      } else {
        // Expand
        rotation.value = withSpring(45, { damping: 15, stiffness: 150 });
        scale.value = withSequence(
          withSpring(1.1, { duration: 100 }),
          withSpring(1, { duration: 100 })
        );
        setIsExpanded(true);
      }
    } else {
      // Simple press animation
      scale.value = withSequence(
        withSpring(0.9, { duration: 100 }),
        withSpring(1, { duration: 100 })
      );
      onPress?.();
    }
  };

  const handleQuickActionPress = (actionId: string) => {
    // Collapse first
    rotation.value = withSpring(0, { damping: 15, stiffness: 150 });
    scale.value = withSpring(1);
    setIsExpanded(false);
    
    // Then trigger the action
    setTimeout(() => {
      onQuickActionPress?.(actionId);
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Quick Action Buttons */}
      {showQuickActions && quickActions.map((action, index) => (
        <Animated.View
          key={action.id}
          style={[
            styles.quickActionButton,
            { backgroundColor: action.color },
            quickActionStyle(index)
          ]}
        >
          <TouchableOpacity
            style={styles.quickActionTouchable}
            onPress={() => handleQuickActionPress(action.id)}
            activeOpacity={0.8}
          >
            {action.icon}
          </TouchableOpacity>
          <View style={styles.quickActionLabel}>
            <Text style={styles.quickActionText}>{action.label}</Text>
          </View>
        </Animated.View>
      ))}

      {/* Main FAB */}
      <Animated.View style={[styles.fab, mainButtonStyle]}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          {isExpanded ? (
            <X size={24} color="#ffffff" />
          ) : (
            <Plus size={24} color="#ffffff" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionButton: {
    position: 'absolute',
    bottom: 70,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  quickActionTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    position: 'absolute',
    right: 50,
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FloatingActionButton;