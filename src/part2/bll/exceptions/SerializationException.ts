export class SerializationException extends Error {
    constructor(message: string, public code?: string) {
        super(message);
        this.name = 'SerializationException';
    }
}

export class FileNotFoundError extends SerializationException {
    constructor(filename: string) {
        super(`File '${filename}' not found`, 'FILE_NOT_FOUND');
    }
}

export class InvalidFileFormatError extends SerializationException {
    constructor(filename: string, format: string) {
        super(`Invalid file format '${filename}' for type '${format}'`, 'INVALID_FILE_FORMAT');
    }
}