export class UserDetail {
  constructor(
    public phone: number,
    public email: string,
    public house_number: string,
    public street: string,
    public lane: string,
    public landmark: string,
    public city: string,
    public state: string,
    public pincode: string,
    public id_proof_type: string,
    public id_number: string
  ) {}
}
