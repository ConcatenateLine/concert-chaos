export interface AuthStateInterface {
    isAuthenticated: boolean;
    user: string | null;
}

export default interface AuthContextInterface extends AuthStateInterface {
    login: (username: string) => void;
    logout: () => void;
}
