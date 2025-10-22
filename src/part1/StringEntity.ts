export class StringEntity {
    private _value: string;
    private _length: number;

    constructor(value: string) {
        this._value = value;
        this._length = value.length;
    }

    get value(): string {
        return this._value;
    }

    get length(): number {
        return this._length;
    }

    findCharacter(char: string): number[] {
        const positions: number[] = [];
        for (let i = 0; i < this._value.length; i++) {
            if (this._value[i] === char) {
                positions.push(i);
            }
        }
        return positions;
    }

    reverse(): StringEntity {
        const reversedValue = this._value.split('').reverse().join('');
        return new StringEntity(reversedValue);
    }

    concatenate(other: StringEntity): StringEntity {
        const newValue = this._value + other._value;
        return new StringEntity(newValue);
    }

    display(): string {
        return `String: "${this._value}", Length: ${this._length}`;
    }

    toJSON() {
        return {
            value: this._value,
            length: this._length
        };
    }

    static fromJSON(data: any): StringEntity {
        return new StringEntity(data.value);
    }
}