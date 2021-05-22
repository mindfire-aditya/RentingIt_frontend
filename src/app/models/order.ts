export class Order {
  constructor(
    public ownerId: number,
    public productId: number,
    public customerId: number,
    public rent_mode: string,
    public units: number,
    public start_datetime: Date,
    public end_datetime: Date,
    public terms_and_conditions: boolean,
    public total_amount: number
  ) {}
}
