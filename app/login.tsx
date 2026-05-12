import { useRouter } from "expo-router"; // Expo Router yönlendirme aracı
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Üst Kısım: Sarı Arka Plan ve Başlık */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NAVI-TRUST</Text>
        </View>

        {/* Alt Kısım: Beyaz Form Alanı */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Giriş Yap</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email@gmail.com"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Şifremi unuttum?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/dashboard")}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ya da</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Hesabın yok mu? </Text>
            {/* Kayıt ol sayfasına yönlendirecek buton (şuan boş sayfaya gider) */}
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFD700" },
  header: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 36, fontWeight: "bold", color: "#000000" },
  formContainer: {
    flex: 0.7,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000000",
  },
  label: { fontSize: 16, fontWeight: "600", color: "#333333", marginBottom: 8 },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  forgotPasswordContainer: { alignItems: "flex-start", marginBottom: 30 },
  forgotPasswordText: { color: "#555555", fontSize: 14 },
  loginButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: { fontSize: 18, fontWeight: "bold", color: "#000000" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: { marginHorizontal: 10, color: "#A0A0A0" },
  registerContainer: { flexDirection: "row", justifyContent: "center" },
  registerText: { fontSize: 15, color: "#555555" },
  registerLink: { fontSize: 15, fontWeight: "bold", color: "#000000" },
});
