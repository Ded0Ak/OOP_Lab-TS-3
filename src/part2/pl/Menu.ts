import * as readline from 'readline';
import { EntityService } from '../bll/EntityService';
import { SerializationType } from '../dal/EntityContext';
import { BllStudent } from '../bll/entities/Student';
import { BllBaker } from '../bll/entities/Baker';
import { BllEntrepreneur } from '../bll/entities/Entrepreneur';
import { PlStudent } from './entities/Student';
import { PlBaker } from './entities/Baker';
import { PlEntrepreneur } from './entities/Entrepreneur';
import { StudentException } from '../bll/exceptions/StudentException';
import { SerializationException } from '../bll/exceptions/SerializationException';

export class Menu {
    private rl: readline.Interface;
    private service: EntityService;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.service = new EntityService();
    }

    private bllToPlStudent(bll: BllStudent): PlStudent {
        return new PlStudent(bll.id, bll.lastName, bll.firstName, bll.course, bll.studentTicket, bll.birthDate);
    }

    private bllToPlBaker(bll: BllBaker): PlBaker {
        return new PlBaker(bll.id, bll.name, bll.experience, bll.canParachute);
    }

    private bllToPlEntrepreneur(bll: BllEntrepreneur): PlEntrepreneur {
        return new PlEntrepreneur(bll.id, bll.name, bll.businessType, bll.canParachute);
    }

    private question(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }

    async mainMenu(): Promise<void> {
        console.clear();
        console.log('Three-tier Application Architecture\n');

        while (true) {
            console.log('\nMain Menu');
            console.log('1. Student Management');
            console.log('2. Baker Management');
            console.log('3. Entrepreneur Management');
            console.log('4. Serialization/Deserialization');
            console.log('5. Data Analysis (Variant Task)');
            console.log('6. Initialize Test Data');
            console.log('0. Exit');

            const choice = await this.question('\nSelect option: ');

            try {
                switch (choice) {
                    case '1':
                        await this.studentMenu();
                        break;
                    case '2':
                        await this.bakerMenu();
                        break;
                    case '3':
                        await this.entrepreneurMenu();
                        break;
                    case '4':
                        await this.serializationMenu();
                        break;
                    case '5':
                        await this.analysisMenu();
                        break;
                    case '6':
                        this.service.initializeTestData();
                        console.log('Test data initialized!');
                        break;
                    case '0':
                        console.log('Goodbye!');
                        this.rl.close();
                        return;
                    default:
                        console.log('Invalid choice. Please try again.');
                }
            } catch (error) {
                if (error instanceof StudentException || error instanceof SerializationException) {
                    console.error(`\nError: ${error.message}`);
                } else {
                    console.error(`\nUnexpected error: ${error}`);
                }
                await this.question('\nPress Enter to continue...');
            }
        }
    }

    private async studentMenu(): Promise<void> {
        while (true) {
            console.log('\nStudent Management');
            console.log('1. Add Student');
            console.log('2. View All Students');
            console.log('3. Remove Student');
            console.log('0. Return to Main Menu');

            const choice = await this.question('\nSelect option: ');

            switch (choice) {
                case '1':
                    await this.addStudent();
                    break;
                case '2':
                    this.showAllStudents();
                    break;
                case '3':
                    await this.removeStudent();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice.');
            }
        }
    }

    private async addStudent(): Promise<void> {
        console.log('\nAdding New Student');
        const lastName = await this.question('Last Name: ');
        const firstName = await this.question('First Name: ');
        const courseStr = await this.question('Course (1-6): ');
        const course = parseInt(courseStr);
        const studentTicket = await this.question('Student Ticket: ');
        const birthDate = await this.question('Birth Date (DD.MM.YYYY): ');

        try {
            this.service.addStudent(lastName, firstName, course, studentTicket, birthDate);
            console.log('Student successfully added!');
        } catch (error) {
            throw error;
        }
    }

    private showAllStudents(): void {
        console.log('\nList of All Students');
        const students = this.service.getAllStudents();
        
        if (students.length === 0) {
            console.log('No students found.');
            return;
        }

        students.forEach((student, index) => {
            const plStudent = this.bllToPlStudent(student);
            console.log(`${index + 1}. ${plStudent.getDisplayInfo()}`);
            console.log(`   ${plStudent.getBirthInfo()}`);
        });
    }

    private async removeStudent(): Promise<void> {
        this.showAllStudents();
        const students = this.service.getAllStudents();
        
        if (students.length === 0) return;

        const indexStr = await this.question('\nEnter student number to remove: ');
        const index = parseInt(indexStr) - 1;

        if (index >= 0 && index < students.length) {
            const studentId = students[index].id;
            this.service.removeStudent(studentId);
            console.log('Student successfully removed!');
        } else {
            console.log('Invalid student number.');
        }
    }

    private async bakerMenu(): Promise<void> {
        while (true) {
            console.log('\nBaker Management');
            console.log('1. Add Baker');
            console.log('2. View All Bakers');
            console.log('0. Return to Main Menu');

            const choice = await this.question('\nSelect option: ');

            switch (choice) {
                case '1':
                    await this.addBaker();
                    break;
                case '2':
                    this.showAllBakers();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice.');
            }
        }
    }

    private async addBaker(): Promise<void> {
        console.log('\nAdding New Baker');
        const name = await this.question('Baker Name: ');
        const experienceStr = await this.question('Work Experience (years): ');
        const experience = parseInt(experienceStr);

        this.service.addBaker(name, experience);
        console.log('Baker successfully added! (Automatically added "Parachute Jumping" skill)');
    }

    private showAllBakers(): void {
        console.log('\nList of All Bakers');
        const bakers = this.service.getAllBakers();
        
        if (bakers.length === 0) {
            console.log('No bakers found.');
            return;
        }

        bakers.forEach((baker, index) => {
            const plBaker = this.bllToPlBaker(baker);
            console.log(`${index + 1}. ${plBaker.getDisplayInfo()}`);
        });
    }

    private async entrepreneurMenu(): Promise<void> {
        while (true) {
            console.log('\nEntrepreneur Management');
            console.log('1. Add Entrepreneur');
            console.log('2. View All Entrepreneurs');
            console.log('0. Return to Main Menu');

            const choice = await this.question('\nSelect option: ');

            switch (choice) {
                case '1':
                    await this.addEntrepreneur();
                    break;
                case '2':
                    this.showAllEntrepreneurs();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice.');
            }
        }
    }

    private async addEntrepreneur(): Promise<void> {
        console.log('\nAdding New Entrepreneur');
        const name = await this.question('Entrepreneur Name: ');
        const businessType = await this.question('Business Type: ');

        this.service.addEntrepreneur(name, businessType);
        console.log('Entrepreneur successfully added! (Automatically added "Parachute Jumping" skill)');
    }

    private showAllEntrepreneurs(): void {
        console.log('\nList of All Entrepreneurs');
        const entrepreneurs = this.service.getAllEntrepreneurs();
        
        if (entrepreneurs.length === 0) {
            console.log('No entrepreneurs found.');
            return;
        }

        entrepreneurs.forEach((entrepreneur, index) => {
            const plEntrepreneur = this.bllToPlEntrepreneur(entrepreneur);
            console.log(`${index + 1}. ${plEntrepreneur.getDisplayInfo()}`);
        });
    }

    private async serializationMenu(): Promise<void> {
        while (true) {
            console.log('\nSerialization/Deserialization');
            console.log('1. Save Students to File');
            console.log('2. Load Students from File');
            console.log('3. Save Bakers to File');
            console.log('4. Load Bakers from File');
            console.log('5. Save Entrepreneurs to File');
            console.log('6. Load Entrepreneurs from File');
            console.log('0. Return to Main Menu');

            const choice = await this.question('\nSelect option: ');

            switch (choice) {
                case '1':
                    await this.saveStudents();
                    break;
                case '2':
                    await this.loadStudents();
                    break;
                case '3':
                    await this.saveBakers();
                    break;
                case '4':
                    await this.loadBakers();
                    break;
                case '5':
                    await this.saveEntrepreneurs();
                    break;
                case '6':
                    await this.loadEntrepreneurs();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice.');
            }
        }
    }

    private async selectSerializationType(): Promise<SerializationType> {
        console.log('\nSelect serialization type:');
        console.log('1. JSON');
        console.log('2. XML');
        console.log('3. Binary');
        console.log('4. Custom');

        const choice = await this.question('Your choice: ');
        
        switch (choice) {
            case '1': return 'json';
            case '2': return 'xml';
            case '3': return 'binary';
            case '4': return 'custom';
            default:
                console.log('Invalid choice, using JSON by default.');
                return 'json';
        }
    }

    private async saveStudents(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.saveStudentsToFile(`data/${filename}`, type);
            console.log(`Students saved to file with ${type.toUpperCase()} type.`);
        } catch (error) {
            throw error;
        }
    }

    private async loadStudents(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.loadStudentsFromFile(`data/${filename}`, type);
            console.log(`Students loaded from ${type.toUpperCase()} type file.`);
        } catch (error) {
            throw error;
        }
    }

    private async saveBakers(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.saveBakersToFile(`data/${filename}`, type);
            console.log(`Bakers saved to file with ${type.toUpperCase()} type.`);
        } catch (error) {
            throw error;
        }
    }

    private async loadBakers(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.loadBakersFromFile(`data/${filename}`, type);
            console.log(`Bakers loaded from ${type.toUpperCase()} type file.`);
        } catch (error) {
            throw error;
        }
    }

    private async saveEntrepreneurs(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.saveEntrepreneursToFile(`data/${filename}`, type);
            console.log(`Entrepreneurs saved to file with ${type.toUpperCase()} type.`);
        } catch (error) {
            throw error;
        }
    }

    private async loadEntrepreneurs(): Promise<void> {
        const type = await this.selectSerializationType();
        const filename = await this.question('Enter filename (without extension): ');
        
        try {
            await this.service.loadEntrepreneursFromFile(`data/${filename}`, type);
            console.log(`Entrepreneurs loaded from ${type.toUpperCase()} type file.`);
        } catch (error) {
            throw error;
        }
    }

    private async analysisMenu(): Promise<void> {
        console.log('\nData Analysis (Variant 8 Task)');
        console.log('Task: Calculate the number of 4th year students born in spring\n');

        const count = this.service.countFourthYearSpringBornStudents();
        const students = this.service.getFourthYearSpringBornStudents();

        console.log(`Number of 4th year students born in spring: ${count}`);
        
        if (students.length > 0) {
            console.log('\nList of such students:');
            students.forEach((student, index) => {
                const plStudent = this.bllToPlStudent(student);
                console.log(`${index + 1}. ${plStudent.getDisplayInfo()}`);
                console.log(`   ${plStudent.getBirthInfo()}`);
            });
        } else {
            console.log('No such students found.');
        }

        await this.question('\nPress Enter to continue...');
    }
}