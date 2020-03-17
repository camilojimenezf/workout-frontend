export class Athlete{
    
    constructor(
        public user_id: number,
        public level: string,
        public points: string,
        public id?: number,
        public athleteName?: string,
        public athleteEmail?: string,
        public athletePhone?:string
    ){}
}