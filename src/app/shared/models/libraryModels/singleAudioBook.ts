import { Author } from "./author";
import { BookAudioFile } from "./bookAudioFile";

export interface SingleAudioBook {
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
  bookAudioFile: BookAudioFile[];
  bookLanguage: BookLanguage;
  narrator: Narrator;
  bookSeries: BookSeries;
  orderInSeries: number;
  libraryStatusId: number;
}

export interface Genre {
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
