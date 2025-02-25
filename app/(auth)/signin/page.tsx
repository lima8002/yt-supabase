import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    router.replace("/(panel)/profile/page");
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Dev <Text style={{ color: Colors.green }}>App</Text>
        </Text>
        <Text style={styles.slogan}>The future of Development</Text>
      </View>
      <View style={styles.form}>
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
        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Login"}
          </Text>
        </Pressable>

        <Link href="/(auth)/signup/page" style={styles.link}>
          <Text>Create your account</Text>
        </Link>
      </View>
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 16,
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
  link: {
    marginTop: 16,
    textAlign: "center",
  },
});
