// Модель класса Услуга
export class Service {
    public id_service: number;
    public namenovanie: string;
    public price: string;
    public id_object: string;
    public id_duration: string;
    public id_repair_type: string;
    public filename: string;
    constructor(id_service:number, namenovanie:string, price:string, id_object: string, id_duration:string, id_repair_type:string, filename: string){
        this.id_service=id_service;
        this.namenovanie=namenovanie;
        this.price=price;
        this.id_object=id_object;
        this.id_duration=id_duration;
        this.id_repair_type=id_repair_type;
        this.filename=filename;
    }
}
