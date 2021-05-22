export class Category {
  constructor(
    public id: number,
    public parentCategory: string,
    public childCategory: string,
    public parentCategoryId: number,
    public image_url: string
  ) {}
}
