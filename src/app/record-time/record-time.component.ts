import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-record-time',
  templateUrl: './record-time.component.html',
  styleUrls: ['./record-time.component.css']
})
export class RecordTimeComponent implements OnInit {

  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении заявки на обратный звонок
  succes=false;

  name_time = 9;

  record = {
    phone: null,
    address: null,
    square: null,
    price: null,
    date: null,
    id_user: null,
    id_services: null
  };

  service: any = {
    id_service: null,
    name: null,
    name_specialization: null,
    description: null,
    price: null,
    filename: null
  };

  recordFrom: FormGroup;

  master: any = {
    id_master: null,
    fio: null,
    name_specializaion: null,
    start_schedule: null,
    end_schedule: null,
    id_specialization: null,
    hour: null
  };

  res;
  convertedDate;

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private mainService: MainService
  ) {
    this.activateRouter.queryParams.subscribe((queryParams) => {
      this.record.phone = +queryParams.phone;
      this.record.address = +queryParams.address;
      this.record.square = +queryParams.square;
      this.record.price = queryParams.price;
      this.record.id_user = +queryParams.id_user;
      this.record.id_services = queryParams.id_services;


    });
    console.log(this.record);

    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.recordFrom = new FormGroup({
      phone: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      square: new FormControl("", [Validators.required])
    });
  }

  async ngOnInit() {
    // Отправка на сервер запроса для получения карточки товара по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(this.record),
        "/oneMaster"
      );
    } catch (error) {
      console.log(error);
    }
    this.master = this.res[0];
    console.log(this.master);

    // Отправка на сервер запроса для получения карточки товара по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(this.record),
        "/oneServiceRecord"
      );
    } catch (error) {
      console.log(error);
    }
    this.service = this.res[0];
    console.log(this.service);
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAddRecord() {
    if (this.recordFrom.value.phone == "", this.recordFrom.value.address == "", this.recordFrom.value.price == "", this.recordFrom.value.id_user == "",  this.recordFrom.value.id_services == "") {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      this.record.phone = this.recordFrom.value.phone;
      this.record.address = this.recordFrom.value.address;
      this.record.square = this.recordFrom.value.square;
      this.record.price = this.recordFrom.value.price;
      this.record.id_user = this.recordFrom.value.id_user;
      this.record.id_services = this.recordFrom.value.id_services;

      console.log(this.record);
      try {
        let result = await this.mainService.post(
          JSON.stringify(this.record),
          "/record"
        );
      } catch (err) {
        console.log(err);
      }
      this.recordFrom.reset();
      this.succes = true;
      this.router.navigate(["profile"]);
    }
  }

  // Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSucces(){
    this.succes=false;
    this.isEmpty=true;
  }

}
