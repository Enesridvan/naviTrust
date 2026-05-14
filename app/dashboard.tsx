import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase.config";

export default function DashboardScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("Kullanıcı");

  
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserName(data.ad || "Kullanıcı"); 
          }
        } catch (error) {
          console.error("Kullanıcı verisi çekilirken hata oluştu:", error);
        }
      } else {
        router.replace("/login");
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Kısım */}
      <View style={styles.header}>
        <Text style={styles.logoText}>NAVI-TRUST</Text>
      </View>

      {/* Alt Kısım: Beyaz Kontrol Panosu */}
      <View style={styles.dashboardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Karşılama ve Şehir Seçimi */}
          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>Hoşgeldin {userName}</Text>
            <View style={styles.cityBadge}>
              <Ionicons name="location-sharp" size={16} color="#333" />
              <Text style={styles.cityText}>Şehir</Text>
            </View>
          </View>

          {/* Ana Buton: Yolculuğa Başla */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => Alert.alert("Bilgi", "Sensörler dinlenmeye başlanacak...")}
          >
            <FontAwesome5
              name="route"
              size={20}
              color="#000"
              style={styles.buttonIcon}
            />
            <Text style={styles.mainButtonText}>Yolculuğa Başla</Text>
          </TouchableOpacity>

          {/* İkili Butonlar (Yan Yana) */}
          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.halfButton}>
              <Text style={styles.halfButtonText}>Tarife Güncelleme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.halfButton}>
              <Text style={styles.halfButtonText}>Şehir Seçimi</Text>
            </TouchableOpacity>
          </View>

          {/* İkinci Ana Buton: Yolculuklarım */}
          <TouchableOpacity style={styles.mainButton}>
            <Ionicons
              name="location"
              size={22}
              color="#000"
              style={styles.buttonIcon}
            />
            <Text style={styles.mainButtonText}>Yolculuklarım</Text>
          </TouchableOpacity>

          {/* Adresiniz Butonu */}
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Adresiniz</Text>
          </TouchableOpacity>

          {/* Alt Slogan */}
          <Text style={styles.sloganText}>Doğru ve Güvenilir</Text>
        </ScrollView>

        {/* Alt Navigasyon Çubuğu */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.activeNavCircle}>
              <Ionicons name="home" size={24} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/map")}
          >
            <Ionicons name="map-outline" size={28} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="person-outline" size={28} color="#A0A0A0" />
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
  dashboardContainer: {
    flex: 0.85,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContent: { paddingHorizontal: 30, paddingTop: 30, paddingBottom: 20 },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: { fontSize: 18, fontWeight: "500", color: "#333" },
  cityBadge: { flexDirection: "row", alignItems: "center" },
  cityText: { fontSize: 16, fontWeight: "bold", marginLeft: 4, color: "#333" },
  mainButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonIcon: { marginRight: 10 },
  mainButtonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    flex: 0.48,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  halfButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  smallButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    width: "50%",
    alignSelf: "center",
  },
  smallButtonText: { fontSize: 15, fontWeight: "bold", color: "#000" },
  sloganText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
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