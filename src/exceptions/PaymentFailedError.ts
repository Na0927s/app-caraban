export class PaymentFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentFailedError";
  }
}
