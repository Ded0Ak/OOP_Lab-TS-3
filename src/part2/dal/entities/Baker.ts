export class DalBaker {
    constructor(
        public id: string,
        public name: string,
        public experience: number,
        public canParachute: boolean = true 
    ) {}

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            experience: this.experience,
            canParachute: this.canParachute
        };
    }

    static fromJSON(data: any): DalBaker {
        return new DalBaker(data.id, data.name, data.experience, data.canParachute);
    }
}