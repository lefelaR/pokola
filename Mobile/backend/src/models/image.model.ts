import AuditedEntity from "@common/entities/auditedEntity.model";
import { v4 as UUID } from "uuid";

class Coordinates {
  longitude: number = 0;
  latitude: number = 0;
}

export default class Image extends AuditedEntity<string> {
  caption: string = "";
  description: string = "";
  url: string = "";
  path: string = "";
  coordinates: Coordinates = new Coordinates();

  constructor() {
    super(UUID());
  }

  mapEntity() {
    return {
      id: this._id,
      caption: this.caption,
      description: this.description,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      coordinates: this.coordinates,
      url: this.url,
      path: this.path,
    };
  }
}
