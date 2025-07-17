"use client";

import { useState, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import {
  Film,
  Bell,
  User,
  Search,
  Sun,
  Moon,
  Cloud,
  Star,
  Sparkles,
} from "lucide-react-native";
import {
  HeaderWrapper,
  HeaderGradient,
  HeaderBlur,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  LogoContainer,
  NotificationBadge,
  WelcomeContainer,
  TimeBasedContainer,
  WeatherContainer,
} from "@/components/styled/Header";
import { IconButton } from "@/components/styled/Button";
import { Title, Subtitle, Caption } from "@/components/styled/Typography";
import { HorizontalContainer } from "@/components/styled/Container";
import { theme } from "@/styles/theme";

interface CreativeHeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  variant?: "home" | "search" | "profile" | "trending";
}

export default function CreativeHeader({
  title,
  showSearch = true,
  showNotifications = true,
  showProfile = true,
  onSearchPress,
  onNotificationPress,
  onProfilePress,
  variant = "home",
}: CreativeHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const sparkleAnim = new Animated.Value(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Sparkle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [currentTime]);

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 18) {
      return <Sun size={16} color={theme.colors.accent.yellow} />;
    } else {
      return <Moon size={16} color={theme.colors.secondary[400]} />;
    }
  };

  const getVariantContent = () => {
    switch (variant) {
      case "home":
        return (
          <WelcomeContainer>
            <HorizontalContainer>
              <Title size="2xl" weight="bold">
                {greeting}
              </Title>
              <Animated.View
                style={{
                  marginLeft: theme.spacing.sm,
                  opacity: sparkleAnim,
                  transform: [
                    {
                      rotate: sparkleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                }}
              >
                <Sparkles size={20} color={theme.colors.accent.yellow} />
              </Animated.View>
            </HorizontalContainer>

            <TimeBasedContainer>
              {getTimeIcon()}
              <Caption
                color={theme.colors.dark[400]}
                style={{ marginLeft: theme.spacing.xs }}
              >
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Caption>

              <WeatherContainer style={{ marginLeft: theme.spacing.md }}>
                <Cloud size={12} color={theme.colors.secondary[400]} />
                <Caption
                  size="xs"
                  color={theme.colors.secondary[400]}
                  style={{ marginLeft: 4 }}
                >
                  Perfect for movies
                </Caption>
              </WeatherContainer>
            </TimeBasedContainer>

            <Subtitle
              size="base"
              weight="medium"
              color={theme.colors.dark[300]}
              style={{ marginTop: theme.spacing.xs }}
            >
              What would you like to watch today?
            </Subtitle>
          </WelcomeContainer>
        );

      case "search":
        return (
          <WelcomeContainer>
            <HorizontalContainer>
              <Search size={24} color={theme.colors.primary[500]} />
              <Title
                size="2xl"
                weight="bold"
                style={{ marginLeft: theme.spacing.sm }}
              >
                Discover Movies
              </Title>
            </HorizontalContainer>
            <Caption
              color={theme.colors.dark[400]}
              style={{ marginTop: theme.spacing.xs }}
            >
              Find your next favorite film
            </Caption>
          </WelcomeContainer>
        );

      case "trending":
        return (
          <WelcomeContainer>
            <HorizontalContainer>
              <Star
                size={24}
                color={theme.colors.accent.yellow}
                fill={theme.colors.accent.yellow}
              />
              <Title
                size="2xl"
                weight="bold"
                style={{ marginLeft: theme.spacing.sm }}
              >
                Trending Now
              </Title>
            </HorizontalContainer>
            <Caption
              color={theme.colors.dark[400]}
              style={{ marginTop: theme.spacing.xs }}
            >
              What everyone&apos;s watching
            </Caption>
          </WelcomeContainer>
        );

      case "profile":
        return (
          <WelcomeContainer>
            <HorizontalContainer>
              <User size={24} color={theme.colors.primary[500]} />
              <Title
                size="2xl"
                weight="bold"
                style={{ marginLeft: theme.spacing.sm }}
              >
                Your Profile
              </Title>
            </HorizontalContainer>
            <Caption
              color={theme.colors.dark[400]}
              style={{ marginTop: theme.spacing.xs }}
            >
              Manage your movie experience
            </Caption>
          </WelcomeContainer>
        );

      default:
        return null;
    }
  };

  return (
    <HeaderWrapper>
      <HeaderBlur />
      <HeaderGradient />

      <HeaderContainer>
        <HeaderLeft>
          <LogoContainer>
            <Film size={20} color={theme.colors.primary[500]} />
            <Title
              size="lg"
              weight="bold"
              color={theme.colors.primary[500]}
              style={{ marginLeft: theme.spacing.xs }}
            >
              Cine
            </Title>
          </LogoContainer>
        </HeaderLeft>

        <HeaderRight>
          {showSearch && (
            <IconButton
              size={44}
              onPress={onSearchPress}
              style={{ marginRight: theme.spacing.sm }}
            >
              <Search size={20} color={theme.colors.dark[400]} />
            </IconButton>
          )}

          {showNotifications && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={{ position: "relative" }}
            >
              <IconButton size={44} style={{ marginRight: theme.spacing.sm }}>
                <Bell size={20} color={theme.colors.dark[400]} />
              </IconButton>
              <NotificationBadge>
                <Caption size="xs" weight="bold" color={theme.colors.dark[50]}>
                  3
                </Caption>
              </NotificationBadge>
            </TouchableOpacity>
          )}

          {showProfile && (
            <IconButton size={44} onPress={onProfilePress}>
              <User size={20} color={theme.colors.dark[400]} />
            </IconButton>
          )}
        </HeaderRight>
      </HeaderContainer>

      {getVariantContent()}
    </HeaderWrapper>
  );
}
