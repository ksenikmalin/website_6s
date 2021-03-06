import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {
  @Output() delete = new EventEmitter<number>();
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  res;
  hideClient = true;
  hideOperator = true;


  user: any = {
    id: "",
    surname: "",
    name: "",
    patronymic: "",
    number_phone: "",
    login: "",
    password: "",
    role: ""
  };

  record: any = {
    phone: null,
    address: null,
    square: null,
    price: null,
    date: null,
    id_user: null,
    id_services: null
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



  item = {
    id: 0,
  };
  // Получение параметра роута id
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private mainService: MainService
  ) {
    this.activateRouter.params.subscribe((param) => {
      this.item.id = +param.id_record;
      console.log(this.item.id);

    });
  }

  async ngOnInit() {
    this.loading = true;
    // Отправка на сервер запроса для получения карточки записи по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(this.item),
        "/oneRecord"
      );

    } catch (error) {
      console.log(error);
    }
    this.record = this.res[0];
    console.log(this.record);

    // Отправка на сервер запроса для получения карточки услуги по id
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
    // Отправка на сервер запроса для получения информации о клиенте по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(this.record),
        "/oneUser"
      );

    } catch (error) {
      console.log(error);
    }
    this.user = this.res[0];
    console.log(this.user);
    this.loading = false;
  }

  // Отправляет запрос удаления карточки на сервер
  async onDeleteService() {
    try {
      let result = await this.mainService.delete(`/deleteRecord/${this.record.id_record}`);
    } catch (error) {
      console.log(this.record.id_record);
      console.log(error);
    }
    this.delete.emit(this.record.id_record);
    this.router.navigate(["/profile"]);
  }

    // Проверяет наличие в LocalStorage элемента роли, чтобы понять авторизирован пользователь или нет
    ngDoCheck() {
      this.hideClient = true;
      this.hideOperator = true;
      if (localStorage.getItem("role") == "3") {
        this.hideClient = false;
      } else if(localStorage.getItem("role") == "1" || localStorage.getItem("role") == "2"){
        this.hideOperator = false;
      }
    }
}
