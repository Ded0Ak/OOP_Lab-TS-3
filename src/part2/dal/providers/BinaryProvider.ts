import * as fs from 'fs/promises';
import { DataProvider } from './DataProvider';

export class BinaryProvider<T> extends DataProvider<T> {
    private fromJsonMethod: (data: any) => T;

    constructor(fromJsonMethod: (data: any) => T) {
        super();
        this.fromJsonMethod = fromJsonMethod;
    }

    async serialize(data: T[], filename: string): Promise<void> {
        const jsonData = JSON.stringify(data);
        const buffer = Buffer.from(jsonData, 'utf8');
        await fs.writeFile(filename, buffer);
    }

    async deserialize(filename: string): Promise<T[]> {
        const buffer = await fs.readFile(filename);
        const jsonData = JSON.parse(buffer.toString('utf8'));
        return jsonData.map(this.fromJsonMethod);
    }

    getFileExtension(): string {
        return '.dat';
    }
}