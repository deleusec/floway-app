import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PlaySoundscape from '@/components/soundscapes/PlaySoundscape';
import Soundscape from '@/types/Soundscape';

export default function PlaySoundscapeScreen() {
  const { soundscape } = useLocalSearchParams();
  const parsedSoundscape: Soundscape = JSON.parse(soundscape as string);

  return <PlaySoundscape soundscape={parsedSoundscape} />;
}
