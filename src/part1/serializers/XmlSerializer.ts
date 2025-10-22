import * as fs from 'fs';
import { StringEntity } from '../StringEntity';

export class XmlSerializer {
    static serialize(entities: StringEntity[], filename: string): void {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<StringEntities>\n';
        
        entities.forEach((entity, index) => {
            xml += `<StringEntity id="${index}">\n`;
            xml += `<value><![CDATA[${entity.value}]]></value>\n`;
            xml += `<length>${entity.length}</length>\n`;
            xml += `</StringEntity>\n`;
        });
        
        xml += '</StringEntities>';
        
        fs.writeFileSync(filename, xml, 'utf8');
        console.log(`XML serialization saved to file: ${filename}`);
    }

    static deserialize(filename: string): StringEntity[] {
        const xmlContent = fs.readFileSync(filename, 'utf8');
        const entities: StringEntity[] = [];
        
        const valueMatches = xmlContent.match(/<value><!\[CDATA\[(.*?)\]\]><\/value>/g);
        
        if (valueMatches) {
            valueMatches.forEach(match => {
                const value = match.replace(/<value><!\[CDATA\[/, '').replace(/\]\]><\/value>/, '');
                entities.push(new StringEntity(value));
            });
        }
        
        return entities;
    }
}