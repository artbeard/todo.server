import { Injectable } from '@nestjs/common';
import { Converter } from 'showdown'

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
