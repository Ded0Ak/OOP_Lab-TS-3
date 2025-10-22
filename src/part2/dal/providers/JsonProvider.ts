import * as fs from 'fs/promises';
import { DataProvider } from './DataProvider';

export class JsonProvider<T> extends DataProvider<T> {
    private fromJsonMethod: (data: any) => T;

    constructor(fromJsonMethod: (data: any) => T) {
        super();
        this.fromJsonMethod = fromJsonMethod;
    }

    async serialize(data: T[], filename: string): Promise<void> {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');
    }

    async deserialize(filename: string): Promise<T[]> {
        const content = await fs.readFile(filename, 'utf8');
        const jsonData = JSON.parse(content);
        return jsonData.map(this.fromJsonMethod);
    }

    getFileExtension(): string {
        return '.json';
    }
}