// Модель класса Специализация (категории услуг)
export class RepairType {
    public id_repair_type: number;
    public namenovanie: string;
    public description: string;
    constructor(id_repair_type:number, namenovanie:string, description:string){
        this.id_repair_type=id_repair_type;
        this.namenovanie=namenovanie;
        this.description=description;
    }
}
