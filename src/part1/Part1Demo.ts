import { StringEntity } from './StringEntity';
import { BinarySerializer } from './serializers/BinarySerializer';
import { XmlSerializer } from './serializers/XmlSerializer';
import { JsonSerializer } from './serializers/JsonSerializer';
import { CustomSerializer } from './serializers/CustomSerializer';

export class Part1Demo {
    static run(): void {
        console.log('=== Part 1: Serialization Mechanism Investigation ===\n');

        const stringEntities: StringEntity[] = [
            new StringEntity("Hello World"),
            new StringEntity("TypeScript Serialization"),
            new StringEntity("Laboratory Work"),
            new StringEntity("OOP Programming")
        ];

        console.log('1. Created array of StringEntity objects:');
        stringEntities.forEach((entity, index) => {
            console.log(`   ${index + 1}. ${entity.display()}`);
        });

        console.log('\n2. Methods demonstration:');
        const entity = stringEntities[0];
        console.log(`Original string: ${entity.display()}`);
        console.log(`Finding character 'o': positions ${entity.findCharacter('o')}`);
        console.log(`Reversed string: ${entity.reverse().display()}`);
        console.log(`Concatenated with second: ${entity.concatenate(stringEntities[1]).display()}`);

        console.log('\n3. Array serialization:');
        BinarySerializer.serialize(stringEntities, 'data/strings_binary.dat');
        XmlSerializer.serialize(stringEntities, 'data/strings.xml');
        JsonSerializer.serialize(stringEntities, 'data/strings.json');
        CustomSerializer.serialize(stringEntities, 'data/strings_custom.txt');

        console.log('\n4. Deserialization:');
        try {
            const binaryEntities = BinarySerializer.deserialize('data/strings_binary.dat');
            console.log(`Binary: restored ${binaryEntities.length} objects`);

            const xmlEntities = XmlSerializer.deserialize('data/strings.xml');
            console.log(`XML: restored ${xmlEntities.length} objects`);

            const jsonEntities = JsonSerializer.deserialize('data/strings.json');
            console.log(`JSON: restored ${jsonEntities.length} objects`);

            const customEntities = CustomSerializer.deserialize('data/strings_custom.txt');
            console.log(`Custom: restored ${customEntities.length} objects`);
        } catch (error) {
            console.error('Deserialization error:', error);
        }

        console.log('\n5. Collection serialization (List):');
        const collection = new Array<StringEntity>(...stringEntities);
        JsonSerializer.serialize(collection, 'data/strings_collection.json');
        
        const restoredCollection = JsonSerializer.deserialize('data/strings_collection.json');
        console.log(`Collection: saved and restored ${restoredCollection.length} objects`);

        console.log('\nPart 1 complete\n');
    }
}

if (require.main === module) {
    const fs = require('fs');
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }
    
    Part1Demo.run();
}