export class Review {
  constructor(
    public id: string,
    public reviewerId: string, // 리뷰 작성자 User.id
    public rating: number, // 평점 (1-5점)
    public comment: string, // 리뷰 내용
    public createdAt: Date,
    public reviewedUserId?: string, // 리뷰 대상 사용자 User.id (선택 사항)
    public reviewedCaravanId?: string // 리뷰 대상 카라반 Caravan.id (선택 사항)
  ) {}
}
