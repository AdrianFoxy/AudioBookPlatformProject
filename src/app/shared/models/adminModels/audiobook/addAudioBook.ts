import { AddAudioFile } from "./audiofile/addAudioFile";

interface AddAudioBook {
  name: string;
  description: string;
  bookLanguageId: number;
  narratorId: number;
  bookSeriesId: number;
  orderInSeries: number;
  authorsIds: number[];
  genresIds: number[];
  bookSelectionsIds: number[];
  audioFileUrls: AddAudioFile[];
  picture?: File;
}
