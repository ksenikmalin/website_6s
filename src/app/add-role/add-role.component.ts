import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../shared/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent implements OnInit {
  form: FormGroup;
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  succes = false;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      surname: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      patronymic: new FormControl("", [Validators.required]),
      number_phone: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl(""),
    });
  }
  public mask = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAdd() {
    if (
      this.form.value.surname == "" ||
      this.form.value.name == "" ||
      this.form.value.patronymic == "" ||
      this.form.value.number_phone == "" ||
      this.form.value.login == "" ||
      this.form.value.password == "" ||
      this.form.value.role == ""
    ) {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      let user = {
        surname: this.form.value.surname,
        name: this.form.value.name,
        patronymic: this.form.value.patronymic,
        number_phone: this.form.value.number_phone,
        role: this.form.value.role,
        login: this.form.value.login,
        password: this.form.value.password,
      };
      console.log(user);
      try {
        let result = await this.mainService.post(
          JSON.stringify(user),
          "/users"
        );
        this.router.navigate(["/list-user"]);
      } catch (err) {
        console.log(err);
      }
      this.form.reset();
      this.loading = false;
      this.succes = true;
    }
  }




  // Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSucces() {
    this.succes = false;
    this.isEmpty = true;
  }

  onBack(){
    this.router.navigate(["/list-user"]);
  }
}
