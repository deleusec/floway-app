import React, { useState, useEffect } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [showTimePicker, setShowTimePicker] = useState<{
    index: number;
    show: boolean;
  }>({ index: -1, show: false });
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    } as DocumentPicker.DocumentPickerOptions);

    result.assets?.map(async (asset) => {
      let fileUri = asset.uri;

      if (Platform.OS !== 'web') {
        const newUri = `${FileSystem.documentDirectory}${asset.name}`;
        await FileSystem.copyAsync({ from: asset.uri, to: newUri });
        fileUri = newUri;
      }

      setSounds((prevSounds) => [
        ...prevSounds,
        {
          anchor: 'start',
          playAt: '00:00',
          file: {
            name: asset.name,
            fileUri: fileUri,
          },
        },
      ]);
    });
    setShowOptions(false);
  };

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);

      const fileName = `recording-${Date.now()}.m4a`;

      let fileUri = uri;
      if (Platform.OS !== 'web') {
        const newUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.moveAsync({
          from: uri!,
          to: newUri,
        });
        fileUri = newUri;
      }

      setSounds((prevSounds) => [
        ...prevSounds,
        {
          anchor: 'start',
          playAt: '00:00',
          file: {
            name: fileName,
            fileUri: fileUri,
          },
        },
      ]);
      setRecording(null);
    }
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

  const handleBlurTime = (
    index: number,
    type: 'hours' | 'minutes',
    value: string,
  ) => {
    const [hours, minutes] = sounds[index].playAt.split(':');
    const newTime =
      type === 'hours'
        ? `${(value || '00').padStart(2, '0')}:${(minutes || '00').padStart(2, '0')}`
        : `${(hours || '00').padStart(2, '0')}:${(value || '00').padStart(2, '0')}`;
    const newSounds = sounds.map((s, i) =>
      i === index ? { ...s, playAt: newTime } : s,
    );
    setSounds(newSounds);
  };

  const handleBlurDistance = (
    index: number,
    type: 'kilometers' | 'meters',
    value: string,
  ) => {
    const [kilometers, meters] = sounds[index].playAt.split('.');
    const newDistance =
      type === 'kilometers'
        ? `${(value || '00').padStart(2, '0')}.${(meters || '00').padStart(2, '0')}`
        : `${(kilometers || '00').padStart(2, '0')}.${(value || '00').padStart(2, '0')}`;
    const newSounds = sounds.map((s, i) =>
      i === index ? { ...s, playAt: newDistance } : s,
    );
    setSounds(newSounds);
  };

  const handleTimeChange = (
    event: any,
    selectedTime: Date | undefined,
    index: number,
  ) => {
    setShowTimePicker({ index: -1, show: false });
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const newTime = `${hours}:${minutes}`;
      const newSounds = sounds.map((s, i) =>
        i === index ? { ...s, playAt: newTime } : s,
      );
      setSounds(newSounds);
    }
  };

  return (
    <ScrollView>
      <View
        style={tw`flex-col items-center p-4 bg-white rounded-lg max-w-[500px] w-full`}
      >
        <Text style={tw`font-poppins text-xl text-primary mb-5`}>{soundscape.name}</Text>
        <Text style={tw`font-poppins text-lg text-gray-700 mb-2`}>
          Goal Type: {soundscape.goalType}
        </Text>
        <Text style={tw`text-lg text-gray-700 mb-5`}>
          Goal Value: {soundscape.goalValue}
        </Text>

        <View style={[tw`relative mb-5`, { zIndex: 10 }]}>
          <Pressable
            style={tw`bg-blue-600 py-2 px-4 rounded-lg`}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text style={tw`font-poppins text-white text-center`}>Add Audio Element</Text>
          </Pressable>
          {showOptions && (
            <View
              style={tw`absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2`}
            >
              <Pressable style={tw`py-2`} onPress={pickDocument}>
                <Text style={tw`font-poppins text-gray-800`}>Import Audio</Text>
              </Pressable>
              <Pressable
                style={tw`py-2`}
                onPress={recording ? stopRecording : startRecording}
              >
                <Text style={tw`font-poppins text-gray-800`}>
                  {recording ? 'Stop Recording' : 'Record Audio'}
                </Text>
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
                <View
                  style={tw`w-10/12 bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-300`}
                >
                  <View style={tw`flex-col items-center justify-between mb-2`}>
                    <Text style={tw`font-poppins text-gray-800 flex-1`}>
                      {sound.file.name}
                    </Text>
                    <Pressable
                      onPress={() => playSound(sound.file.fileUri)}
                      style={tw`ml-2 bg-blue-600 py-1 px-3 rounded-lg`}
                    >
                      <Text style={tw`font-poppins text-white`}>Play</Text>
                    </Pressable>
                    <Pressable
                      onPress={stopSound}
                      style={tw`ml-2 bg-red-600 py-1 px-3 rounded-lg`}
                    >
                      <Text style={tw`font-poppins text-white`}>Stop</Text>
                    </Pressable>
                  </View>

                  {soundscape.goalType === 'time' && (
                    <View style={tw`flex-row mb-5`}>
                      {Platform.OS !== 'web' ? (
                        <>
                          <Pressable
                            onPress={() =>
                              setShowTimePicker({ index, show: true })
                            }
                            style={tw`border border-gray-400 rounded-lg py-2 px-4 w-40 text-center`}
                          >
                            <Text style={tw`font-poppins`} >{sound.playAt}</Text>
                          </Pressable>
                          {showTimePicker.show &&
                            showTimePicker.index === index && (
                              <DateTimePicker
                                value={new Date()}
                                mode="time"
                                display="default"
                                onChange={(event, date) =>
                                  handleTimeChange(event, date, index)
                                }
                              />
                            )}
                        </>
                      ) : (
                        <>
                          <TextInput
                            style={tw`font-poppins border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
                            placeholder="hh"
                            defaultValue={hours}
                            onBlur={(e) =>
                              handleBlurTime(index, 'hours', e.nativeEvent.text)
                            }
                            keyboardType="numeric"
                            maxLength={2}
                          />
                          <Text style={tw`font-poppins text-lg text-gray-700`}>:</Text>
                          <TextInput
                            style={tw`font-poppins border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
                            placeholder="mm"
                            defaultValue={minutes}
                            onBlur={(e) =>
                              handleBlurTime(
                                index,
                                'minutes',
                                e.nativeEvent.text,
                              )
                            }
                            keyboardType="numeric"
                            maxLength={2}
                          />
                        </>
                      )}
                    </View>
                  )}
                  {soundscape.goalType === 'distance' && (
                    <View style={tw`flex-row mb-5`}>
                      <TextInput
                        style={tw`font-poppins border border-gray-400 rounded-lg py-2 px-4 w-20 mr-2 text-center`}
                        placeholder="km"
                        defaultValue={kilometers}
                        onBlur={(e) =>
                          handleBlurDistance(
                            index,
                            'kilometers',
                            e.nativeEvent.text,
                          )
                        }
                        keyboardType="numeric"
                        maxLength={2}
                      />
                      <Text style={tw`font-poppins text-lg text-gray-700`}>,</Text>
                      <TextInput
                        style={tw`font-poppins border border-gray-400 rounded-lg py-2 px-4 w-20 ml-2 text-center`}
                        placeholder="m"
                        defaultValue={meters}
                        onBlur={(e) =>
                          handleBlurDistance(
                            index,
                            'meters',
                            e.nativeEvent.text,
                          )
                        }
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

        <Pressable
          onPress={handleFinish}
          style={tw`bg-green-600 py-2 px-4 rounded-lg`}
        >
          <Text style={tw`font-poppins text-white text-center`}>Finish</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default StepTwo;
