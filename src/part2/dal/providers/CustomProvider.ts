import * as fs from 'fs/promises';
import { DataProvider } from './DataProvider';

export class CustomProvider<T> extends DataProvider<T> {
    private fromJsonMethod: (data: any) => T;
    private entityName: string;

    constructor(fromJsonMethod: (data: any) => T, entityName: string) {
        super();
        this.fromJsonMethod = fromJsonMethod;
        this.entityName = entityName;
    }

    async serialize(data: T[], filename: string): Promise<void> {
        let customFormat = `CUSTOM_${this.entityName.toUpperCase()}_FORMAT_V1\n`;
        customFormat += `COUNT:${data.length}\n`;
        
        data.forEach((item: any, index) => {
            customFormat += `${this.entityName.toUpperCase()}:${index}\n`;
            Object.keys(item).forEach(key => {
                customFormat += `${key.toUpperCase()}:${item[key]}\n`;
            });
            customFormat += `END_${this.entityName.toUpperCase()}\n`;
        });
        
        await fs.writeFile(filename, customFormat, 'utf8');
    }

    async deserialize(filename: string): Promise<T[]> {
        const content = await fs.readFile(filename, 'utf8');
        const lines = content.split('\n');
        const entities: T[] = [];
        
        let i = 0;
        while (i < lines.length) {
            if (lines[i].startsWith(`${this.entityName.toUpperCase()}:`)) {
                const obj: any = {};
                i++; 
                
                while (i < lines.length && !lines[i].startsWith(`END_${this.entityName.toUpperCase()}`)) {
                    const line = lines[i];
                    if (line.includes(':')) {
                        const [key, value] = line.split(':');
                        obj[key.toLowerCase()] = isNaN(Number(value)) ? value : Number(value);
                    }
                    i++;
                }
                
                if (Object.keys(obj).length > 0) {
                    entities.push(this.fromJsonMethod(obj));
                }
            }
            i++;
        }
        
        return entities;
    }

    getFileExtension(): string {
        return '.custom';
    }
}