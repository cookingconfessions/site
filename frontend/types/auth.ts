export interface LoginDetails {
    username: string;
    password: string;
}

export interface Token {
    refresh: string;
    access: string;
}

export interface ResetPasswordConfirmation {
    token: string;
    password: string;
}