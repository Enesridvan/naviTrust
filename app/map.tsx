import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const router = useRouter();

  // Daha yakından (Zoom in) bir görünüm için Delta değerlerini küçülttük
  const initialRegion = {
    latitude: 39.905,
    longitude: 41.273,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  // Sokakları takip ediyormuş gibi görünen zikzaklı rota
  const routeCoordinates = [
    { latitude: 39.899, longitude: 41.27 }, // Başlangıç
    { latitude: 39.899, longitude: 41.273 },
    { latitude: 39.903, longitude: 41.273 },
    { latitude: 39.903, longitude: 41.275 },
    { latitude: 39.908, longitude: 41.275 }, // Bitiş
  ];

  return (
    <View style={styles.container}>
      {/* Harita Katmanı */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        customMapStyle={darkMapStyle}
      >
        {/* Başlangıç Noktası (Mavi Nokta) */}
        <Marker coordinate={routeCoordinates[0]}>
          <View style={styles.startMarker} />
        </Marker>

        {/* Rota Çizgisi */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#3333FF"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />

        {/* Hedef Noktası (Kırmızı Klasik Pin) */}
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
          <Ionicons name="location" size={36} color="#FF3B30" />
        </Marker>
      </MapView>

      {/* Üst Bilgi Kartı */}
      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.addressCard}>
          {/* Sarı Hap Şeklindeki Adres Kutuları */}
          <View style={styles.addressPill}>
            <Text style={styles.addressText} numberOfLines={1}>
              Yunusemre, 25080 Palandöken/Erzurum
            </Text>
          </View>
          <View style={styles.addressPill}>
            <Text style={styles.addressText} numberOfLines={1}>
              Kazım Karabekir Paşa, Kongre Cd.
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Fiyat Etiketi */}
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>80,25 ₺</Text>
      </View>

      {/* Paylaşım Butonu (Navigasyonun hemen üstünde) */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="share-social" size={24} color="#000" />
      </TouchableOpacity>

      {/* Alt Navigasyon Çubuğu (Harita İkonu Aktif) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/dashboard")}
        >
          <Ionicons name="home-outline" size={28} color="#A0A0A0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavCircle}>
            <Ionicons name="map-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={28} color="#A0A0A0" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#212121" },
  map: { width: "100%", height: "100%", position: "absolute" },

  // Pin Tasarımları
  startMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#007AFF",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  /// Üst Adres Kartı (Beyaz Alan)
  topOverlay: {
    position: "absolute",
    top: 60, // Notch'tan (çentik) kurtulmak için ideal yükseklik
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },

  addressCard: {
    backgroundColor: "#FFFFFF",
    width: "85%", // Kartı biraz daha daralttık
    borderRadius: 20,
    paddingVertical: 12, // Dikey boşluğu ciddi oranda azalttık
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },

  // Sarı Adres Kutuları
  addressPill: {
    backgroundColor: "#FFD700",
    paddingVertical: 6, // Kutuyu daha ince yaptık
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 8, // İki kutu arasındaki devasa boşluğu kapattık
    width: "100%",
    alignItems: "center",
  },

  addressText: {
    fontSize: 12, // Yazıyı bir tık küçülterek zarafet kattık
    fontWeight: "700",
    color: "#333",
  },

  // Fiyat Etiketi (Sağdaki 80,25 TL)
  priceTag: {
    position: "absolute",
    top: 175, // Adres kartının hemen altına hizaladık
    right: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  priceText: { fontSize: 18, fontWeight: "bold", color: "#D9534F" },

  // Paylaşım Butonu
  iconButton: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },

  // Alt Navigasyon Çubuğu
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 35,
    zIndex: 3,
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

// Haritayı siyaha çeviren tasarım kodu (Değişmedi)
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#181818" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1b1b1b" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#373737" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3c3c3c" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4e4e4e" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d3d3d" }],
  },
];
