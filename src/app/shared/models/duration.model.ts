// Модель класса Специализация (категории услуг)
export class Duration {
    public id_duration: number;
    public namenovanie: string;
    constructor(id_duration:number, namenovanie:string){
        this.id_duration=id_duration;
        this.namenovanie=namenovanie;
    }
}
