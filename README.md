## NestJS-Template

<p>NestJS-Template is a quick way to get started with your NestJS project.</p>
<p>매번 NestJS 프로젝트를 시작할 때 마다 환경변수, 데이터베이스, 로깅, Swagger 등 다양한 초기 설정 작업을 하게됩니다. 어려운 작업은 아니지만 매번 반복되는 시간이 아까워서 관련 설정들을 모두 처리한 template를 만들었습니다.</p>

## 1. Features

- using yarn berry
- using typeorm
  - using mysql
  - you can use immediately TypeORM CLI (migration, seed, ...)
- using swagger documentation
- using docker and docker-compose
- using winston logger
- simple built-in CRUD API (with 🐱)
- simple auth flow (login, logout, ...)

## 2. Prerequisites

- Yarn Berry
- NestJS
- TypeORM
- Docker
- MySQL

## 3. Getting started

### 3.1 you can run project with docker

With docker compose, it's as simple as a single command to get your project up and running.
if you don't know about docker or docker compose. Please read [this](https://docker-curriculum.com/).

```shell
  docker compose up --build -d
```

### 3.2 you can run project manually

1. <p>you should install mysql 8.0</p>
   unless you install mysql, Please read [this](https://dev.mysql.com/doc/mysql-installer/en/)

2. you should run start command

```shell
  yarn run start:dev
```
