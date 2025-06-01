import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Categories data
const categories = [
  { id: 1, name: 'General Knowledge', image: require('../assets/Gk.webp') },
  { id: 2, name: 'Science', image: require('../assets/science.webp') },
  { id: 3, name: 'History', image: require('../assets/history.jpg') },
  { id: 4, name: 'Mathematics', image: require('../assets/maths.jpg') },
  { id: 5, name: 'Geography', image: require('../assets/geography.jpg') },
  { id: 6, name: 'Technology', image: require('../assets/technology.jpg') },
  { id: 7, name: 'Sports', image: require('../assets/sports.jpg') },
  { id: 8, name: 'Cinema', image: require('../assets/cinema.jpg') },
  { id: 9, name: 'Literature', image: require('../assets/Literature.jpg') },
  { id: 10, name: 'Health & Fitness', image: require('../assets/Healfit.jpg') },
  { id: 11, name: 'Finance', image: require('../assets/Finance.jpg') },
  { id: 12, name: 'Climate & Environment', image: require('../assets/Climenv.jpg') },
  { id: 13, name: 'Psychology', image: require('../assets/psychology.jpg') },
  { id: 14, name: 'Business & Management', image: require('../assets/busman.jpg') },
  { id: 15, name: 'Art & Culture', image: require('../assets/artcul.jpg') },
];

export default function CategoriesScreen({ navigation }) {

  // Handle category selection and navigate to respective screen
  const handleCategorySelect = (category) => {
    switch (category.name) {
      case 'General Knowledge':
        navigation.navigate('GeneralKnowledge');
        break;
      case 'Science':
        navigation.navigate('Science');
        break;
      case 'History':
        navigation.navigate('History');
        break;
      case 'Mathematics':
        navigation.navigate('Mathematics');
        break;
      case 'Geography':
        navigation.navigate('Geography');
        break;
      case 'Technology':
        navigation.navigate('Technology');
        break;
      case 'Sports':
        navigation.navigate('Sports');
        break;
      case 'Cinema':
        navigation.navigate('Cinema');
        break;
      case 'Literature':
        navigation.navigate('Literature');
        break;
      case 'Health & Fitness':
        navigation.navigate('HealthFitness');
        break;
      case 'Finance':
        navigation.navigate('Finance');
        break;
      case 'Climate & Environment':
        navigation.navigate('ClimateEnvironment');
        break;
      case 'Psychology':
        navigation.navigate('Psychology');
        break;
      case 'Business & Management':
        navigation.navigate('BusinessManagement');
        break;
      case 'Art & Culture':
        navigation.navigate('ArtCulture');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.spacer}></Text>
      <Text style={styles.spacer}></Text>
      <View style={styles.header}>
        <Image
          source={require('../assets/loko.png')}
          style={styles.logo}
        />
        <Image
          source={require('../assets/logo_name.png')}
          style={styles.logo_name}
        />
        <TouchableOpacity style={styles.homeButton}>
          <LinearGradient
            colors={['#87CEEB', '#98FB98']} // Sky blue to light green gradient
            style={styles.homeButtonGradient}
          >
            <Text style={styles.homeButtonText} onPress={() => navigation.navigate('Home')}>Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Categories List */}
      <View style={styles.featuredCategories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategorySelect(category)} // Navigate to selected category
          >
            <Image source={category.image} style={styles.categoryImage} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logo_name: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  homeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 88,
  },
  homeButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredCategories: {
    padding: 20,
    backgroundColor: 'black',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryCard: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  spacer: {
    marginTop: 10,
  }
});
