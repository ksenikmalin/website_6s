import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RepairType } from '../shared/models/repair_type.model';
import { ObjectFlat } from '../shared/models/object.model';
import { Duration } from '../shared/models/duration.model';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  filename="";
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    uploadAPI:  {
      url: environment.baseUrl + "/upload-photo",
    },
    replaceTexts: {
      selectFileBtn: 'Выберите файл',
      resetBtn: 'Удалить',
      uploadBtn: 'Загрузить',
      attachPinBtn: 'Прикрепите файл',
      afterUploadMsg_success: 'Успешно загружено!',
      afterUploadMsg_error: 'Загрузка прервана!'
    }
};
  form: FormGroup;
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading=false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty=true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  succes=false;
  repair_types: RepairType[] = [];
  id_repair_type;


  objects: ObjectFlat[] = [];
id_object;

  durations: Duration[] = [];
id_duration;

  constructor(private mainService: MainService, private router: Router) { }

  async ngOnInit() {
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
    this.loading = false;
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      'namenovanie': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'id_object': new FormControl('', [Validators.required]),
      'id_duration': new FormControl('', [Validators.required]),
      'id_repair_type': new FormControl('', [Validators.required]),


      // 'photo': new FormControl('', [Validators.required]),
      })
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAddService(){
    if ((this.form.value.name=="")||(this.form.value.	id_service=="")||(this.form.value.namenovanie=="")||(this.form.value.price=="")|| (this.form.value.id_object=="")|| (this.form.value.id_duration=="")|| (this.form.value.id_repair_type=="")|| (this.filename=="")) {
      this.isEmpty=false;
    } else {
      this.loading=true;
      this.isEmpty=true;
      let service = {
      namenovanie: this.form.value.namenovanie,
      price: this.form.value.price,
      id_object: this.form.value.id_object,
      id_duration: this.form.value.id_duration,
      id_repair_type: this.form.value.id_repair_type,
      filename: this.filename,
      }
      console.log(service);
      this.filename = "";
      try {
        let result = await this.mainService.post(JSON.stringify(service), "/addService");
        this.router.navigate(["/catalog"]);
      } catch (err) {
        console.log(err);
      }
      this.form.reset();
      this.loading=false;
      this.succes=true;
    }
  }
// Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSucces(){
    this.succes=false;
    this.isEmpty=true;
  }

  // Функция, возвращение имени загруженного файла
  fileUpload(event){
    console.log(JSON.parse(event.response).filename);
    this.filename = JSON.parse(event.response).filename;
  }
}
