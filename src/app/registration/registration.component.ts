import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../shared/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле
  existLogin = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  form: FormGroup;
  user = {
    id: "",
    surname: "",
    name: "",
    patronymic: "",
    number_phone: "",
    login: "",
    password: "",
    role: ""
  };

  constructor(private api: MainService, private router: Router) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      surname: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      patronymic: new FormControl("", [Validators.required]),
      number_phone: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  public mask = ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  // Функция входа, отправляющая данные, полученные с формы на сервер, и реагирующая на ответ с сервера
  async onRegistr() {
    localStorage.clear();
    if (this.form.value.login == "" || this.form.value.surname == "" || this.form.value.name == "" || this.form.value.patronymic == "" || this.form.value.number_phone == "" || this.form.value.password == "") {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      let infoAboutUser;
      infoAboutUser = {
        login: this.form.value.login,
        password: this.form.value.password,
        surname: this.form.value.surname,
        name: this.form.value.name,
        patronymic: this.form.value.patronymic,
        number_phone: this.form.value.number_phone,
        role: "3"
      };
      console.log(infoAboutUser);
      try {
        let ExistOrNot = await this.api.post(JSON.stringify(infoAboutUser), "/registration");
        this.form.reset();
        if (ExistOrNot != "exist") {
          console.log(ExistOrNot);
          this.user.id = ExistOrNot[0].id;
          this.user.login = ExistOrNot[0].login;
          this.user.password = ExistOrNot[0].password;
          this.user.surname = ExistOrNot[0].surname;
          this.user.name = ExistOrNot[0].name;
          this.user.patronymic = ExistOrNot[0].patronymic;
          this.user.number_phone = ExistOrNot[0].number_phone;
          this.user.role = ExistOrNot[0].role;

          console.log(this.user);
          localStorage.setItem("role", this.user.role);
          localStorage.setItem("id", this.user.id);
          localStorage.setItem('surname', this.user.surname);
          localStorage.setItem('name', this.user.name);
          localStorage.setItem('patronymic', this.user.patronymic);
          localStorage.setItem('number_phone', this.user.number_phone);

          this.router.navigate(["/profile"]);
        } else {
          this.existLogin = false;
          console.log("Логин уже существует");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Функция, убирает сообщения о неправильном логине или пароле и о незаполненных полях
  onFlag() {
    this.existLogin = true;
    this.isEmpty = true;
  }
}
