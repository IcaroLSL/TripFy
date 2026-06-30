import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 6,
  className = '',
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={{
        width: width as any,
        height,
        borderRadius,
        opacity,
        backgroundColor: '#E5E7EB',
      }}
      className={className}
    />
  );
};

// Skeletons especificos para conteudo comum
export const RoteiroCardSkeleton: React.FC = () => (
  <View className="rounded-md bg-card p-3 gap-3 border border-border">
    <Skeleton height={160} borderRadius={12} />
    <Skeleton width="70%" height={20} />
    <View className="flex-row gap-2">
      <Skeleton width={60} height={24} borderRadius={12} />
      <Skeleton width={60} height={24} borderRadius={12} />
    </View>
    <View className="flex-row items-center gap-2">
      <Skeleton width={28} height={28} borderRadius={14} />
      <Skeleton width={100} height={14} />
    </View>
  </View>
);

export const TimelineSkeleton: React.FC = () => (
  <View className="gap-lg px-md">
    {[1, 2, 3].map((i) => (
      <View key={i} className="gap-3">
        <Skeleton width="60%" height={24} />
        <View className="gap-2 ml-lg">
          {[1, 2].map((j) => (
            <View key={j} className="flex-row gap-3 items-start">
              <Skeleton width={36} height={36} borderRadius={18} />
              <View className="flex-1 gap-1">
                <Skeleton width="50%" height={16} />
                <Skeleton width="30%" height={12} />
              </View>
            </View>
          ))}
        </View>
      </View>
    ))}
  </View>
);