import * as fs from 'fs';
import { StringEntity } from '../StringEntity';

export class BinarySerializer {
    static serialize(entities: StringEntity[], filename: string): void {
        const data = entities.map(entity => entity.toJSON());
        const buffer = Buffer.from(JSON.stringify(data), 'utf8');
        fs.writeFileSync(filename, buffer);
        console.log(`Binary serialization saved to file: ${filename}`);
    }

    static deserialize(filename: string): StringEntity[] {
        const buffer = fs.readFileSync(filename);
        const jsonData = JSON.parse(buffer.toString('utf8'));
        return jsonData.map((data: any) => StringEntity.fromJSON(data));
    }
}