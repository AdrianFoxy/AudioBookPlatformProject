export interface StreamState {
  playing: boolean; // a boolean which indicates if there is any audio playing
  readableCurrentTime: string; // a string which gives you the current time of playing audio in a human-readable form
  readableDuration: string; // the human-readable duration of the current audio
  duration: number | undefined; // the duration of current audio in milliseconds
  currentTime: number | undefined; // the current time of audio in milliseconds
  canplay: boolean; // boolean to indicate if you can play the selected audio or not
  error: boolean; // a boolean to indicate if an error occurred while playing audio or not
}
