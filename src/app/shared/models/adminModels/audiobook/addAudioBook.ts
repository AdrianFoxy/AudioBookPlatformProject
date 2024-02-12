import { AddAudioFile } from "./audiofile/addAudioFile";

export interface AddAudioBook {
  name: string;
  description: string;
  bookLanguageId: number;
  narratorId: number;
  bookSeriesId: number;
  orderInSeries: number;
  authorsIds: number[];
  genresIds: number[];
  audioFiles: AddAudioFile[];
  picture?: File;
}
