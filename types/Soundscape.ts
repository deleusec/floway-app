import Sound from "./Sound";

interface Soundscape {
  name: string;
  goalType: 'distance' | 'time';
  goalValue: string;
  sounds: Sound[];
}

export default Soundscape;
