export default class BaseEntity<T> {
  protected _id: T;

  public set id(v: T) {
    this._id = v;
  }

  /**
   *
   */
  constructor(id: T) {
    this.id = id;
  }
}
