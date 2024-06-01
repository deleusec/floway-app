import { Text, View } from 'react-native';
import tw from '@/lib/tailwind';
import { Link } from 'expo-router';

export default function Soundscapes() {
  return (
    <View style={tw`flex-1 justify-start items-center py-20 px-10 gap-20`}>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`font-bold text-2xl text-primary`}>Soundscapes</Text>
        <Text style={tw`text-lg text-gray-500`}>Find different Soundscapes</Text>
      </View>

      <View style={tw`flex-col space-x-10`}>
        <Link
          href="/soundscapes/create"
          style={tw`text-primary hover:text-blue-500`}
        >
          Create one
        </Link>
      </View>
    </View>
  );
}
