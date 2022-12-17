import {Controller, Render, Get} from '@nestjs/common';
import {ConverterService} from "./converter.service";
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
    action_index() {
        return new Promise(resolve => {
            this.appService.loadFile('about.md')
                .then(text => {
                    resolve(
                        this.build_response(text, [
                            {
                                title: 'Главная',
                                href: '/'
                            }
                        ])
                    );
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
                    resolve(
                        this.build_response(text, [
                            {
                                title: 'О проекте',
                                href: '/'
                            },
                            {
                                title: 'Отказ от обязательств',
                            }
                        ])
                    );
                });
        })
    }

    /**
     * Страница SPA приложения
     */
    @Get('/todo')
    @Render('page/todo-content')
    action_todo() {
        return {};
    }


    /**
     * Собирает данные в один объект для отдачи рендеру
     * @param text содержимое страницы
     * @param breadcrumbs масств хлебных крошек
     * @private
     */
    private build_response(text, breadcrumbs)
    {
        let content = this.converter.convert(text);
        const metaData = this.converter.getMetaData();
        let title = metaData.title;
        let pageHeader = metaData.header;
        return {
            content,
            title,
            pageHeader,
            breadcrumbs
        };
    }
}
