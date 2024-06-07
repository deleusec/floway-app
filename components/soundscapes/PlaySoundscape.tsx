import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { Audio } from 'expo-av';
import tw from '@/lib/tailwind';
import Soundscape from '@/types/Soundscape';

interface PlaySoundscapeProps {
  soundscape: Soundscape;
}

const PlaySoundscape: React.FC<PlaySoundscapeProps> = ({ soundscape }) => {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRefs = useRef<Audio.Sound[]>([]);

  const parseTime = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };

  const playSoundAtTime = async (soundFileUri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri: soundFileUri });
    soundRefs.current.push(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    const totalDuration = parseTime(soundscape.goalValue) * 60 * 1000;
    const soundTimers: NodeJS.Timeout[] = [];

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1000);
    }, 1000);

    const playSounds = async () => {
      console.log(soundscape);

      for (const sound of soundscape.sounds) {
        const playAt = parseTime(sound.playAt) * 60 * 1000;
        const timerId = setTimeout(() => {
          playSoundAtTime(sound.file.fileUri);
        }, playAt);
        soundTimers.push(timerId);
      }
    };

    playSounds();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      soundTimers.forEach((timer) => clearTimeout(timer));
      soundRefs.current.forEach((sound) => sound.unloadAsync());
    };
  }, [soundscape]);

  useEffect(() => {
    const totalDuration = parseTime(soundscape.goalValue) * 60 * 1000;
    if (timer >= totalDuration) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      Alert.alert('Soundscape Finished', 'The soundscape has finished playing.');
    }
  }, [timer]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`font-montserrat text-xl`}>Playing Soundscape: {soundscape.name}</Text>
      <Text style={tw`font-montserrat text-lg`}>
        Time: {Math.floor(timer / 60000)}:
        {Math.floor((timer % 60000) / 1000).toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

export default PlaySoundscape;
