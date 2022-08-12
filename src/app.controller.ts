// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  action_index() {
    return { message: 'Hello world!' };
  }

  @Get('/hello')
  @Render('index')
  action_hello() {
    return { message: 'This is Hello action' };
  }
}
