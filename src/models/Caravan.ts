export class Caravan {
  constructor(
    public id: string,
    public hostId: string, // User.id
    public capacity: number, // 수용 인원
    public amenities: string[], // 편의시설 (예: WiFi, 에어컨)
    public photos: string[], // 사진 URL 배열
    public location: string, // 위치
    public dailyRate: number, // 일일 요금
    public status: 'available' | 'reserved' | 'maintenance' // 카라반 상태
  ) {}
}
