export class User{
    
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public phone: number,
        public id?: number
    ){}
}