import { Author } from "./author";
import { BookAudioFile } from "./bookAudioFile";
import { BookLanguage } from "../selectModels/bookLanguage";
import { Genre } from "../selectModels/genre";
import { Narrator } from "./narrator";

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
  bookSeries: Genre;
  orderInSeries: number;
  libraryStatusId: number;
}
