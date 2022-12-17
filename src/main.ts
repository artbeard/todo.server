// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import * as hbs from 'hbs';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { HttpExceptionFilter } from './http-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useGlobalFilters( new HttpExceptionFilter() );

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  //hbs.layoutsDir(join(__dirname, '..', 'views/layouts'));
  hbs.registerPartials(join(__dirname, '..', 'views', 'layouts'));
  hbs.registerPartials(join(__dirname, '..', 'views', 'page'));
  //hbs.defaultLayout = 'Name of the layout file',1

  app.use(cookieParser());
  
  await app.listen(3000);
}
bootstrap();