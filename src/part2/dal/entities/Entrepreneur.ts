export class DalEntrepreneur {
    constructor(
        public id: string,
        public name: string,
        public businessType: string,
        public canParachute: boolean = true 
    ) {}

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            businessType: this.businessType,
            canParachute: this.canParachute
        };
    }

    static fromJSON(data: any): DalEntrepreneur {
        return new DalEntrepreneur(data.id, data.name, data.businessType, data.canParachute);
    }
}