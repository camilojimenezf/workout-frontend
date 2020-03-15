export class Profile{
    
    constructor(
        public athlete_id: number,
        public weight: number,
        public height: number,
        public body_fat: number,
        public created_at?: Date,
        public id?: number
    ){}
}