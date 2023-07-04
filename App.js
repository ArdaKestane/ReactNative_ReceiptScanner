import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from './src/Screens/MainScreen';
import CameraScreen from './src/Screens/CameraScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import ComponentDetailScreen from './src/Screens/ComponentDetailScreen';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('main');
  const [scannedImage, setScannedImage] = useState(null);
  const [componentsData, setComponentsData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    // Load componentsData from AsyncStorage when the app starts
    loadComponentsData();
  }, []);

  const loadComponentsData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('componentsData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setComponentsData(parsedData);
      } else {
        setComponentsData([]);
      }
    } catch (error) {
      console.log('Error loading components:', error);
    }
  };

  const saveComponentsData = async () => {
    try {
      await AsyncStorage.setItem('componentsData', JSON.stringify(componentsData));
    } catch (error) {
      console.log('Error saving components:', error);
    }
  };

  useEffect(() => {
    saveComponentsData();
  }, [componentsData]);

  const handleComponentPress = component => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = component => {
    const updatedComponents = componentsData.filter(c => c !== component);
    setComponentsData(updatedComponents);
  };

  const handleDocumentScanned = async (image, extractedText) => {
    setScannedImage(image);

    const lastAsteriskIndex = extractedText.lastIndexOf('*');

    // Extract the amount value after the "*" symbol
    const amountText = extractedText.substring(lastAsteriskIndex + 1).trim();

    // Clean and validate the extracted value
    const amount = parseFloat(amountText.replace(',', '.'));

    // Add the scanned image, random amount, and extracted text to componentsData
    const newComponent = {
      image,
      date: new Date().toLocaleDateString(),
      amount: amount,
      extractedText,
    };

    setComponentsData(prevData => [...prevData, newComponent]);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'main':
        return (
          <MainScreen
            componentsData={componentsData}
            onComponentPress={handleComponentPress}
            onDeleteComponent={handleDeleteComponent}
          />
        );
      case 'camera':
        return <CameraScreen onDocumentScanned={handleDocumentScanned} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      {selectedComponent && (
        <ComponentDetailScreen
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveScreen('main')}>
          <Text>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('camera')}>
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
});

export default App;
