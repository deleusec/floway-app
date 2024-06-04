import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import Soundscape from '@/types/Soundscape';

const SOUNDSCAPE_STORAGE_KEY = process.env.SOUNDSCAPE_STORAGE_KEY || 'soundscapes';

export default function Soundscapes() {
  const [soundscapes, setSoundscapes] = useState<Soundscape[]>([]);
  const router = useRouter();

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
        <Text style={tw`font-bold text-2xl text-primary`}>Soundscapes</Text>
        <Text style={tw`text-lg text-gray-500`}>Find different Soundscapes</Text>
      </View>

      <View style={tw`flex-col`}>
        <Link href="/soundscapes/create" style={tw`text-primary `}>
          Create one
        </Link>
      </View>

      <FlatList
        data={soundscapes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={tw`p-4 border-b border-gray-300 w-full`}>
            <Text style={tw`text-xl text-gray-800`}>{item.name}</Text>
            <Text style={tw`text-gray-600`}>Goal Type: {item.goalType}</Text>
            <Text style={tw`text-gray-600`}>Goal Value: {item.goalValue}</Text>
            <Button title="Play" onPress={() => handlePlay(item)} />
          </View>
        )}
      />
    </View>
  );
}
