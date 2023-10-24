import { RoleType } from "./enums/roleType";

export interface UserTokenDTO {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: RoleType,
    token: string
}
