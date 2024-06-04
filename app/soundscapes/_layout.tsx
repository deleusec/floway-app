import { Link, Slot } from 'expo-router';
import React from 'react';
import tw from '@/lib/tailwind';
import { View } from 'react-native';

export default function SoundscapesLayout() {
  return (
    <>
      <View style={tw`flex-col items-start p-4`}>
        <Link href="/" style={tw`text-lg text-primary mb-5 font-bold`}>
          Home
        </Link>
      </View>
      <Slot />
    </>
  );
}
