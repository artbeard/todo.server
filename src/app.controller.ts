import { Get, Controller, Render } from '@nestjs/common';
import { ConverterService } from "./converter.service";


@Controller()
export class AppController {

  //private converter: Converter;

  constructor(
      private converter: ConverterService
  ) {
    //this.converter = new Converter({metadata: true});
  }

  @Get()
  @Render('index')
  action_index() {
    return { message: 'Hello world!' };
  }

  @Get('/todo')
  @Render('index')
  action_hello() {

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
