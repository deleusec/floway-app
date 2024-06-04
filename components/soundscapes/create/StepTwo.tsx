import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import tw from '@/lib/tailwind';
import Soundscape from '@/types/Soundscape';
import Sound from '@/types/Sound';

interface StepTwoProps {
  soundscape: Soundscape;
  onFinish: (sounds: Sound[]) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ soundscape, onFinish }) => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    } as DocumentPicker.DocumentPickerOptions);

    result.assets?.map((asset) => {
      setSounds([
        ...sounds,
        {
          anchor: 'start',
          playAt: '00:00',
          file: {
            name: asset.name,
            fileUri: asset.uri,
          },
        },
      ]);
    });
    setShowOptions(false);
  };

  const handleFinish = () => {
    onFinish(sounds);
  };

  const playSound = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleBlurTime = (index: number, type: 'hours' | 'minutes', value: string) => {
    const [hours, minutes] = sounds[index].playAt.split(':');
    const newTime = type === 'hours' ? `${value.padStart(2, '0')}:${minutes}` : `${hours}:${value.padStart(2, '0')}`;
    const newSounds = sounds.map((s, i) => (i === index ? { ...s, playAt: newTime } : s));
    setSounds(newSounds);
  };

  const handleBlurDistance = (index: number, type: 'kilometers' | 'meters', value: string) => {
    const [kilometers, meters] = sounds[index].playAt.split('.');
    const newDistance = type === 'kilometers' ? `${value.padStart(2, '0')}.${meters}` : `${kilometers}.${value.padStart(2, '0')}`;
    const newSounds = sounds.map((s, i) => (i === index ? { ...s, playAt: newDistance } : s));
    setSounds(newSounds);
  };

  return (
    <View style={tw`flex-col items-center p-8 bg-white rounded-lg max-w-[500px] w-full`}>
      <Text style={tw`text-xl text-primary mb-5`}>{soundscape.name}</Text>
      <Text style={tw`text-lg text-gray-700 mb-2`}>Goal Type: {soundscape.goalType}</Text>
      <Text style={tw`text-lg text-gray-700 mb-5`}>Goal Value: {soundscape.goalValue}</Text>

      <View style={[tw`relative mb-5`, { zIndex: 10 }]}>
        <Pressable
          style={tw`bg-blue-600 py-2 px-4 rounded-lg`}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Text style={tw`text-white text-center`}>Add Audio Element</Text>
        </Pressable>
        {showOptions && (
          <View style={tw`absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2`}>
            <Pressable style={tw`py-2`} onPress={pickDocument}>
              <Text style={tw`text-gray-800`}>Import Audio</Text>
            </Pressable>
            <Pressable style={tw`py-2`} onPress={() => console.log('Record Audio')}>
              <Text style={tw`text-gray-800`}>Record Audio</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={tw`w-full items-center mb-5`}>
        {sounds.map((sound, index) => {
          const [hours, minutes] = sound.playAt.split(':');
          const [kilometers, meters] = sound.playAt.split('.');

          return (
            <View key={index} style={tw`flex-col items-center mb-4 w-full`}>
              <View style={tw`w-10/12 bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-300`}>
                <View style={tw`flex-row items-center justify-between mb-2`}>
                  <Text style={tw`text-gray-800 flex-1`}>{sound.file.name}</Text>
                  <Pressable onPress={() => playSound(sound.file.fileUri)} style={tw`ml-2 bg-blue-600 py-1 px-3 rounded-lg`}>
                    <Text style={tw`text-white`}>Play</Text>
                  </Pressable>
                  <Pressable onPress={stopSound} style={tw`ml-2 bg-red-600 py-1 px-3 rounded-lg`}>
                    <Text style={tw`text-white`}>Stop</Text>
                  </Pressable>
                </View>

                {soundscape.goalType === 'time' && (
                  <View style={tw`flex-row mb-5`}>
                    <TextInput
                      style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
                      placeholder="hh"
                      defaultValue={hours}
                      onBlur={(e) => handleBlurTime(index, 'hours', e.nativeEvent.text)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <Text style={tw`text-lg text-gray-700`}>:</Text>
                    <TextInput
                      style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
                      placeholder="mm"
                      defaultValue={minutes}
                      onBlur={(e) => handleBlurTime(index, 'minutes', e.nativeEvent.text)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                )}
                {soundscape.goalType === 'distance' && (
                  <View style={tw`flex-row mb-5`}>
                    <TextInput
                      style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
                      placeholder="km"
                      defaultValue={kilometers}
                      onBlur={(e) => handleBlurDistance(index, 'kilometers', e.nativeEvent.text)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <Text style={tw`text-lg text-gray-700`}>,</Text>
                    <TextInput
                      style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
                      placeholder="m"
                      defaultValue={meters}
                      onBlur={(e) => handleBlurDistance(index, 'meters', e.nativeEvent.text)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <Pressable onPress={handleFinish} style={tw`bg-green-600 py-2 px-4 rounded-lg`}>
        <Text style={tw`text-white text-center`}>Finish</Text>
      </Pressable>
    </View>
  );
};

export default StepTwo;
