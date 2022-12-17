import { Injectable } from '@nestjs/common';
import { Converter } from 'showdown'

/**
 * Ковертация файлов в html
 */
@Injectable()
export class ConverterService {
    private converter;

    constructor()
    {
        this.converter = new Converter({metadata: true})
    }

    convert(mdText: string)
    {
        return this.converter.makeHtml(mdText);
    }

    getMetaData()
    {
        return this.converter.getMetadata()
    }
}
