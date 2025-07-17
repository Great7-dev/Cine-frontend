import { Tabs } from "expo-router";
import { Film, TrendingUp, Search, User } from "lucide-react-native";
import { theme } from "@/styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          borderTopColor: "rgba(148, 163, 184, 0.2)",
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
          position: "absolute",
          borderRadius: 20,
          marginHorizontal: 16,
          marginBottom: 16,
          ...theme.shadows.xl,
        },
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.dark[500],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Popular",
          tabBarIcon: ({ size, color }) => <Film size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: "Trending",
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
