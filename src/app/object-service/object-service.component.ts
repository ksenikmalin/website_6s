import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ObjectFlat  } from '../shared/models/object.model';

@Component({
  selector: 'app-object-service',
  templateUrl: './object-service.component.html',
  styleUrls: ['./object-service.component.css']
})
export class ObjectServiceComponent implements OnInit {

// Логическая переменная, определяющая наличие или отсутсвие прелоадера
loading = false;
// Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
isEmpty = true;
// Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
success = false;
objects: ObjectFlat[] = [];




  constructor(private mainService: MainService) { }
  async ngOnInit() {
    // Получение списка всех заявок на обратный звонок,  имеющихся в БД
    this.loading = true;
    try {
      let result = await this.mainService.get("/objects");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.objects.push(
            new ObjectFlat(
              result[one].id_object,
              result[one].namenovanie
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDeleteObject(id_object) {
    try {
      let result = await this.mainService.delete(`/objects/${id_object}`);
    } catch (error) {
      console.log(error);
    }
    let index = this.objects.findIndex((el) => {
      return el.id_object== id_object;
    });
    this.objects.splice(index, 1);
  }
}



