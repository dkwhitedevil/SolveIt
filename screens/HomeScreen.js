import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const [scale, setScale] = useState(new Animated.Value(1));
  const [rotation, setRotation] = useState(new Animated.Value(0)); // Rotation value

  const handlePressIn = () => {
    // Apply buzzer effect with scaling and rotation
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    // Reset scale and rotation
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Categories');
    });
  };

  // Interpolate rotation to a small angle for buzzer effect
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'], // Slight rotation for buzzer effect
  });

  return (
    <ImageBackground
      source={require('../assets/home_bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('../assets/solveit_logo.png')} style={styles.logo} />
        
        <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
          <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <LinearGradient
              colors={['#87CEEB', '#90EE90']}
              style={styles.button}
            >
             
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 40,
    left: 15,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A3D62',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    height: 70, // Equal height and width for circle
    width: 70,
    borderRadius: 50, // Half of height/width to make it circular
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
