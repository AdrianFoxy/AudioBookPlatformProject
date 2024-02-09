import { Author } from "../../libraryModels/author";
import { SelectBookLanguage } from "../../selectModels/selectBookLanguage";
import { SelectGenre } from "../../selectModels/selectGenre";
import { SelectBookSeries } from "../../selectModels/selectbookSeries";
import { SelectNarrator } from "../../selectModels/selectNarrator";

export interface AudioBookInList {
  id: number;
  name: string;
  rating: number;
  bookDuration: string;
  genre: SelectGenre[];
  author: Author[];
  bookLanguage: SelectBookLanguage;
  narrator: SelectNarrator;
  bookSeries: SelectBookSeries;
}
