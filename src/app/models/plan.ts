export class Plan{
    
    constructor(
        public name: number,
        public price: number,
        public created_at?: Date,
        public id?: number
    ){}
}