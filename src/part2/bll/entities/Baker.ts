export class BllBaker {
    constructor(
        public id: string,
        public name: string,
        public experience: number,
        public canParachute: boolean = true
    ) {}

    getSkillDescription(): string {
        return this.canParachute ? "Can parachute jump" : "Cannot parachute jump";
    }

    display(): string {
        return `Baker: ${this.name}, experience: ${this.experience} years, ${this.getSkillDescription()}`;
    }
}