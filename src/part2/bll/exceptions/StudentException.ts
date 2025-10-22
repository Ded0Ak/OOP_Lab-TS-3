export class StudentException extends Error {
    constructor(message: string, public code?: string) {
        super(message);
        this.name = 'StudentException';
    }
}

export class StudentNotFoundError extends StudentException {
    constructor(studentId: string) {
        super(`Student with ID '${studentId}' not found`, 'STUDENT_NOT_FOUND');
    }
}

export class InvalidStudentDataError extends StudentException {
    constructor(field: string, value: any) {
        super(`Invalid student data: field '${field}' has value '${value}'`, 'INVALID_STUDENT_DATA');
    }
}