import * as fs from 'fs';
import { StringEntity } from '../StringEntity';

export class CustomSerializer {
    static serialize(entities: StringEntity[], filename: string): void {
        let customFormat = 'CUSTOM_FORMAT_V1\n';
        customFormat += `COUNT:${entities.length}\n`;
        
        entities.forEach((entity, index) => {
            customFormat += `ENTITY:${index}\n`;
            customFormat += `VALUE_LENGTH:${entity.value.length}\n`;
            customFormat += `VALUE:${entity.value}\n`;
            customFormat += `END_ENTITY\n`;
        });
        
        fs.writeFileSync(filename, customFormat, 'utf8');
        console.log(`Custom serialization saved to file: ${filename}`);
    }

    static deserialize(filename: string): StringEntity[] {
        const content = fs.readFileSync(filename, 'utf8');
        const lines = content.split('\n');
        const entities: StringEntity[] = [];
        
        let i = 0;
        while (i < lines.length) {
            if (lines[i].startsWith('ENTITY:')) {
                i++; 
                if (lines[i].startsWith('VALUE_LENGTH:')) {
                    i++;
                    if (lines[i].startsWith('VALUE:')) {
                        const value = lines[i].substring(6);
                        entities.push(new StringEntity(value));
                    }
                }
            }
            i++;
        }
        
        return entities;
    }
}