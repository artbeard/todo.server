import {Get, Controller, Render, HttpException, HttpStatus} from '@nestjs/common';
import { ConverterService } from "./converter.service";
// import fs from 'fs/promises'
// import {existsSync} from "fs";
const fs = require('fs/promises');
const path = require('node:path');

@Controller()
export class AppController {

  constructor(
      private converter: ConverterService
  ) {}

  /**
   * Индексная страница О проекте
   */
  @Get()
  @Render('index')
  action_index() {
    let path1 = path.resolve(__dirname, '../static-pages/about.md');
    return new Promise(resolve => {
      fs.readFile(path1, 'utf8')
          .then(data => {
            let result =  {
              message: this.converter.convert(data),
              title: this.converter.getMetaData(),
            };
            console.log(result);

            resolve(result);

          })
          .catch(err => {
            console.log(err);
            throw new HttpException('Не удалось найти запрашиваемый материал', HttpStatus.NOT_FOUND);
          })
    })


    // return {
    //   title: 'Отказ от ответственности',
    //   message: 'Hello world!'
    // };
  }

  /**
   * Страница - отказ от обязательств
   */
  @Get('/disclaimer')
  @Render('index')
  action_disclaimer() {
    return {
      title: 'Отказ от ответственности',
      message: 'Hello world!'
    };
  }

  /**
   * Страница SPA приложения
   */
  @Get('/todo')
  @Render('index')
  action_todo() {

    let content = `---
Title:    A Sample MultiMarkdown Document
---
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

\`\`\`bash
$ npm install
\`\`\`

## Running the app

\`\`\`bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
\`\`\`

## Test

\`\`\`bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
\`\`\`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

    `;
    let message = this.converter.convert(content);
    console.log(
        this.converter.getMetaData()
    )
    return { message: message };
  }
}
