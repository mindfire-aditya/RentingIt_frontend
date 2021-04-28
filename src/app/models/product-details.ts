export class ProductDetails {

    constructor(
        public productName:string,
        public actualName:string,
        public maintainanceTime:string,
        public assetStatus:string,
        public imageUrl:string,
        public units:number,
        public pricePerHour:number,
        public pricePerDay:number,
        public pricePerWeek:number,
        public pricePerMonth:number,
        public pincode:number,
        public categoryId:number,
        public ownerId:number){}
}
