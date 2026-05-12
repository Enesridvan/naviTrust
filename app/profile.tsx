import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Kısım */}
      <View style={styles.header}>
        <Text style={styles.logoText}>NAVI-TRUST</Text>
      </View>

      {/* Alt Kısım: Beyaz Profil Panosu */}
      <View style={styles.profileContainer}>
        <Text style={styles.title}>PROFİL</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
        >
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Kullanıcı adı</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Email Değiştirme</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Bizi Değerlendirin</Text>
          </TouchableOpacity>

          {/* Çıkış Yap Butonu (Giriş sayfasına atar) */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.menuText}>Çıkış yap</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Alt Navigasyon Çubuğu (Profil İkonu Aktif) */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/dashboard")}
          >
            <Ionicons name="home-outline" size={28} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/map")}
          >
            <Ionicons name="map-outline" size={28} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <View style={styles.activeNavCircle}>
              <Ionicons name="person" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFD700" },
  header: { flex: 0.15, justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 32, fontWeight: "bold", color: "#000000" },
  profileContainer: {
    flex: 0.85,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color: "#333",
  },
  menuList: { paddingHorizontal: 40, paddingBottom: 20 },
  menuButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 25,
  },
  navItem: { flex: 1, alignItems: "center" },
  activeNavCircle: {
    backgroundColor: "#E8C500",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
