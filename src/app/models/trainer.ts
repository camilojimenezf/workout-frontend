export class Trainer{
    
    constructor(
        public user_id: number,
        public certification: string,
        public score: string,
        public description: string,
        public id?: number,
        public trainerName?: string,
        public trainerEmail?: string,
        public trainerPhone?:string
    ){}
}