import AuditedEntity from "@common/entities/auditedEntity.model";
import { v4 as UUID } from "uuid";
import Image from "./image.model";

export default class Issue extends AuditedEntity<string> {
  title: string = "";
  longDescription: string ="";
  images: Image[] = [];

  constructor() {
    super(UUID());
  }

  mapEntity() {
    return {
      id: this._id,
      title: this.title,
      longDescription: this.longDescription,
      images: this.images.map((image) => image.mapEntity()),
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    };
  }
}
