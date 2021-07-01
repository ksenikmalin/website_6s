import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { RepairType } from '../shared/models/repair_type.model';

@Component({
  selector: 'app-type-service',
  templateUrl: './type-service.component.html',
  styleUrls: ['./type-service.component.css']
})
export class TypeServiceComponent implements OnInit {

  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  success = false;
  repair_types: RepairType[] = [];


  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех заявок на обратный звонок,  имеющихся в БД
    this.loading = true;
    try {
      let result = await this.mainService.get("/repair_types");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.repair_types.push(
            new RepairType(
              result[one].id_repair_type,
              result[one].namenovanie,
              result[one].description
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDeleteRepairType(id_repair_type) {
    try {
      let result = await this.mainService.delete(`/repair_types/${id_repair_type}`);
    } catch (error) {
      console.log(error);
    }
    let index = this.repair_types.findIndex((el) => {
      return el.id_repair_type== id_repair_type;
    });
    this.repair_types.splice(index, 1);
  }
}
