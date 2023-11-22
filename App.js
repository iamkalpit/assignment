import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import SplashScreen from "./screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("onboardingStatus")
      .then((value) => {
        if (value === "completed") {
          setIsOnboardingComplete(true);
        }
      })
      .finally(() => {
        // Simulate a slow loading process on app startup.
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name="Profile"
              component={Profile}
              initialParams={{ setIsOnboardingComplete }}
            />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
            initialParams={{ setIsOnboardingComplete }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
