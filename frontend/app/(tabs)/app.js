import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [sound, setSound] = useState();
  const [location, setLocation] = useState(null);
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Beep.mp3') 
    );
    setSound(sound);
    await sound.playAsync();
  }
  const sendSOS = () => {
    playSound();
    console.log('🚨 SOS Triggered!');
    if (location) {
      console.log(`📍 Location: ${location.latitude}, ${location.longitude}`);
    } else {
      console.log('📍 Location not available');
    }
    Alert.alert('🚨 SOS Triggered!', 'Alert sound played and location sent.');
  };

  const handlePress = () => {
    Alert.alert('Send SOS', 'Are you sure you want to send an SOS?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: () => sendSOS() },
    ]);
  }
  useEffect(() => {
    const subscription = Accelerometer.addListener(data => {
      const force = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
      if (force > 1.8) {
        Alert.alert('Shake Detected!', 'Send SOS?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Send', onPress: () => sendSOS() },
        ]);
      }
    });
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('❌ Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>🛡️ Women Safety App</Text>

      <TouchableOpacity style={styles.sosButton} onPress={handlePress}>
        <MaterialCommunityIcons name="alarm-light" size={24} color="white" />
        <Text style={styles.sosText}> SEND SOS</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>📳 Shake your phone to trigger SOS</Text>
      </View>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>📍 Current Location</Text>
          <Text style={styles.locationText}>
            Latitude: {location.latitude.toFixed(4)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.longitude.toFixed(4)}
          </Text>
        </View>
      )}

      <Text style={styles.footer}>Made by Tanishka for Hackathon 2025</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
  width: 150,
  height: 150,
  resizeMode: 'contain',
  marginBottom: 20,
  borderRadius: 75,
  borderWidth: 2,
  borderColor: '#C70039',
},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C70039',
    marginBottom: 40,
  },
  sosButton: {
    flexDirection: 'row',
    backgroundColor: '#C70039',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 40,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
  },
  sosText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FFF0F0',
    padding: 12,
    borderRadius: 10,
    marginTop: 30,
  },
  infoText: {
    fontSize: 16,
    color: '#B22222',
  },
  locationBox: {
    backgroundColor: '#FDFDFD',
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#444',
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#666',
  },
});
