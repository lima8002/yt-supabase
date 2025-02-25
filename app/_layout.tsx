import AuthProvider, { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
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
      if (session) {
        setAuth(session.user);
        router.replace("/(panel)/profile/page");
        return;
      }
      setAuth(null);
      router.replace("/(auth)/signin/page");
    });
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/signin/page"
          options={{ headerShown: false }}
        />
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
