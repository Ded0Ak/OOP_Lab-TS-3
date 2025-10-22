import * as fs from 'fs/promises';
import { DataProvider } from './DataProvider';

export class XmlProvider<T> extends DataProvider<T> {
    private fromJsonMethod: (data: any) => T;
    private entityName: string;

    constructor(fromJsonMethod: (data: any) => T, entityName: string) {
        super();
        this.fromJsonMethod = fromJsonMethod;
        this.entityName = entityName;
    }

    async serialize(data: T[], filename: string): Promise<void> {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += `<${this.entityName}s>\n`;
        
        data.forEach((item: any, index) => {
            xml += `  <${this.entityName} id="${index}">\n`;
            Object.keys(item).forEach(key => {
                xml += `    <${key}><![CDATA[${item[key]}]]></${key}>\n`;
            });
            xml += `  </${this.entityName}>\n`;
        });
        
        xml += `</${this.entityName}s>`;
        
        await fs.writeFile(filename, xml, 'utf8');
    }

    async deserialize(filename: string): Promise<T[]> {
        const content = await fs.readFile(filename, 'utf8');
        const entities: T[] = [];
        const entityRegex = new RegExp(`<${this.entityName}[^>]*>([\\s\\S]*?)<\/${this.entityName}>`, 'g');
        let match;
        
        while ((match = entityRegex.exec(content)) !== null) {
            const entityContent = match[1];
            const obj: any = {};
            
            const fieldRegex = /<(\w+)><!\[CDATA\[(.*?)\]\]><\/\1>/g;
            let fieldMatch;
            
            while ((fieldMatch = fieldRegex.exec(entityContent)) !== null) {
                const [, fieldName, fieldValue] = fieldMatch;
                obj[fieldName] = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue);
            }
            
            entities.push(this.fromJsonMethod(obj));
        }
        
        return entities;
    }

    getFileExtension(): string {
        return '.xml';
    }
}