import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [sound, setSound] = useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Beep.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }
  const sendSOS = () => {
    playSound();
    Alert.alert('🚨 SOS Triggered!', 'Shake detected. SOS sent.');
    console.log('SOS sent from shake');
  };
  const handlePress = () => {
    Alert.alert('Send SOS', 'Are you sure you want to send an SOS?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: () => sendSOS() },
    ]);
  };
  useEffect(() => {
    const subscription = Accelerometer.addListener(data => {
      const force = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
      if (force > 1.8) {
        Alert.alert("Shake Detected!", "Send SOS?", [
          { text: "Cancel", style: "cancel" },
          { text: "Send", onPress: () => sendSOS() }
        ]);
      }
    });

    return () => subscription.remove(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women Safety App</Text>
      <Button title="Send SOS" onPress={handlePress} />
      <Text style={styles.info}>Shake phone to trigger SOS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { marginTop: 20, fontSize: 16, color: 'gray' },
});