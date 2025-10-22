export class DalStudent {
    constructor(
        public id: string,
        public lastName: string,
        public firstName: string,
        public course: number,
        public studentTicket: string,
        public birthDate: string 
    ) {}

    isBornInSpring(): boolean {
        const dateParts = this.birthDate.split('.');
        if (dateParts.length !== 3) return false;
        
        const month = parseInt(dateParts[1]);
        return month >= 3 && month <= 5; 
    }

    toJSON() {
        return {
            id: this.id,
            lastName: this.lastName,
            firstName: this.firstName,
            course: this.course,
            studentTicket: this.studentTicket,
            birthDate: this.birthDate
        };
    }

    static fromJSON(data: any): DalStudent {
        return new DalStudent(
            data.id,
            data.lastName,
            data.firstName,
            data.course,
            data.studentTicket,
            data.birthDate
        );
    }
}