import React from 'react';
import { Button, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearStorageButton = () => {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'Storage successfully cleared');
    } catch (error) {
      console.error('Failed to clear storage', error);
      Alert.alert('Error', 'Failed to clear storage');
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Clear Storage" onPress={clearStorage} />
    </View>
  );
};

export default ClearStorageButton;
