import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/");
  }

  function hadleTest() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </Pressable>
          <Text style={styles.logoText}>
            Dev <Text style={{ color: Colors.green }}>App</Text>
          </Text>
          <Text style={styles.slogan}>Create Account</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: Colors.zinc,
  },
  header: {
    paddingHorizontal: 14,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 34,
    color: Colors.white,
    marginBottom: 34,
  },
  form: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: "0%",
  },
  label: {
    color: Colors.zinc,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  button: {
    backgroundColor: Colors.green,
    paddingVertical: 14,
    paddingTop: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.zinc,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 55,
    marginBottom: 8,
  },
});
