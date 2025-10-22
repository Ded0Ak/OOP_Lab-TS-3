export abstract class DataProvider<T> {
    abstract serialize(data: T[], filename: string): Promise<void>;
    abstract deserialize(filename: string): Promise<T[]>;
    abstract getFileExtension(): string;
}