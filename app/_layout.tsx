import { Stack } from "expo-router";
import Colours from "@/constants/Colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colours.y5,
        },
        headerTintColor: Colours.b4,
        headerShadowVisible: false,
        
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}
      // https://reactnavigation.org/docs/stack-navigator
    >
      <Stack.Screen name="index" 
        options={{
          title: "Home",
        }}
      />
    </Stack>
  );
}

