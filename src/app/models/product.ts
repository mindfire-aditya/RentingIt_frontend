export class Product {
  constructor(
    public id: number,
    public productName: string,
    public actualName: string,
    public maintainanceTime: string,
    public assetStatus: string,
    public assetDescription: string,
    public imageUrl: string,
    public units: number,
    public pricePerHour: number,
    public pricePerDay: number,
    public pricePerWeek: number,
    public pricePerMonth: number,
    public pinCode: number,
    public categoryId: number,
    public parentCategoryId: number,
    public ownerId: number
  ) {}
}
