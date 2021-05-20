export class MyOrder {
  constructor(
    public ownerId: number,
    public productId: number,
    public customerId: number,
    public rentMode: string,
    public units: number,
    public rentEndDate: Date,
    public rentStartDate: Date,
    public agreedToTermsAndConditions: boolean,
    public totalAmount: number
  ) {}
}
