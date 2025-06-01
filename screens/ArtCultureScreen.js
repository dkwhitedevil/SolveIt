import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import questionsData from '../Questions/art.json'; // Ensure this path is correct

const levels = [
  { id: 1, level: 'Level 1', image: require('../assets/level1.jpg') },
  { id: 2, level: 'Level 2', image: require('../assets/level2.jpg') },
  { id: 3, level: 'Level 3', image: require('../assets/level3.jpg') },
  { id: 4, level: 'Level 4', image: require('../assets/level4.png') },
  { id: 5, level: 'Level 5', image: require('../assets/level5.jpg') },
  { id: 6, level: 'Level 6', image: require('../assets/level6.png') },
  { id: 7, level: 'Level 7', image: require('../assets/level7.jpg') },
  { id: 8, level: 'Level 8', image: require('../assets/level8.png') },
  { id: 9, level: 'Level 9', image: require('../assets/level9.png') },
  { id: 10, level: 'Level 10', image: require('../assets/level10.jpg') },
];

const ArtCultureScreen = ({ navigation }) => {
  const handleLevelSelect = (levelId) => {
    const selectedLevel = questionsData.levels.find((level) => level.level === levelId);
    if (selectedLevel) {
      navigation.navigate('Quiz', { levelData: selectedLevel });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Art and Culture - Quiz</Text>
      </View>
      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={styles.levelButton}
            onPress={() => handleLevelSelect(level.id)}
          >
            <Image source={level.image} style={styles.levelImage} />
            <Text style={styles.levelText}>{level.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 20 },
  header: { alignItems: 'center', marginTop: 35, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  levelsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  levelButton: { alignItems: 'center', marginBottom: 20 },
  levelImage: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },
  levelText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});

export default ArtCultureScreen;
