import { auth } from "@/firebase.config";
import { router } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const loginScreen= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [resetLoading, setResetLoading] = useState(false);

  const signIn = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password)
      if(user) router.replace('/dashboard')
    }
    catch (error: any){
      console.log(error)
      Alert.alert('Giriş Başarısız', error.message);
    }
  }

  const resetPassword = async () => {
    if (!email) {
      Alert.alert("Eksik Bilgi", "Şifre sıfırlama bağlantısı göndermek için lütfen e-posta alanını doldurunuz.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Geçersiz Format", "Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Başarılı", 
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen spam kutunuzu da kontrol ediniz."
      );
    } catch (error: any) {
      console.log("Reset Error:", error);
      let errorMessage = "Bir hata oluştu.";

      if (error.code === 'auth/user-not-found') errorMessage = "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.";
      if (error.code === 'auth/invalid-email') errorMessage = "E-posta adresi formatı geçersiz.";
      if (error.code === 'auth/too-many-requests') errorMessage = "Çok fazla deneme yaptınız. Lütfen bir süre bekleyip tekrar deneyin.";

      Alert.alert("Hata", errorMessage);
    } finally {
      setResetLoading(false);
    }
  };


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
            placeholder="********"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}
            onPress={resetPassword}
            disabled={resetLoading}>
            <Text style={styles.forgotPasswordText}>Şifremi unuttum?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton} onPress={signIn}
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
export default loginScreen;