import tw from '@/lib/tailwind';
import React from 'react';
import { View } from 'react-native';
import MapComponent from '@/components/MapComponent'

export default function HomeScreen() {
  return (
    <View style={tw`flex-1`}>
      <MapComponent />
    </View>
  )
}
