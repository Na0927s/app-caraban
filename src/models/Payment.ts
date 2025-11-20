export class Payment {
  constructor(
    public id: string,
    public userId: string,
    public reservationId: string,
    public amount: number,
    public currency: string,
    public status: 'pending' | 'completed' | 'failed' | 'refunded',
    public paymentDate: Date,
    public method: string // 예: 'card', 'bank transfer'
  ) {}
}
