export interface AddAudioFile {
  id?: number;
  name: string;
  audioFileUrl: string;
  duration: number | null;
  playbackQueue: string;
}
