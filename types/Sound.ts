import File from "./File";

interface Sound {
  anchor: 'start' | 'end';
  playAt: string;
  file: File
}

export default Sound;
