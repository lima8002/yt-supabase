import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function Profile() {
  const { setAuth, user } = useAuth();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Error", "Error trying to signing out. Try again later");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text>Profile page</Text>
      <Text>User: {user?.email}</Text>
      <Text>Id: {user?.id}</Text>

      <Button title="LogOut" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
