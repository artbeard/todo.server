import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

const fs = require('fs/promises');
const path = require('node:path');

/**
 * Загрузка статичесикх файлов
 */
@Injectable()
export class AppService
{

    constructor(){}

    loadFile(fileName: string): Promise<string>
    {
        let filePath = path.resolve(__dirname, '..', 'static-pages', fileName);
        return fs.readFile(filePath, 'utf8')
            .then((text: string)=>{
                return Promise.resolve(text)
            })
            .catch(err => {
                throw new HttpException('Не удалось найти запрашиваемый материал', HttpStatus.NOT_FOUND);
            })
    }

}
