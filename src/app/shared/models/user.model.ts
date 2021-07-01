// Модель класса Пользователь
export class User {
  public id: number;
  public surname: string;
  public name: string;
  public patronymic: string;
  public number_phone: string;
  public login: string;
  public password: string;
  public role: string;

  constructor(
    id: number,
    surname: string,
    name: string,
    patronymic: string,
    number_phone: string,
    login: string,
    password: string,
    role: string,

  ) {
    this.id = id;
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.number_phone = number_phone;
    this.login = login;
    this.password = password;
    this.role = role;

  }
}


