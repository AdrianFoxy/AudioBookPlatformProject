export interface AudioBook {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  rating: number;
  bookDuration: string;
  viewCount: number,
  bookMarksCount: number,
  genre: Genre[];
  author: Author[];
  bookAudioFile: AudioFile[];
  bookLanguage: BookLanguage;
  narrator: Narrator;
  bookSeries: BookSeries;
  orderInSeries: number;
  libraryStatusId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AudioFile {
  id: number;
  name: string;
  audioFileUrl: string;
  duration: number | null;
  playbackQueue: string;
}

export interface Genre {
  id: number;
  name: string;
  enName: string;
}

export interface Author {
  id: number;
  name: string;
  enName: string;
}

export interface BookSeries {
  id: number;
  name: string;
  enName: string;
}

export interface BookLanguage {
  id: number;
  name: string;
  enName: string;
}

export interface Narrator {
  id: number;
  name: string;
  mediaUrl: string;
}
