import { DalStudent } from './entities/Student';
import { DalBaker } from './entities/Baker';
import { DalEntrepreneur } from './entities/Entrepreneur';
import { DataProvider } from './providers/DataProvider';
import { JsonProvider } from './providers/JsonProvider';
import { XmlProvider } from './providers/XmlProvider';
import { BinaryProvider } from './providers/BinaryProvider';
import { CustomProvider } from './providers/CustomProvider';

export type SerializationType = 'json' | 'xml' | 'binary' | 'custom';

export class EntityContext {
    private studentProviders: Map<SerializationType, DataProvider<DalStudent>>;
    private bakerProviders: Map<SerializationType, DataProvider<DalBaker>>;
    private entrepreneurProviders: Map<SerializationType, DataProvider<DalEntrepreneur>>;

    constructor() {
        this.studentProviders = new Map<SerializationType, DataProvider<DalStudent>>([
            ['json', new JsonProvider(DalStudent.fromJSON)],
            ['xml', new XmlProvider(DalStudent.fromJSON, 'Student')],
            ['binary', new BinaryProvider(DalStudent.fromJSON)],
            ['custom', new CustomProvider(DalStudent.fromJSON, 'Student')]
        ]);

        this.bakerProviders = new Map<SerializationType, DataProvider<DalBaker>>([
            ['json', new JsonProvider(DalBaker.fromJSON)],
            ['xml', new XmlProvider(DalBaker.fromJSON, 'Baker')],
            ['binary', new BinaryProvider(DalBaker.fromJSON)],
            ['custom', new CustomProvider(DalBaker.fromJSON, 'Baker')]
        ]);

        this.entrepreneurProviders = new Map<SerializationType, DataProvider<DalEntrepreneur>>([
            ['json', new JsonProvider(DalEntrepreneur.fromJSON)],
            ['xml', new XmlProvider(DalEntrepreneur.fromJSON, 'Entrepreneur')],
            ['binary', new BinaryProvider(DalEntrepreneur.fromJSON)],
            ['custom', new CustomProvider(DalEntrepreneur.fromJSON, 'Entrepreneur')]
        ]);
    }

    async saveStudents(students: DalStudent[], filename: string, type: SerializationType): Promise<void> {
        const provider = this.studentProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        await provider.serialize(students, fullFilename);
    }

    async loadStudents(filename: string, type: SerializationType): Promise<DalStudent[]> {
        const provider = this.studentProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        return await provider.deserialize(fullFilename);
    }

    async saveBakers(bakers: DalBaker[], filename: string, type: SerializationType): Promise<void> {
        const provider = this.bakerProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        await provider.serialize(bakers, fullFilename);
    }

    async loadBakers(filename: string, type: SerializationType): Promise<DalBaker[]> {
        const provider = this.bakerProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        return await provider.deserialize(fullFilename);
    }

    async saveEntrepreneurs(entrepreneurs: DalEntrepreneur[], filename: string, type: SerializationType): Promise<void> {
        const provider = this.entrepreneurProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        await provider.serialize(entrepreneurs, fullFilename);
    }

    async loadEntrepreneurs(filename: string, type: SerializationType): Promise<DalEntrepreneur[]> {
        const provider = this.entrepreneurProviders.get(type);
        if (!provider) throw new Error(`Unknown serialization type: ${type}`);
        
        const fullFilename = filename + provider.getFileExtension();
        return await provider.deserialize(fullFilename);
    }
}