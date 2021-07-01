// Модель класса Обратный звонок
export class Request {
    public id_request: number;
    public name: string;
    public phone: string;
    public status: string;

    constructor(id_request:number, name:string, phone:string, status:string){
        this.id_request=id_request;
        this.name=name;
        this.phone=phone;
        this.status=status;
    }
}
