import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, } from "firebase/firestore";
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from '../firebase.config';

const registerScreen = () => {

  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  

  const handleSave = async () => {

    if (isim === '' || soyisim === '' || email === '' || password === '') {
      Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        ad: isim,
        soyad: soyisim,
        email: email,
        rol: "user",
        fcmToken: ""
      });

      Alert.alert("Başarılı", "Kayıt tamamlandı, giriş yapıldı!");
      
      setIsim('');
      setSoyisim('');
    
      setEmail('');
      setPassword('');
      Keyboard.dismiss();

      router.replace ('./login')

    } catch (error: any) {
      console.error(error);
      let errorMessage = "Bir sorun oluştu: " + error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Bu e-posta adresi zaten kullanımda.";
      }
      if (error.code === 'auth/weak-password') {
        errorMessage = "Şifre en az 6 karakter olmalıdır.";
      }
      Alert.alert("Kayıt Hatası", errorMessage);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Üst Kısım */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NAVI-TRUST</Text>
        </View>

        {/* Alt Kısım: Kayıt Formu */}
        <View style={styles.formContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Kayıt Ol</Text>

            <Text style={styles.label}>İsim</Text>
            <TextInput
              style={styles.input}
              placeholder="İsim"
              placeholderTextColor="#A0A0A0"
              value={isim}
              onChangeText={setIsim}
            />

            <Text style={styles.label}>Soyisim</Text>
            <TextInput
              style={styles.input}
              placeholder="Soyisim"
              placeholderTextColor="#A0A0A0"
              value={soyisim}
              onChangeText={setSoyisim}
            />

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

            <TouchableOpacity style={styles.registerButton} onPress={handleSave}>
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            {/* Giriş sayfasına geri dönüş linki */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Zaten hesabın var mı? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFD700" },
  header: { flex: 0.25, justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 36, fontWeight: "bold", color: "#000000" },
  formContainer: {
    flex: 0.75,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333333", marginBottom: 6 },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  registerButtonText: { fontSize: 18, fontWeight: "bold", color: "#000000" },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  loginText: { fontSize: 15, color: "#555555" },
  loginLink: { fontSize: 15, fontWeight: "bold", color: "#000000" },
});
export default registerScreen;