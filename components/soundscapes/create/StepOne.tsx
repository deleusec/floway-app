import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import tw from '@/lib/tailwind';

interface StepOneProps {
  onNext: (name: string, goalType: 'distance' | 'time', goalValue: string) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
  const [name, setName] = useState<string>('New soundscape');
  const [goalType, setGoalType] = useState<'distance' | 'time' | null>(null);
  const [kilometers, setKilometers] = useState<string>('0');
  const [meters, setMeters] = useState<string>('00');
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');

  const handleNext = () => {
    if (goalType === 'distance') {
      onNext(name, goalType, `${kilometers.padStart(2, '0')}.${meters.padStart(2, '0')}`);
    } else if (goalType === 'time') {
      onNext(name, goalType, `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
    }
  };

  const isNextDisabled = () => {
    if (goalType === 'distance') {
      return !(kilometers || meters);
    } else if (goalType === 'time') {
      return !(hours || minutes);
    }
    return true;
  };

  return (
    <View style={tw`flex-col items-center p-8 bg-white rounded-lg w-full max-w-[500px]`}>
      <Text style={tw`text-xl text-gray-800 mb-5`}>Name your soundscape</Text>
      <TextInput
        style={tw`border border-gray-400 rounded-lg py-2 px-4 w-full mb-5`}
        value={name}
        onChangeText={setName}
      />
      <Text style={tw`text-lg text-gray-700 mb-5`}>Choose your goal type</Text>
      <View style={tw`flex-row mb-5`}>
        <Pressable
          style={[
            tw`py-2 px-4 mx-2 rounded-lg`,
            goalType === 'distance' ? tw`bg-blue-600` : tw`bg-blue-300`,
          ]}
          onPress={() => setGoalType('distance')}
        >
          <Text style={tw`text-white`}>Distance</Text>
        </Pressable>
        <Pressable
          style={[
            tw`py-2 px-4 mx-2 rounded-lg`,
            goalType === 'time' ? tw`bg-blue-600` : tw`bg-blue-300`,
          ]}
          onPress={() => setGoalType('time')}
        >
          <Text style={tw`text-white`}>Time</Text>
        </Pressable>
      </View>
      {goalType === 'distance' && (
        <View style={tw`w-full items-center`}>
          <Text style={tw`text-lg text-gray-700 mb-2`}>Enter distance (km, m)</Text>
          <View style={tw`flex-row mb-5`}>
            <TextInput
              style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
              placeholder="km"
              value={kilometers}
              onChangeText={setKilometers}
              keyboardType="numeric"
            />
            <Text style={tw`text-lg text-gray-700`}>,</Text>
            <TextInput
              style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
              placeholder="m"
              value={meters}
              onChangeText={setMeters}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
      )}
      {goalType === 'time' && (
        <View style={tw`w-full items-center`}>
          <Text style={tw`text-lg text-gray-700 mb-2`}>Enter time (hh:mm)</Text>
          <View style={tw`flex-row mb-5`}>
            <TextInput
              style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
              placeholder="hh"
              value={hours}
              onChangeText={setHours}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={tw`text-lg text-gray-700`}>:</Text>
            <TextInput
              style={tw`border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
              placeholder="mm"
              value={minutes}
              onChangeText={setMinutes}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
      )}
      <Pressable
        onPress={handleNext}
        disabled={isNextDisabled()}
        style={[
          tw`py-2 px-4 rounded-lg mt-8`,
          isNextDisabled() ? tw`bg-gray-400` : tw`bg-blue-600`,
        ]}
      >
        <Text style={tw`text-white`}>Next</Text>
      </Pressable>
    </View>
  );
};

export default StepOne;
