export class Routine{
    
    constructor(
        public title: string,
        public description: string,
        public duration: number,
        public frequency: number,
        public goal: string,
        public trainer_id?: number,
        public id?: number,
    ){}
}