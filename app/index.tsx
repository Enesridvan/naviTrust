import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// useRouter, Expo Router'da sayfalar arası geçişi sağlar
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoIcon}>🛡️</Text>
        </View>
        <Text style={styles.title}>Navi-Trust</Text>
      </View>

      <View style={styles.footer}>
        {/* Yazıyı TouchableOpacity ile sarıp tıklanınca login sayfasına yönlendiriyoruz */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.swipeText}>Yukarı kaydır!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000000",
  },
  footer: {
    paddingBottom: 50,
    alignItems: "center",
  },
  swipeText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
