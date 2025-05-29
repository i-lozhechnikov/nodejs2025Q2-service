export class User {
  public id: string;

  public login: string;

  public password: string;

  public version: number = 1;

  public createdAt: number;

  public updatedAt: number;

  public setUpdatedAt(): void {
    this.updatedAt = Date.now();
  }
}
