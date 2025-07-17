"use client";

import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { theme } from "@/styles/theme";

const { width, height } = Dimensions.get("window");

interface OrbProps {
  size: number;
}

const BackgroundContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const FloatingOrb = styled(Animated.View).attrs<OrbProps>(
  (props: { size: number }) => ({
    style: {
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    },
  })
)`
  position: absolute;
  opacity: 0.1;
`;

const GradientOrb = styled(LinearGradient).attrs<OrbProps>(
  (props: { size: number }) => ({
    style: {
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    },
  })
)``;

export default function AnimatedBackground() {
  const orb1 = useRef(new Animated.ValueXY({ x: -100, y: -100 })).current;
  const orb2 = useRef(
    new Animated.ValueXY({ x: width + 50, y: height / 2 })
  ).current;
  const orb3 = useRef(
    new Animated.ValueXY({ x: width / 2, y: height + 50 })
  ).current;

  const rotation1 = useRef(new Animated.Value(0)).current;
  const rotation2 = useRef(new Animated.Value(0)).current;
  const rotation3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloatingAnimation = (
      animatedValue: Animated.ValueXY,
      rotationValue: Animated.Value,
      duration: number
    ) => {
      return Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: {
                x: Math.random() * width,
                y: Math.random() * height,
              },
              duration: duration,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: {
                x: Math.random() * width,
                y: Math.random() * height,
              },
              duration: duration,
              useNativeDriver: false,
            }),
          ]),
          Animated.timing(rotationValue, {
            toValue: 1,
            duration: duration * 2,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createFloatingAnimation(orb1, rotation1, 15000);
    const anim2 = createFloatingAnimation(orb2, rotation2, 20000);
    const anim3 = createFloatingAnimation(orb3, rotation3, 18000);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const getRotation = (rotationValue: Animated.Value) => {
    return rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  };

  return (
    <BackgroundContainer pointerEvents="none">
      <FloatingOrb
        size={200}
        style={{
          transform: [
            { translateX: orb1.x },
            { translateY: orb1.y },
            { rotate: getRotation(rotation1) },
          ],
        }}
      >
        <GradientOrb
          size={200}
          colors={[theme.colors.primary[500], theme.colors.accent.purple]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </FloatingOrb>

      <FloatingOrb
        size={150}
        style={{
          transform: [
            { translateX: orb2.x },
            { translateY: orb2.y },
            { rotate: getRotation(rotation2) },
          ],
        }}
      >
        <GradientOrb
          size={150}
          colors={[theme.colors.secondary[500], theme.colors.accent.cyan]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </FloatingOrb>

      <FloatingOrb
        size={120}
        style={{
          transform: [
            { translateX: orb3.x },
            { translateY: orb3.y },
            { rotate: getRotation(rotation3) },
          ],
        }}
      >
        <GradientOrb
          size={120}
          colors={[theme.colors.accent.pink, theme.colors.accent.emerald]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </FloatingOrb>
    </BackgroundContainer>
  );
}
