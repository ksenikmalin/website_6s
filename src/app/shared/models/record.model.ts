// Модель класса Запись
export class Record {
    public id_record: number;
    public phone: string;
    public address: string;
    public square: string;
    public price: string;
    public id_user: string;
    public id_services: string;
        constructor(id_record:number, phone:string, address:string, square:string, price:string, id_user:string, id_services:string){
        this.id_record=id_record;
        this.phone=phone;
        this.address=address;
        this.square=square;
        this.price=price;
        this.id_user=id_user;
        this.id_services=id_services;
    }
}
