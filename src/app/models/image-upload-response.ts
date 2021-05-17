export class ImageUploadResponse {
  constructor(
    public msg: string,
    public fileName: string,
    public fileDownloadUri: string,
    public fileType: string,
    public byteFile: string,
    public size: number
  ) {}
}
