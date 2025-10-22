export class BllEntrepreneur {
    constructor(
        public id: string,
        public name: string,
        public businessType: string,
        public canParachute: boolean = true
    ) {}

    getSkillDescription(): string {
        return this.canParachute ? "Can parachute jump" : "Cannot parachute jump";
    }

    display(): string {
        return `Entrepreneur: ${this.name}, business: ${this.businessType}, ${this.getSkillDescription()}`;
    }
}