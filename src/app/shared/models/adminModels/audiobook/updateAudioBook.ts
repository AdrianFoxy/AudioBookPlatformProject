import { AddAudioFile } from "./audiofile/addAudioFile";

export interface UpdateAudioBook {
  name: string;
  description: string;
  bookLanguageId: number;
  narratorId: number;
  bookSeriesId: number;
  orderInSeries: number;
  authorsIds: number[];
  genresIds: number[];
  audioFilesToDelete: number[];
  audioFiles: AddAudioFile[];
  picture?: File;
}
