import { UserLevel } from "../interfaces/IUser.interface";

export type LoginResponse = {
    token: string,
    message: string,
    name: string,
    level: UserLevel,
}