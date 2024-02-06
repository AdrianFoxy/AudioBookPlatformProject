import { Author } from "../../libraryModels/author";
import { BookLanguage } from "../../selectModels/bookLanguage";
import { Genre } from "../../selectModels/genre";
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
