import AuditedEntity from "@common/entities/auditedEntity.model";
import ISoftDelete from "@common/interfaces/ISoftDelete.interface";
import { v4 as UUID } from "uuid";
import Issue from "./issue.model";

export default class Snag extends AuditedEntity<string> implements ISoftDelete {
  userid: string = "";
  title: string = "";
  issues: Issue[] = [];
  deleted: boolean;
  deletedAt: number;

  constructor() {
    super(UUID());
  }

  mapEntity() {
    return {
      id: this._id,
      userid: this.userid,
      title: this.title,
      issues: this.issues.map((issue) => issue.mapEntity()),
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      deletedAt: this.deletedAt,
    };
  }
}
