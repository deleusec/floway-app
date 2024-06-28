import { Text, View } from 'react-native';
import tw from '@/lib/tailwind';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={tw`flex-1 justify-start items-center py-20 px-10 gap-20`}>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`font-montserrat font-bold text-4xl text-primary mb-2`}>Floway</Text>
        <Text style={tw`font-montserrat text-lg text-gray-500`}>Welcome to Floway</Text>
        <Text style={tw`font-montserrat text-xs text-primary-dark`}>Find your flow, Own your way</Text>
      </View>

      <View style={tw`flex-col`}>
        <Link
          href="/soundscapes"
          style={tw`font-montserrat text-primary hover:text-blue-500`}
        >
          Soundscapes MVP
        </Link>
      </View>
    </View>
  );
}
