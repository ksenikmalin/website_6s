import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"],
})
export class ListUserComponent implements OnInit {
  loading = false;
  id;
  users: User[] = [];
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех cотрудников,  имеющихся в БД
    this.loading = true;
    this.id = localStorage.getItem("id");
    try {
      let result = await this.mainService.get("/users");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          let name = result[one].name;
          if (localStorage.getItem("id") == result[one].id) {
            name = `${result[one].name} (Вы)`;
          }
          let role = result[one].role == "1" ? "Администратор" : "Менеджер";
          this.users.push(
            new User(
              result[one].id,
              result[one].surname,
              result[one].name,
              result[one].patronymic,
              result[one].number_phone,
              result[one].login,
              result[one].password,
              role,
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDelete(id) {
    try {
      let result = await this.mainService.delete(`/user/${id}`);
    } catch (error) {
      console.log(error);
    }
    let index = this.users.findIndex((el) => {
      return el.id == id;
    });
    this.users.splice(index, 1);
  }
}
