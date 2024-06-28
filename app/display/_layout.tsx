import tw from '@/lib/tailwind';
import { Link, Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function DisplayLayout() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <Slot />
      </View>

      <View style={tw`h-[90px] bg-[#2A2D36]`}>
        <Link
          href="/soundscapes"
          style={tw`font-poppins text-primary hover:text-blue-500`}
        >
          Marketplace
        </Link>
      </View>
    </View>
  );
}
