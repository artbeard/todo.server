import {Controller, Render, HttpException, HttpStatus, Get, Res} from '@nestjs/common';
import {ConverterService} from "./converter.service";
import {Response} from 'express';
import {AppService} from './app.service';


const fs = require('fs/promises');
const path = require('node:path');

@Controller()
export class AppController {

    constructor(
        private converter: ConverterService,
        private appService: AppService
    ) {
    }

    /**
     * Индексная страница О проекте
     */
    @Get()
    @Render('page/page-content')
    action_index(@Res() response: Response) {
        return new Promise(resolve => {
            this.appService.loadFile('about.md')
                .then(text => {
                    const result = {
                        content: this.converter.convert(text),
                        title: (this.converter.getMetaData()).title,
                        breadcrumbs: [
                            {
                                title: 'Главная',
                                href: '/'
                            }
                        ]
                    };
                    resolve(result);
                });
        })
    }

    /**
     * Страница - отказ от обязательств
     */
    @Get('/disclaimer')
    @Render('page/page-content')
    action_disclaimer() {
        return new Promise(resolve => {
            this.appService.loadFile('disclaimer.md')
                .then(text => {
                    const result = {
                        content: this.converter.convert(text),
                        title: (this.converter.getMetaData()).title,
                        breadcrumbs: [
                            {
                                title: 'О проекте',
                                href: '/'
                            },
                            {
                                title: 'Отказ от обязательств',
                            }
                        ]
                    };
                    resolve(result);
                });
        })
    }

    /**
     * Страница SPA приложения
     */
    @Get('/todo')
    @Render('page/todo-content')
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
        // console.log(
        //     this.converter.getMetaData()
        // )
        return {message: message};
    }
}
