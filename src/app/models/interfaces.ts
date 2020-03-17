 
export interface infoUser{
    id: number, 
    email: string, 
    name:string, 
    surname: string, 
    iat: number, 
    exp: number, 
    role:string
} 

export interface AthleteData {
    id: number,
    user_id: number,
    level: string,
    points: number
}

export interface TrainerData {
    id: number,
    user_id: number,
    certification: string,
    score: number,
    description: string
}
