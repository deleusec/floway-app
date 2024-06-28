import tw from '@/lib/tailwind';
import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Slot />
    </View>
  );
}
