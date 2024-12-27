import { Stack } from "expo-router";
import Colours from "@/constants/Colors";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { WorkoutContextProvider } from "@/contexts/WorkoutProvider";
import { ApiContextProvider } from "@/contexts/ApiProvider";

export default function RootLayout() {
  const params = useGlobalSearchParams();
  
  return (
    <ApiContextProvider>
      <WorkoutContextProvider>
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
        >
          <Stack.Screen name="HomeScreen" options={{title: "Home"}} />
          <Stack.Screen name="ExerciseScreen" 
            options={{title: Array.isArray(params.name) ? params.name[0] : params.name || "Exercise"}}
          />
        </Stack>
      </WorkoutContextProvider>
    </ApiContextProvider>
  );
}

