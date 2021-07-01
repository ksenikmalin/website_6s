import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';
import { Service } from '../shared/models/service.model';
import { environment } from '../../environments/environment';
import { RepairType } from '../shared/models/repair_type.model';
import { ObjectFlat } from '../shared/models/object.model';
import { Duration } from '../shared/models/duration.model';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  srcPhoto = environment.baseUrl + '/api/photo/';
  @Output() del = new EventEmitter<number>();
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Лoгическая переменная, определяющая режим чтения или редактирования включен
  editOrNot = true;

  repair_types: RepairType[] = [];
  id_repair_type;


  objects: ObjectFlat[] = [];
id_object;

  durations: Duration[] = [];
id_duration;

  res;
  heart = false;
  hide3 = true;
  hide2 = true;
  hide1 = true;
  hasOrNot = "в наличии";
  formService: FormGroup;
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
      this.item.id = +param.id_service;
    });
  }

  async ngOnInit() {
    this.loading = true;
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
    this.loading = false;

    try {
      let result = await this.mainService.get("/durations");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.durations.push(
            new Duration(
              result[one].id_duration,
              result[one].namenovanie
            )
          );
        }
        this.id_duration= result[0].id_duration;
      }
    } catch (error) {
      console.log(error);
    }


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
        this.id_repair_type = result[0].id_repair_type;
      }
    } catch (error) {
      console.log(error);
    }

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
        this.id_object = result[0].id_object;
      }
    } catch (error) {
      console.log(error);
    }


    if (this.service.id_service != "") {
      // Инициализация FormGroup, создание FormControl, и назанчение Validators
      this.formService = new FormGroup({
        'namenovanie': new FormControl(`${this.service.naim_ser}`, [Validators.required]),
        'price': new FormControl(`${this.service.price}`, [Validators.required]),
        'id_object': new FormControl(`${this.service.id_object}`, [Validators.required]),
        'id_duration': new FormControl(`${this.service.id_duration}`, [Validators.required]),
        'id_repair_type': new FormControl(`${this.service.id_repair_type}`, [Validators.required]),
      });
    }
  }

  // Хук жизненного цикла по изменению
  // Проверяет наличие в LocalStorage элемента роли, чтобы понять авторизирован пользователь или нет
  ngDoCheck() {
    this.hide1 = true;
    this.hide2 = true;
    this.hide3 = true;
    if (localStorage.getItem("role") == "1") {
      this.hide1 = false;
      this.hide2 = false;
      this.hide3 = false;
    }
    if (localStorage.getItem("role") == "2") {
      this.hide1 = true;
      this.hide2 = false;
      this.hide3 = false;
    }
    if (localStorage.getItem("role") == "3") {
      this.hide1 = true;
      this.hide2 = true;
      this.hide3 = false;
    }
  }

  // Отправляет запрос удаления карточки на сервер
  async onDeleteService() {
    try {
      let result = await this.mainService.delete(`/deleteService/${this.item.id}`);
    } catch (error) {
      console.log(error);
    }
    this.del.emit(this.service.id);
    this.router.navigate(["/catalog"]);
  }
  // Оправляет запрос изменения информации в карточки на сервер или включает режим редактирования
  async onChangeService() {
    if (!this.editOrNot) {
      let newService = new Service(
        this.item.id,
        this.formService.value.namenovanie,
        this.formService.value.price,
        this.formService.value.id_object,
        this.formService.value.id_duration,
        this.formService.value.id_repair_type,
        this.service.filename,
      );

      console.log(this.formService.value.id_object);
      console.log(this.item.id);

      try {
        let res = await this.mainService.put(
          JSON.stringify(newService),
          `/services/${this.item.id}`
        );
      } catch (error) {
        console.log(error);
      }
      this.service.namenovanie = this.formService.value.namenovanie;
      this.service.price = this.formService.value.price;
      this.service.id_object = this.formService.value.id_object;
      this.service.id_duration = this.formService.value.id_duration;
      this.service.id_repair_type = this.formService.value.id_repair_type;
    }
    this.editOrNot = !this.editOrNot;
  }
}

