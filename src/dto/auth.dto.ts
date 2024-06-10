export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
    statusCode: number;
}