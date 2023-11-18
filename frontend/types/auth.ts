export interface LoginDetails {
    username: string;
    password: string;
}

export interface Token {
    refresh: string;
    access: string;
}