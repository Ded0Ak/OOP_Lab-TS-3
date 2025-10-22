export class PlStudent {
    constructor(
        public id: string,
        public lastName: string,
        public firstName: string,
        public course: number,
        public studentTicket: string,
        public birthDate: string
    ) {}

    getDisplayInfo(): string {
        return `${this.lastName} ${this.firstName} (${this.course} курс, ${this.studentTicket})`;
    }

    getBirthInfo(): string {
        return `Birth Date: ${this.birthDate}`;
    }
}