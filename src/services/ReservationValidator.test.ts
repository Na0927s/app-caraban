import { ReservationValidator } from '@services/ReservationValidator';
import { ReservationRepository } from '@repositories/ReservationRepository';
import { ValidationError } from '@exceptions/ValidationError';
import { Reservation } from '@models/Reservation';

// ReservationRepository 클래스를 완전히 목업
jest.mock('@repositories/ReservationRepository');

// jest.mock을 사용하면 MockReservationRepository가 ReservationRepository의 목업된 생성자를 가리킴
const MockReservationRepository = ReservationRepository as jest.Mock<ReservationRepository>;

describe('ReservationValidator', () => {
  let validator: ReservationValidator;
  let mockRepositoryInstance: jest.Mocked<ReservationRepository>; // 목업된 인스턴스

  beforeEach(() => {
    // 각 테스트 전에 목업 상태 초기화
    jest.clearAllMocks(); // 모든 mock 함수 초기화
    
    // ReservationRepository의 목업 인스턴스 생성 및 초기화
    mockRepositoryInstance = new MockReservationRepository() as jest.Mocked<ReservationRepository>;
    
    // validator에 목업 인스턴스 주입
    validator = new ReservationValidator(mockRepositoryInstance);
  });

  // --- validateDateOrder 테스트 ---
  describe('validateDateOrder', () => {
    it('시작일이 종료일보다 빠르면 true를 반환해야 한다', () => {
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-01-02');
      expect(validator.validateDateOrder(startDate, endDate)).toBe(true);
    });

    it('시작일과 종료일이 같으면 true를 반환해야 한다', () => {
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-01-01');
      expect(validator.validateDateOrder(startDate, endDate)).toBe(true);
    });

    it('시작일이 종료일보다 늦으면 ValidationError를 던져야 한다', () => {
      const startDate = new Date('2025-01-02');
      const endDate = new Date('2025-01-01');
      expect(() => validator.validateDateOrder(startDate, endDate)).toThrow(ValidationError);
      expect(() => validator.validateDateOrder(startDate, endDate)).toThrow("시작일은 종료일보다 빠르거나 같아야 합니다.");
    });
  });

  // --- validateFutureDate 테스트 ---
  describe('validateFutureDate', () => {
    beforeAll(() => {
      jest.useFakeTimers(); // Date 객체 목업 시작
      // 로컬 시간 기준으로 2025년 11월 21일 00:00:00으로 설정
      jest.setSystemTime(new Date(2025, 10, 21, 0, 0, 0)); 
    });

    afterAll(() => {
      jest.useRealTimers(); // 테스트 후 실제 Date 객체로 복원
    });

    it('시작일이 미래이면 true를 반환해야 한다', () => {
      const startDate = new Date(2025, 10, 22, 0, 0, 0); // 목업 날짜의 다음날 0시
      expect(validator.validateFutureDate(startDate)).toBe(true);
    });

    it('시작일이 오늘이면 ValidationError를 던져야 한다', () => {
      const startDate = new Date(2025, 10, 21, 0, 0, 0); // 목업 날짜의 오늘 0시
      expect(() => validator.validateFutureDate(startDate)).toThrow(ValidationError);
      expect(() => validator.validateFutureDate(startDate)).toThrow("예약 시작일은 오늘 이후여야 합니다.");
    });

    it('시작일이 과거이면 ValidationError를 던져야 한다', () => {
      const startDate = new Date(2025, 10, 20, 0, 0, 0); // 목업 날짜의 이전날 0시
      expect(() => validator.validateFutureDate(startDate)).toThrow(ValidationError);
      expect(() => validator.validateFutureDate(startDate)).toThrow("예약 시작일은 오늘 이후여야 합니다.");
    });
  });

  // --- validateBookingAvailability 테스트 ---
  describe('validateBookingAvailability', () => {
    it('카라반이 예약 가능하면 true를 반환해야 한다', () => {
      mockRepositoryInstance.isCaravanBooked.mockReturnValue(false); // 예약 가능
      const caravanId = 'caravan1';
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-01-03');
      expect(validator.validateBookingAvailability(caravanId, startDate, endDate)).toBe(true);
      expect(mockRepositoryInstance.isCaravanBooked).toHaveBeenCalledWith(caravanId, startDate, endDate);
    });

    it('카라반이 이미 예약되어 있으면 ValidationError를 던져야 한다', () => {
      mockRepositoryInstance.isCaravanBooked.mockReturnValue(true); // 이미 예약됨
      const caravanId = 'caravan1';
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-01-03');
      expect(() => validator.validateBookingAvailability(caravanId, startDate, endDate)).toThrow(ValidationError);
      expect(() => validator.validateBookingAvailability(caravanId, startDate, endDate)).toThrow(`카라반 ${caravanId}는 해당 기간에 이미 예약되어 있습니다.`);
      expect(mockRepositoryInstance.isCaravanBooked).toHaveBeenCalledWith(caravanId, startDate, endDate);
    });
  });

  // --- validate 테스트 (메인 검증 로직) ---
  describe('validate', () => {
    let mockReservation: Reservation;
    // validator 인스턴스와 스파이를 각 테스트마다 새로 생성/할당
    let testValidator: ReservationValidator;
    let spyValidateDateOrder: jest.SpyInstance;
    let spyValidateFutureDate: jest.SpyInstance;
    let spyValidateBookingAvailability: jest.SpyInstance;

    beforeEach(() => {
      mockReservation = {
        id: 'res1',
        userId: 'user1',
        caravanId: 'caravan1',
        startDate: new Date(2025, 10, 22, 0, 0, 0), // 미래 날짜 (로컬 0시)
        endDate: new Date(2025, 10, 24, 0, 0, 0),
        status: 'pending',
        price: 100,
        createdAt: new Date(),
      };
      
      // validate 테스트 내에서만 사용될 새로운 validator 인스턴스 생성
      // 이 인스턴스에 대한 의존성도 새로 주입
      const newMockRepositoryInstance = new MockReservationRepository() as jest.Mocked<ReservationRepository>;
      testValidator = new ReservationValidator(newMockRepositoryInstance);

      // testValidator의 메서드에 스파이 설정
      spyValidateDateOrder = jest.spyOn(testValidator, 'validateDateOrder').mockReturnValue(true);
      spyValidateFutureDate = jest.spyOn(testValidator, 'validateFutureDate').mockReturnValue(true);
      spyValidateBookingAvailability = jest.spyOn(testValidator, 'validateBookingAvailability').mockReturnValue(true);
    });

    afterEach(() => {
      // 각 테스트 후 스파이 복원
      spyValidateDateOrder.mockRestore();
      spyValidateFutureDate.mockRestore();
      spyValidateBookingAvailability.mockRestore();
    });


    it('모든 검증을 통과하면 true를 반환해야 한다', () => {
      expect(testValidator.validate(mockReservation)).toBe(true);
      expect(spyValidateDateOrder).toHaveBeenCalledWith(mockReservation.startDate, mockReservation.endDate);
      expect(spyValidateFutureDate).toHaveBeenCalledWith(mockReservation.startDate);
      expect(spyValidateBookingAvailability).toHaveBeenCalledWith(
        mockReservation.caravanId,
        mockReservation.startDate,
        mockReservation.endDate
      );
    });

    it('validateDateOrder가 실패하면 ValidationError를 던져야 한다', () => {
      spyValidateDateOrder.mockImplementation(() => {
        throw new ValidationError('날짜 순서 에러');
      });
      expect(() => testValidator.validate(mockReservation)).toThrow(ValidationError);
      expect(() => testValidator.validate(mockReservation)).toThrow('날짜 순서 에러');
      expect(spyValidateDateOrder).toHaveBeenCalled(); // 변경
      expect(spyValidateFutureDate).not.toHaveBeenCalled();
      expect(spyValidateBookingAvailability).not.toHaveBeenCalled();
    });

    it('validateFutureDate가 실패하면 ValidationError를 던져야 한다', () => {
      spyValidateFutureDate.mockImplementation(() => {
        throw new ValidationError('미래 날짜 에러');
      });
      expect(() => testValidator.validate(mockReservation)).toThrow(ValidationError);
      expect(() => testValidator.validate(mockReservation)).toThrow('미래 날짜 에러');
      expect(spyValidateDateOrder).toHaveBeenCalled(); // 변경
      expect(spyValidateFutureDate).toHaveBeenCalled(); // 변경
      expect(spyValidateBookingAvailability).not.toHaveBeenCalled();
    });

    it('validateBookingAvailability가 실패하면 ValidationError를 던져야 한다', () => {
      spyValidateBookingAvailability.mockImplementation(() => {
        throw new ValidationError('예약 가능 여부 에러');
      });
      expect(() => testValidator.validate(mockReservation)).toThrow(ValidationError);
      expect(() => testValidator.validate(mockReservation)).toThrow('예약 가능 여부 에러');
      expect(spyValidateDateOrder).toHaveBeenCalled(); // 변경
      expect(spyValidateFutureDate).toHaveBeenCalled(); // 변경
      expect(spyValidateBookingAvailability).toHaveBeenCalled(); // 변경
    });
  });
});
