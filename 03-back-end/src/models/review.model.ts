export interface ReviewModel {
    reviewId?: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    ratedUserId: number;
    ruserWhoRatedId: number;
}