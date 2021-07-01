// Модель класса Специализация (категории услуг)
export class ObjectFlat {
    public id_object: number;
    public namenovanie: string;
    constructor(id_object:number, namenovanie:string){
        this.id_object=id_object;
        this.namenovanie=namenovanie;
    }
}
