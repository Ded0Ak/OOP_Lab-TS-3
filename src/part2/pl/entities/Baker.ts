export class PlBaker {
    constructor(
        public id: string,
        public name: string,
        public experience: number,
        public canParachute: boolean = true
    ) {}

    getDisplayInfo(): string {
        const skill = this.canParachute ? "Can parachute jump" : "Cannot parachute jump";
        return `Baker: ${this.name}, experience: ${this.experience} years, ${skill}`;
    }
}