import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Master } from '../shared/models/master.model';
import { Time } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-record-master',
  templateUrl: './record-master.component.html',
  styleUrls: ['./record-master.component.css']
})
export class RecordMasterComponent implements OnInit {

  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении заявки на обратный звонок
  succes=false;
  recordFrom: FormGroup;

  masters: Master[] = [];
  times: Time[] = [];
  record = {
    id_record: "",
    phone: "",
    address: "",
    square: "",
    price: "",
    id_user: "",
    id_services: ""
  };

  price = 0;
  item = {
    id: 0,
  };

  service: any = {
    id_service: "",
    namenovanie: "",
    price: "",
    id_object: "",
    id_duration: "",
    id_repair_type: "",
    filename: "",

  };

  res;
  name_master;
  name_time;

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private mainService: MainService
  ) {
    this.activateRouter.params.subscribe((param) => {
      this.item.id = +param.id_service;
    });

    // Инициализация recordFromGroup, создание recordFromControl, и назанчение Validators

  }

  async ngOnInit() {
    this.recordFrom = new FormGroup({
      phone: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      square: new FormControl("", [Validators.required]),
      });

    // Отправка на сервер запроса для получения карточки товара по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(this.item),
        "/oneService"
      );
    } catch (error) {
      console.log(error);
    }
    this.service = this.res[0];
    console.log(this.service);
  }
    async onRecord (){
    if (this.recordFrom.value.login == "" || this.recordFrom.value.surname == "" || this.recordFrom.value.name == "" || this.recordFrom.value.patronymic == "" || this.recordFrom.value.number_phone == "" || this.recordFrom.value.password == "") {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      let infoAboutUser;
      infoAboutUser = {
        phone: this.recordFrom.value.phone,
        address: this.recordFrom.value.address,
        square: this.recordFrom.value.square,
        price: this.price,
        id_user: +localStorage.getItem('id'),
        id_services: this.item.id


      };
      console.log(infoAboutUser);
      try {
        let ExistOrNot = await this.mainService.post(JSON.stringify(infoAboutUser), "/record");
        this.recordFrom.reset();
        if (ExistOrNot != "exist") {
          console.log(ExistOrNot);
          this.record.id_record = ExistOrNot[0].id_record;
          this.record.phone = ExistOrNot[0].phone;
          this.record.address = ExistOrNot[0].address;
          this.record.square = ExistOrNot[0].square;
          this.record.price = ExistOrNot[0].price;
          this.record.id_user = ExistOrNot[0].id_user;
          this.record.id_services = ExistOrNot[0].id_services;

          console.log(this.record);
          this.router.navigate(["/profile"]);
        } else {

          console.log("Логин уже существует");
        }
      } catch (error) {
        console.log(error);
      }
    }
 }

  public mask = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];


  // Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSuccess() {
    this.succes = false;
    this.isEmpty = true;
  }

  Total() {
    this.price = parseInt(this.service.price) * this.recordFrom.value.square;
    return this.price;
  }


}
