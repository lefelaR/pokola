import AuditedEntity from "@common/entities/auditedEntity.model";
import { v4 as UUID } from "uuid";
export default class Feedback extends AuditedEntity<string>{

  
  phone_number : string = "";
  description : string = "";
  brand : string = "";
  manufacturer : string = "";
  modelname: string = "";
  os: string = "";
  version: string = "";
  app_version: string = "";

  constructor() {
    super(UUID());
  }

  mapEntity() {
    return {
      id: this._id,
      phone_number  :this.phone_number,
      descrition    : this.description,
      brand         : this.brand,
      manufacturer  : this.manufacturer,
      modelname     : this.modelname,
      os            : this.os,
      version       :  this.version,
      app_version   : this.app_version,
      createdAt     : this.createdAt,
      createdBy     : this.createdBy,
    };
  }
}
