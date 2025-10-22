import { EntityContext, SerializationType } from '../dal/EntityContext';
import { DalStudent } from '../dal/entities/Student';
import { DalBaker } from '../dal/entities/Baker';
import { DalEntrepreneur } from '../dal/entities/Entrepreneur';
import { BllStudent } from './entities/Student';
import { BllBaker } from './entities/Baker';
import { BllEntrepreneur } from './entities/Entrepreneur';
import { StudentException, StudentNotFoundError, InvalidStudentDataError } from './exceptions/StudentException';
import { SerializationException } from './exceptions/SerializationException';

export class EntityService {
    private context: EntityContext;
    private students: BllStudent[] = [];
    private bakers: BllBaker[] = [];
    private entrepreneurs: BllEntrepreneur[] = [];

    constructor() {
        this.context = new EntityContext();
    }

    private dalToBllStudent(dal: DalStudent): BllStudent {
        return new BllStudent(dal.id, dal.lastName, dal.firstName, dal.course, dal.studentTicket, dal.birthDate);
    }

    private bllToDalStudent(bll: BllStudent): DalStudent {
        return new DalStudent(bll.id, bll.lastName, bll.firstName, bll.course, bll.studentTicket, bll.birthDate);
    }

    private dalToBllBaker(dal: DalBaker): BllBaker {
        return new BllBaker(dal.id, dal.name, dal.experience, dal.canParachute);
    }

    private bllToDalBaker(bll: BllBaker): DalBaker {
        return new DalBaker(bll.id, bll.name, bll.experience, bll.canParachute);
    }

    private dalToBllEntrepreneur(dal: DalEntrepreneur): BllEntrepreneur {
        return new BllEntrepreneur(dal.id, dal.name, dal.businessType, dal.canParachute);
    }

    private bllToDalEntrepreneur(bll: BllEntrepreneur): DalEntrepreneur {
        return new DalEntrepreneur(bll.id, bll.name, bll.businessType, bll.canParachute);
    }

    addStudent(lastName: string, firstName: string, course: number, studentTicket: string, birthDate: string): void {
        try {
            if (!lastName || !firstName) {
                throw new InvalidStudentDataError('lastName/firstName', `${lastName}/${firstName}`);
            }
            if (course < 1 || course > 6) {
                throw new InvalidStudentDataError('course', course);
            }
            
            const id = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const student = new BllStudent(id, lastName, firstName, course, studentTicket, birthDate);
            this.students.push(student);
        } catch (error) {
            if (error instanceof StudentException) {
                throw error;
            }
            throw new StudentException(`Error adding student: ${error}`);
        }
    }

    findStudentById(id: string): BllStudent | null {
        const student = this.students.find(s => s.id === id);
        return student || null;
    }

    removeStudent(id: string): boolean {
        try {
            const index = this.students.findIndex(s => s.id === id);
            if (index === -1) {
                throw new StudentNotFoundError(id);
            }
            this.students.splice(index, 1);
            return true;
        } catch (error) {
            if (error instanceof StudentException) {
                throw error;
            }
            throw new StudentException(`Error removing student: ${error}`);
        }
    }

    getAllStudents(): BllStudent[] {
        return [...this.students];
    }

    addBaker(name: string, experience: number): void {
        const id = `baker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const baker = new BllBaker(id, name, experience, true);
        this.bakers.push(baker);
    }

    getAllBakers(): BllBaker[] {
        return [...this.bakers];
    }

    addEntrepreneur(name: string, businessType: string): void {
        const id = `entrepreneur_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const entrepreneur = new BllEntrepreneur(id, name, businessType, true);
        this.entrepreneurs.push(entrepreneur);
    }

    getAllEntrepreneurs(): BllEntrepreneur[] {
        return [...this.entrepreneurs];
    }

    countFourthYearSpringBornStudents(): number {
        return this.students.filter(student => 
            student.course === 4 && student.isBornInSpring()
        ).length;
    }

    getFourthYearSpringBornStudents(): BllStudent[] {
        return this.students.filter(student => 
            student.course === 4 && student.isBornInSpring()
        );
    }

    async saveStudentsToFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalStudents = this.students.map(s => this.bllToDalStudent(s));
            await this.context.saveStudents(dalStudents, filename, type);
        } catch (error) {
            throw new SerializationException(`Error saving students: ${error}`);
        }
    }

    async loadStudentsFromFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalStudents = await this.context.loadStudents(filename, type);
            this.students = dalStudents.map(s => this.dalToBllStudent(s));
        } catch (error) {
            throw new SerializationException(`Error loading students: ${error}`);
        }
    }

    async saveBakersToFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalBakers = this.bakers.map(b => this.bllToDalBaker(b));
            await this.context.saveBakers(dalBakers, filename, type);
        } catch (error) {
            throw new SerializationException(`Error saving bakers: ${error}`);
        }
    }

    async loadBakersFromFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalBakers = await this.context.loadBakers(filename, type);
            this.bakers = dalBakers.map(b => this.dalToBllBaker(b));
        } catch (error) {
            throw new SerializationException(`Error loading bakers: ${error}`);
        }
    }

    async saveEntrepreneursToFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalEntrepreneurs = this.entrepreneurs.map(e => this.bllToDalEntrepreneur(e));
            await this.context.saveEntrepreneurs(dalEntrepreneurs, filename, type);
        } catch (error) {
            throw new SerializationException(`Error saving entrepreneurs: ${error}`);
        }
    }

    async loadEntrepreneursFromFile(filename: string, type: SerializationType): Promise<void> {
        try {
            const dalEntrepreneurs = await this.context.loadEntrepreneurs(filename, type);
            this.entrepreneurs = dalEntrepreneurs.map(e => this.dalToBllEntrepreneur(e));
        } catch (error) {
            throw new SerializationException(`Error loading entrepreneurs: ${error}`);
        }
    }

    initializeTestData(): void {
        this.addStudent("Ivanenko", "Ivan", 4, "ST001", "15.03.2001");
        this.addStudent("Petrenko", "Petro", 4, "ST002", "22.04.2001");
        this.addStudent("Sydorenko", "Sidor", 3, "ST003", "10.06.2002");
        this.addStudent("Kovalenko", "Maria", 4, "ST004", "05.05.2001");
        this.addStudent("Shevchenko", "Oksana", 2, "ST005", "30.09.2003");

        this.addBaker("Volodymyr Khlibnik", 5);
        this.addBaker("Anna Bulochkina", 3);

        this.addEntrepreneur("Oleksiy Biznesov", "IT");
        this.addEntrepreneur("Svitlana Startapova", "Catering");
    }
}