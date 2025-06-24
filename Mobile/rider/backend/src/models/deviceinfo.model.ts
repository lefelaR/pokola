
export default class Deviceinfo  {
 
    brand : string = "";
    manufacturer : string = "";
    modelname: string="";
    os : string = "";
    
 
  mapEntity() {
    return {
      brand: this.brand,
      manufacturer: this.manufacturer,
      modelname: this.modelname,
      os:this.os
    };
  }
}
