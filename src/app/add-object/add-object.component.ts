import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ObjectFlat } from '../shared/models/object.model';
import { MainService } from '../shared/services/main.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {

  ObjectForm: FormGroup;

  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  success = false;

  objects: ObjectFlat[] = [];


  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.ObjectForm = new FormGroup({
      namenovanie: new FormControl("", [Validators.required])
    });
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAddObject() {
    if (this.ObjectForm.value.namenovanie == ""  ) {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      let object = {
        namenovanie: this.ObjectForm.value.namenovanie
      };
      console.log(object);
      try {
        let result = await this.mainService.post(
          JSON.stringify(object),
          "/object"
        );
        this.router.navigate(["/list-objects"]);
      } catch (err) {
        console.log(err);
      }
      this.ObjectForm.reset();
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
