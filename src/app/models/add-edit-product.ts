export class AddEditProduct {
  constructor(
    public name: string,
    public description: string,
    public units: number,
    public price_per_hour: number,
    public price_per_day: number,
    public price_per_week: number,
    public price_per_month: number,
    public house_no: string,
    public street: string,
    public lane: string,
    public landmark: string,
    public city_town: string,
    public pincode: number
  ) {}
}
