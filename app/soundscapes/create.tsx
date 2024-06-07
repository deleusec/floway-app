import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import StepOne from '@/components/soundscapes/create/StepOne';
import StepTwo from '@/components/soundscapes/create/StepTwo';
import Soundscape from '@/types/Soundscape';
import Sound from '@/types/Sound';
const SOUNDSCAPE_STORAGE_KEY =
  process.env.SOUNDSCAPE_STORAGE_KEY || 'soundscapes';

export default function SoundscapesCreate() {
  const [step, setStep] = useState(1);
  const [soundscape, setSoundscape] = useState<Soundscape>({
    name: '',
    goalType: 'time',
    goalValue: '',
    sounds: [],
  });
  const [allSoundscapes, setAllSoundscapes] = useState<Soundscape[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadSoundscapes = async () => {
      try {
        const storedSoundscapes = await AsyncStorage.getItem(
          SOUNDSCAPE_STORAGE_KEY,
        );
        if (storedSoundscapes) {
          setAllSoundscapes(JSON.parse(storedSoundscapes));
        }
      } catch (error) {
        console.error('Failed to load soundscapes', error);
      }
    };

    loadSoundscapes();
  }, []);

  const handleNextStep = (
    name: string,
    goalType: 'distance' | 'time',
    goalValue: string,
  ) => {
    setSoundscape({ name, goalType, goalValue, sounds: [] });
    setStep(2);
  };

  const handleFinish = async (sounds: Sound[]) => {
    const newSoundscape = { ...soundscape, sounds };
    setSoundscape(newSoundscape);

    try {
      const updatedSoundscapes = [...allSoundscapes, newSoundscape];
      setAllSoundscapes(updatedSoundscapes);
      await AsyncStorage.setItem(
        SOUNDSCAPE_STORAGE_KEY,
        JSON.stringify(updatedSoundscapes),
      );
      router.push('/soundscapes');
    } catch (error) {
      console.error('Failed to save soundscape', error);
    }
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 justify-start items-center py-20 md:px-10 gap-20`}>
        <Text style={tw`font-montserrat font-bold text-2xl text-primary`}>
          Soundscapes Maker
        </Text>

        {step === 1 && <StepOne onNext={handleNextStep} />}
        {step === 2 && (
          <StepTwo soundscape={soundscape} onFinish={handleFinish} />
        )}
      </View>
    </ScrollView>
  );
}
