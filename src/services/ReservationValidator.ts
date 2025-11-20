import { Reservation } from '../models/Reservation';
import { ReservationRepository } from '../repositories/ReservationRepository';
import { ValidationError } from '../exceptions/ValidationError';

export class ReservationValidator {
  constructor(private reservationRepository: ReservationRepository) {}

  // 날짜 순서 유효성 검사 (시작일 <= 종료일)
  public validateDateOrder(startDate: Date, endDate: Date): boolean {
    if (startDate > endDate) {
      throw new ValidationError("시작일은 종료일보다 빠르거나 같아야 합니다.");
    }
    return true;
  }

  // 미래 날짜 유효성 검사 (시작일 > 현재)
  public validateFutureDate(startDate: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간 정보 제거하여 날짜만 비교
    if (startDate <= now) {
      throw new ValidationError("예약 시작일은 오늘 이후여야 합니다.");
    }
    return true;
  }

  // 예약 가능 여부 유효성 검사 (중복 예약 방지)
  public validateBookingAvailability(caravanId: string, startDate: Date, endDate: Date): boolean {
    if (this.reservationRepository.isCaravanBooked(caravanId, startDate, endDate)) {
      throw new ValidationError(`카라반 ${caravanId}는 해당 기간에 이미 예약되어 있습니다.`);
    }
    return true;
  }

  // 모든 유효성 검사를 수행하는 메인 메서드
  public validate(reservation: Reservation): boolean {
    // 1. 날짜 순서 검사
    this.validateDateOrder(reservation.startDate, reservation.endDate);

    // 2. 미래 날짜 검사
    this.validateFutureDate(reservation.startDate);

    // 3. 예약 가능 여부 검사 (중복 예약 방지)
    this.validateBookingAvailability(
      reservation.caravanId,
      reservation.startDate,
      reservation.endDate
    );

    // 모든 검증을 통과하면 true 반환
    return true;
  }
}
