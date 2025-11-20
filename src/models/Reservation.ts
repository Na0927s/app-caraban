export class Reservation {
  constructor(
    public id: string,
    public userId: string,
    public caravanId: string,
    public startDate: Date,
    public endDate: Date,
    public status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed',
    public price: number,
    public createdAt: Date
  ) {}
}
