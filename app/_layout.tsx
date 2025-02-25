import AuthProvider, { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session user: ", session?.user);
    });
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/signup/page"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(panel)/profile/page"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
