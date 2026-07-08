# Echo Chat

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?logo=inertia\&logoColor=white)
![Laravel Reverb](https://img.shields.io/badge/Laravel-Reverb-F9322C)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)

A modern real-time chat application built with **Laravel**, **Laravel Reverb**, **React**, **Inertia.js**, and **PostgreSQL**. Echo Chat delivers a fast and responsive messaging experience powered by WebSockets while featuring a **Neo Brutalism** user interface.

---

## Features

* Real-time messaging powered by Laravel Reverb
* Secure user authentication
* Real-time conversation updates
* Read receipts
* Real-time notifications
* Contact management
* Responsive layout
* Neo Brutalism user interface
* PostgreSQL database

---

## Tech Stack

### Backend

* Laravel
* Laravel Reverb
* PostgreSQL

### Frontend

* React
* Inertia.js
* Vite

---

## Installation

### Clone the repository

```bash
git clone https://github.com/username/echo-chat.git
cd echo-chat
```

### Install dependencies

```bash
composer install
npm install
```

### Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit your `.env` file.

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=echo_chat
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### Run database migration

```bash
php artisan migrate
```

### Start the development server

Terminal 1

```bash
php artisan serve
```

Terminal 2

```bash
npm run dev
```

Terminal 3

```bash
php artisan reverb:start
```

---

## Screenshots

> Screenshots will be added soon.

<!--
![Login](screenshots/login.png)

![Chat](screenshots/chat.png)

![Conversation](screenshots/conversation.png)
-->

---

## License

This project is licensed under the MIT License.
