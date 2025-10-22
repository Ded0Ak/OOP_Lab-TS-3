export class PlEntrepreneur {
    constructor(
        public id: string,
        public name: string,
        public businessType: string,
        public canParachute: boolean = true
    ) {}

    getDisplayInfo(): string {
        const skill = this.canParachute ? "Can parachute jump" : "Cannot parachute jump";
        return `Entrepreneur: ${this.name}, field: ${this.businessType}, ${skill}`;
    }
}