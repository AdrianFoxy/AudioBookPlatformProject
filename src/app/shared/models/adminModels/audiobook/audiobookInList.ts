import { Author } from "../../libraryModels/author";
import { BookLanguage } from "../../libraryModels/bookLanguage";
import { Genre } from "../../libraryModels/genre";
import { Narrator } from "../../libraryModels/narrator";

export interface AudioBookInList {
  id: number;
  name: string;
  rating: number;
  bookDuration: string;
  genre: Genre[];
  author: Author[];
  bookLanguage: BookLanguage;
  narrator: Narrator;
  bookSeries: BookLanguage;
}
