import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Loader as Loader2, RefreshCw, Download, Upload } from 'lucide-react-native';

const LoadingSpinner = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Loader2 size={24} color="#6366f1" strokeWidth={2} />
    </Animated.View>
  );
};

const PulsingDots = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const animateDot = (value: Animated.SharedValue<number>, delay: number) => {
      value.value = withRepeat(
        withSequence(
          withTiming(0, { duration: delay }),
          withTiming(1, { duration: 400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 400, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 800 - delay })
        ),
        -1
      );
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  const createDotStyle = (value: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: interpolate(value.value, [0, 1], [0.3, 1]),
      transform: [
        {
          scale: interpolate(value.value, [0, 1], [0.8, 1.2]),
        },
      ],
    }));

  return (
    <View style={styles.dotsContainer}>
      <Animated.View style={[styles.dot, createDotStyle(dot1)]} />
      <Animated.View style={[styles.dot, createDotStyle(dot2)]} />
      <Animated.View style={[styles.dot, createDotStyle(dot3)]} />
    </View>
  );
};

const ProgressBar = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 500 })
      ),
      -1
    );
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressStyle]} />
      </View>
      <Text style={styles.progressText}>Loading...</Text>
    </View>
  );
};

const BouncingIcon = ({ icon: Icon, color }: { icon: any; color: string }) => {
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) }),
        withTiming(0, { duration: 600, easing: Easing.in(Easing.back(1.5)) })
      ),
      -1
    );
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(bounce.value, [0, 1], [0, -10]),
      },
      {
        scale: interpolate(bounce.value, [0, 1], [1, 1.1]),
      },
    ],
  }));

  return (
    <Animated.View style={bounceStyle}>
      <Icon size={24} color={color} strokeWidth={2} />
    </Animated.View>
  );
};

export default function LoadingDemo() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: 'Spinning Loader',
      component: <LoadingSpinner />,
      description: 'Classic rotating spinner',
    },
    {
      title: 'Pulsing Dots',
      component: <PulsingDots />,
      description: 'Animated dot sequence',
    },
    {
      title: 'Progress Bar',
      component: <ProgressBar />,
      description: 'Smooth progress indicator',
    },
    {
      title: 'Bouncing Icons',
      component: (
        <View style={styles.iconsContainer}>
          <BouncingIcon icon={Download} color="#10b981" />
          <BouncingIcon icon={Upload} color="#f59e0b" />
          <BouncingIcon icon={RefreshCw} color="#ef4444" />
        </View>
      ),
      description: 'Playful bouncing animations',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.demoSelector}>
        {demos.map((demo, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.selectorButton,
              activeDemo === index && styles.selectorButtonActive,
            ]}
            onPress={() => setActiveDemo(index)}
          >
            <Text
              style={[
                styles.selectorText,
                activeDemo === index && styles.selectorTextActive,
              ]}
            >
              {demo.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.demoContainer}>
        <View style={styles.loadingArea}>
          {demos[activeDemo].component}
        </View>
        <Text style={styles.demoTitle}>{demos[activeDemo].title}</Text>
        <Text style={styles.demoDescription}>{demos[activeDemo].description}</Text>
      </View>

      <View style={styles.codePreview}>
        <Text style={styles.codeTitle}>Implementation</Text>
        <Text style={styles.codeText}>
          Uses react-native-reanimated for smooth 60fps animations with native performance
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  demoSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectorButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#4f46e5',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  selectorTextActive: {
    color: '#ffffff',
  },
  demoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingArea: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  demoDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6366f1',
  },
  progressContainer: {
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  codePreview: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});