import BaseEntity from "./base.model";

export default class AuditedEntity<T> extends BaseEntity<T> {
  private _createdAt: number;
  private _createdBy: string;
  private _updatedAt: number | null;

  public get createdAt(): number {
    return this._createdAt;
  }
  public get createdBy(): string {
    return this._createdBy;
  }
  public set createdBy(v: string) {
    this._createdBy = v;
  }

  public get updatedAt(): number | null {
    return this._updatedAt;
  }
  public set updatedAt(v: number | null) {
    this._updatedAt = v;
  }

  /**
   *
   */
  constructor(id: T) {
    super(id);
    this._createdAt = new Date().getTime();
  }
}
