import { Stack } from "expo-router";
import Colours from "@/constants/Colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colours.black,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
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

