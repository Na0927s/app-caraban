export class User {
  constructor(
    public id: string,
    public name: string,
    public contact: string,
    public role: 'host' | 'guest',
    public idVerified: boolean,
    public trustScore: number,
    public balance: number
  ) {}
}
