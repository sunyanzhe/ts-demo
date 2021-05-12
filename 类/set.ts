class Name {
  private MaxLength: number = 100;
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(name: string) {
    if (name && name.length > this.MaxLength) {
      throw new Error('fullName has a max length of ' + this.MaxLength)
    }
    this._fullName = name
  }
}