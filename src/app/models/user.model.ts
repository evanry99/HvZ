export interface User{
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    isAdmin: boolean;
}

export interface UserDTO{
    firstName: string;
    lastName: string;
    userName: string;
    isAdmin: boolean;
}
