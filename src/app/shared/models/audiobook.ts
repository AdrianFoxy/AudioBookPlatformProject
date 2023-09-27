import { Author } from "./author";

export interface AudioBook {
  id: number;
  name: string;
  pictureUrl: string;
  rating: number;
  bookDuration: string;
  author: Author[];
}
