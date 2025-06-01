import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import GeneralKnowledgeScreen from './screens/GeneralKnowledgeScreen';
import LevelQuizScreen from './screens/LevelQuizScreen';
import ArtCultureScreen from './screens/ArtCultureScreen';
import BusinessManagementScreen from './screens/BusinessManagementScreen';
import CinemaScreen from './screens/CinemaScreen';
import ClimateEnvironmentScreen from './screens/ClimateEnvironmentScreen';
import FinanceScreen from './screens/FinanceScreen';
import GeographyScreen from './screens/GeographyScreen';
import HealthFitnessScreen from './screens/HealthFitnessScreen';
import HistoryScreen from './screens/HistoryScreen';
import LiteratureScreen from './screens/LiteratureScreen';
import MathematicsScreen from './screens/MathematicsScreen';
import PsychologyScreen from './screens/PsychologyScreen';
import ScienceScreen from './screens/ScienceScreen';
import SportsScreen from './screens/SportsScreen';
import TechnologyScreen from './screens/TechnologyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="GeneralKnowledge" component={GeneralKnowledgeScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Science" component={ScienceScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="ArtCulture" component={ArtCultureScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="BusinessManagement" component={BusinessManagementScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Cinema" component={CinemaScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="ClimateEnvironment" component={ClimateEnvironmentScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Finance" component={FinanceScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Geography" component={GeographyScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="HealthFitness" component={HealthFitnessScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="History" component={HistoryScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Literature" component={LiteratureScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Mathematics" component={MathematicsScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Psychology" component={PsychologyScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Sports" component={SportsScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Technology" component={TechnologyScreen}options={{ headerShown: false }}  /> 
        <Stack.Screen name="Quiz" component={LevelQuizScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}