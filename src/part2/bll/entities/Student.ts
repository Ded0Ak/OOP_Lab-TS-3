export class BllStudent {
    constructor(
        public id: string,
        public lastName: string,
        public firstName: string,
        public course: number,
        public studentTicket: string,
        public birthDate: string
    ) {}

    getFullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }

    calculateAge(): number {
        const dateParts = this.birthDate.split('.');
        if (dateParts.length !== 3) return 0;
        
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        
        const birthDateObj = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        return age;
    }

    isBornInSpring(): boolean {
        const dateParts = this.birthDate.split('.');
        if (dateParts.length !== 3) return false;
        
        const month = parseInt(dateParts[1]);
        return month >= 3 && month <= 5;
    }

    display(): string {
        return `${this.getFullName()}, ${this.course} cours, ticket: ${this.studentTicket}, age: ${this.calculateAge()}`;
    }
}