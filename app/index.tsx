import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

export default function Login() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.zinc} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
