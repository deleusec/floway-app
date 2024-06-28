import tw from '@/lib/tailwind';
import { Slot, Link, usePathname } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function AppLayout() {
  const path = usePathname();
  const isActive = (currentPath: any) => path === currentPath;
  return (
    <View style={tw`flex-1 bg-[#1C1F26] pt-5 relative`}>
      <View style={tw`w-full flex-row justify-between`}>
        <Image src=''></Image>
      </View>

      <View style={tw`flex-1`}>
        <Slot />
      </View>

      <View
        style={tw`h-[90px] bg-[#2A2D36] flex-row justify-between items-center p-2`}
      >
        <Link href="/marketplace" style={tw`w-[24px] items-center`}>
          <View
            style={tw`flex items-center justify-center rounded-full relative ${isActive('/marketplace') ? 'opacity-100' : 'opacity-50'}`}
          >
            <FontAwesome6
              name="bag-shopping"
              size={24}
              style={tw`text-primary`}
            />
            {isActive('/marketplace') && (
              <View
                style={tw`absolute bottom-[-3px] w-full h-[3px] bg-primary rounded-full`}
              />
            )}
          </View>
        </Link>
        <Link href="/" style={tw`w-[24px] items-center`}>
          <View
            style={tw`flex items-center justify-center rounded-full relative ${isActive('/') ? 'opacity-100' : 'opacity-50'}`}
          >
            <FontAwesome6 name="house" size={24} style={tw`text-primary`} />
          </View>
        </Link>
        <Link
          href="/run"
          style={[
            tw`w-[64px] items-center`,
            { transform: [{ translateY: -32 }] },
          ]}
        >
          <View style={tw`flex items-center justify-center`}>
            <FontAwesome
              name="play-circle"
              size={64}
              style={tw`text-primary`}
            />
          </View>
        </Link>
        <Link href="/soundscapes" style={tw`w-[24px] items-center`}>
          <View
            style={tw`flex items-center justify-center rounded-full relative ${isActive('/soundscapes') ? 'opacity-100' : 'opacity-50'}`}
          >
            <FontAwesome6
              name="headphones"
              size={24}
              style={tw`text-primary`}
            />
          </View>
        </Link>
        <Link href="/data" style={tw`w-[24px] items-center`}>
        <View style={tw`flex items-center justify-center rounded-full relative ${isActive('/data') ? 'opacity-100' : 'opacity-50'}`}>
            <FontAwesome6
              name="chart-simple"
              size={24}
              style={tw`text-primary`}
            />
          </View>
        </Link>
      </View>
    </View>
  );
}
