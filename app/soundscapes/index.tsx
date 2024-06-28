import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import Soundscape from '@/types/Soundscape';

const SOUNDSCAPE_STORAGE_KEY = process.env.SOUNDSCAPE_STORAGE_KEY || 'soundscapes';

export default function Soundscapes() {
  const [soundscapes, setSoundscapes] = useState<Soundscape[]>([]);
  const router = useRouter();

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'Storage successfully cleared');
    } catch (error) {
      console.error('Failed to clear storage', error);
      Alert.alert('Error', 'Failed to clear storage');
    }
  };

  useEffect(() => {
    const loadSoundscapes = async () => {
      try {
        const storedSoundscapes = await AsyncStorage.getItem(SOUNDSCAPE_STORAGE_KEY);
        if (storedSoundscapes) {
          setSoundscapes(JSON.parse(storedSoundscapes));
        }
      } catch (error) {
        console.error('Failed to load soundscapes', error);
      }
    };

    loadSoundscapes();
  }, []);

  const handlePlay = (soundscape: Soundscape) => {
    router.push({ pathname: '/soundscapes/play', params: { soundscape: JSON.stringify(soundscape) } });
  };

  return (
    <View style={tw`flex-1 justify-start items-center py-20 px-10 gap-20`}>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`font-montserrat font-bold text-2xl text-primary`}>Soundscapes</Text>
        <Text style={tw`font-montserrat text-lg text-gray-500`}>Find different Soundscapes</Text>
        <View style={tw`flex-col`}>
          <Text style={tw`font-montserrat mb-5`}>Press the button to clear storage</Text>
          <Pressable onPress={clearStorage} style={tw`bg-primary p-2 rounded-md flex justify-center items-center`}>
            <Text style={tw`font-montserrat text-white`}>Clear Storage</Text>
          </Pressable>
        </View>
      </View>

      <View style={tw`flex-col`}>
        <Link href="/soundscapes/create" style={tw`font-montserrat text-primary `}>
          Create one
        </Link>
      </View>


      <FlatList
        data={soundscapes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={tw`p-4 border-b border-gray-300 w-full`}>
            <Text style={tw`font-montserrat text-xl text-gray-800`}>{item.name}</Text>
            <Text style={tw`font-montserrat text-gray-600`}>Goal Type: {item.goalType}</Text>
            <Text style={tw`font-montserrat text-gray-600`}>Goal Value: {item.goalValue}</Text>
            <Pressable onPress={() => handlePlay(item)} style={tw`border border-primary p-2 rounded-md flex justify-center items-center mt-2`}>
              <Text style={tw`font-montserrat text-primary`}>Play</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
