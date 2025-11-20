import { Reservation } from '../models/Reservation';

export class ReservationRepository {
  private reservations: Map<string, Reservation> = new Map();
  // caravanId -> (dateString -> reservationId)
  private bookedDates: Map<string, Map<string, string>> = new Map();

  private getDateString(date: Date): string {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

  // 중복 예약 방지를 위한 핵심 로직
  // 주어진 기간 동안 특정 카라반이 예약 가능한지 확인 (O(N_days))
  public isCaravanBooked(caravanId: string, startDate: Date, endDate: Date): boolean {
    const caravanBookings = this.bookedDates.get(caravanId);
    if (!caravanBookings) {
      return false; // 해당 카라반은 아직 예약된 날짜가 없음
    }

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = this.getDateString(currentDate);
      if (caravanBookings.has(dateString)) {
        return true; // 해당 날짜에 이미 예약이 있음
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false; // 중복 예약 없음
  }

  // 예약 추가 (중복 예약이 없는 경우에만)
  public addReservation(reservation: Reservation): boolean {
    if (this.reservations.has(reservation.id)) {
      console.warn(`Reservation with ID ${reservation.id} already exists.`);
      return false;
    }

    // 중복 예약 확인
    if (this.isCaravanBooked(reservation.caravanId, reservation.startDate, reservation.endDate)) {
      console.warn(`Caravan ${reservation.caravanId} is already booked for the requested period.`);
      return false; // 중복 예약 발생
    }

    this.reservations.set(reservation.id, reservation);

    // bookedDates 맵 업데이트
    if (!this.bookedDates.has(reservation.caravanId)) {
      this.bookedDates.set(reservation.caravanId, new Map());
    }
    const caravanBookings = this.bookedDates.get(reservation.caravanId)!;

    let currentDate = new Date(reservation.startDate);
    while (currentDate <= reservation.endDate) {
      const dateString = this.getDateString(currentDate);
      caravanBookings.set(dateString, reservation.id);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  }

  public getReservationById(id: string): Reservation | undefined {
    return this.reservations.get(id);
  }

  // 예약 제거
  public removeReservation(id: string): boolean {
    const reservationToRemove = this.reservations.get(id);
    if (!reservationToRemove) {
      return false; // 해당 ID의 예약이 없음
    }

    this.reservations.delete(id);

    // bookedDates 맵에서 해당 예약에 의해 점유된 날짜들 제거
    const caravanBookings = this.bookedDates.get(reservationToRemove.caravanId);
    if (caravanBookings) {
      let currentDate = new Date(reservationToRemove.startDate);
      while (currentDate <= reservationToRemove.endDate) {
        const dateString = this.getDateString(currentDate);
        if (caravanBookings.get(dateString) === id) { // 해당 예약이 점유한 날짜만 제거
          caravanBookings.delete(dateString);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // 해당 카라반에 예약된 날짜가 더 이상 없으면 맵에서 제거
      if (caravanBookings.size === 0) {
        this.bookedDates.delete(reservationToRemove.caravanId);
      }
    }
    return true;
  }
}
