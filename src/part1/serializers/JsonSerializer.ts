import * as fs from 'fs';
import { StringEntity } from '../StringEntity';

export class JsonSerializer {
    static serialize(entities: StringEntity[], filename: string): void {
        const data = entities.map(entity => entity.toJSON());
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
        console.log(`JSON серіалізацію збережено у файл: ${filename}`);
    }

    static deserialize(filename: string): StringEntity[] {
        const jsonContent = fs.readFileSync(filename, 'utf8');
        const data = JSON.parse(jsonContent);
        return data.map((item: any) => StringEntity.fromJSON(item));
    }
}