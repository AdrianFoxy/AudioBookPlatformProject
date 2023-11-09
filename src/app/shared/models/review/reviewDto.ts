export class ReviewDto {
  id? : number;
  reviewText: string = "";
  rating: number | null = null; // Change the default value to null
  audioBookId: number = 0;
  userId: number = 0;
}
