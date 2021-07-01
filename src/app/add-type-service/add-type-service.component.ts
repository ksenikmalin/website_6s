import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RepairType } from '../shared/models/repair_type.model';
import { MainService } from '../shared/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-type-service',
  templateUrl: './add-type-service.component.html',
  styleUrls: ['./add-type-service.component.css']
})
export class AddTypeServiceComponent implements OnInit {

  repairTypeForm: FormGroup;

  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  success = false;

  repair_types: RepairType[] = [];

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.repairTypeForm = new FormGroup({
      namenovanie: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    });
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAddRepairType() {
    if (this.repairTypeForm.value.namenovanie == "" || this.repairTypeForm.value.description == "") {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      let repair_type = {
        namenovanie: this.repairTypeForm.value.namenovanie,
        description: this.repairTypeForm.value.description
      };
      console.log(repair_type);
      try {
        let result = await this.mainService.post(
          JSON.stringify(repair_type),
          "/repair_types"
        );
        this.router.navigate(["/list-specialization"]);
      } catch (err) {
        console.log(err);
      }
      this.repairTypeForm.reset();
      this.loading = false;
      this.success = true;
    }
  }

  // Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSuccess() {
    this.success = false;
    this.isEmpty = true;
  }

}
