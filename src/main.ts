import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './http-exception.filter'
import {join} from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    //app.useStaticAssets(join(__dirname, '..', 'public')); //для отдачи статикик
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    hbs.registerPartials(join(__dirname, '..', 'views', 'layouts'));
    hbs.registerPartials(join(__dirname, '..', 'views', 'page'));

    app.use(cookieParser());

    await app.listen(3000);
}

bootstrap();