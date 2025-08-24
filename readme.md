# Проект Express.js API

Этот проект представляет собой RESTful API, разработанный с использованием **Express.js** и **Sequelize** для взаимодействия с базой данных **PostgreSQL**. API предоставляет базовые операции (CRUD) для управления пользователями.

## Содержание

* [Технологии](#технологии)
* [Структура проекта](#структура-проекта)
* [Настройка и запуск](#настройка-и-запуск)
* [Endpoints API](#endpoints-api)
* [Примеры запросов](#примеры-запросов)
* [Зависимости](#зависимости)

---

## Технологии

* **Node.js**
* **Express.js** — веб-фреймворк для Node.js
* **Sequelize** — ORM (Object-Relational Mapper) для работы с базой данных
* **PostgreSQL** — система управления базами данных
* **Bcrypt.js** — библиотека для хэширования паролей
* **Docker Compose** — для простой настройки базы данных
* **dotenv** — для управления переменными окружения

---

## Структура проекта

```
├── controllers/
│   └── usercontroller.js  # Логика обработки запросов пользователей
├── models/
│   └── usermodel.js       # Модель Sequelize для таблицы "users"
├── routes/
│   └── userrouter.js      # Определение маршрутов API
├── .env.example           # Пример файла с переменными окружения
├── app.js                 # Основной файл приложения (сервер)
├── db.js                  # Файл конфигурации и подключения к БД
├── package.json
├── docker-compose.yml     # Настройка Docker для PostgreSQL
└── README.md              # Этот файл
```

---

## Настройка и запуск

1. Клонируйте репозиторий:

   ```bash
   git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
   cd <имя_папки_проекта>
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Настройте переменные окружения. Создайте файл `.env` в корневой директории проекта на основе файла `.env.example`:

   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=12345
   DB_NAME=test_db
   DB_PORT=5432
   BCRYPT_SALT_ROUNDS=10
   ```

4. Запустите базу данных с помощью Docker Compose:

   ```bash
   docker-compose up -d
   ```

   Это запустит контейнер с PostgreSQL на порту `5432`.

5. Запустите сервер:

   ```bash
   node app.js
   ```

   Сервер будет работать на порту `4000`. Sequelize автоматически создаст таблицу `Users` на основе модели `usermodel.js`.

---

## Endpoints API

Базовый URL: `http://localhost:4000/userapi`

| Метод    | Endpoint          | Описание                           | Тело запроса                               |
| :------- | :---------------- | :--------------------------------- | :----------------------------------------- |
| `GET`    | `/getusers`       | Получить список всех пользователей | -                                          |
| `POST`   | `/createuser`     | Создать нового пользователя        | `{ "username": "...", "password": "..." }` |
| `PUT`    | `/updateuser/:id` | Обновить пользователя по ID        | `{ "username": "...", "password": "..." }` |
| `DELETE` | `/deleteuser/:id` | Удалить пользователя по ID         | -                                          |

---

## Примеры запросов

### 1. Создание пользователя

**POST** `/createuser`
**URL:** `http://localhost:4000/userapi/createuser`
**Заголовок:** `Content-Type: application/json`

```json
{
  "username": "testuser",
  "password": "strongpassword123"
}
```

### 2. Получение всех пользователей

**GET** `/getusers`
**URL:** `http://localhost:4000/userapi/getusers`

### 3. Обновление пользователя

**PUT** `/updateuser/:id`
**URL:** `http://localhost:4000/userapi/updateuser/1`
**Заголовок:** `Content-Type: application/json`

```json
{
  "username": "updateduser",
  "password": "new_strong_password"
}
```

### 4. Удаление пользователя

**DELETE** `/deleteuser/:id`
**URL:** `http://localhost:4000/userapi/deleteuser/1`

---

## Зависимости

Основные зависимости проекта, указанные в `package.json`:

* `express`
* `sequelize`
* `pg`
* `bcrypt`
* `dotenv`

---
