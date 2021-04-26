/**
 * @author Aditya Sahu
 */

export class UserDetail {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNo: number,
    public houseNo: number,
    public streetNo: number,
    public lane: string,
    public district: string,
    public state: string,
    public landmark: string,
    public city: string,
    public pincode: number,
    public idProofType: string,
    public idNumber: string
  ) {}
}
