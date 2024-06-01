import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from '@/lib/tailwind';
import { useState } from 'react';

export default function SoundscapesCreate() {
  const [step, setStep] = useState(1);
  const [goalType, setGoalType] = useState<'distance' | 'time' | null>(null);
  const [goalValue, setGoalValue] = useState<string>('');

  const handleNextStep = () => {
    if (step === 1 && goalType && goalValue) {
      setStep(2);
    }
  };

  return (
    <View style={tw`flex-1 justify-start items-center py-20 px-10 gap-20`}>
      <Text style={tw`font-bold text-2xl text-primary`}>
        Welcome in the Soundscapes Creator
      </Text>

      {step === 1 && (
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-lg text-gray-500 mb-5`}>Choose your goal type</Text>
          <View style={tw`flex-row mb-5`}>
            <TouchableOpacity
              style={tw`bg-primary py-2 px-4 mx-2 rounded`}
              onPress={() => setGoalType('distance')}
            >
              <Text style={tw`text-white`}>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-primary py-2 px-4 mx-2 rounded`}
              onPress={() => setGoalType('time')}
            >
              <Text style={tw`text-white`}>Time</Text>
            </TouchableOpacity>
          </View>
          {goalType && (
            <View style={tw`w-full items-center`}>
              <Text style={tw`text-lg text-gray-500 mb-2`}>
                Enter your {goalType === 'distance' ? 'distance (e.g. 5km)' : 'time (e.g. 30:00)'}
              </Text>
              <TextInput
                style={tw`border border-gray-300 rounded py-2 px-4 w-full mb-5`}
                placeholder={goalType === 'distance' ? 'e.g. 5km' : 'e.g. 30:00'}
                value={goalValue}
                onChangeText={setGoalValue}
                keyboardType={goalType === 'distance' ? 'numeric' : 'default'}
              />
              <Button title="Next" onPress={handleNextStep} disabled={!goalValue} />
            </View>
          )}
        </View>
      )}

      {step === 2 && (
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-lg text-gray-500 mb-5`}>Step 2: Add your soundscapes details</Text>
          {/* Here you can add more components for the second step */}
        </View>
      )}
    </View>
  );
}
