export default interface sessionInterface {
    isAuthenticated: boolean,
    user: {
        email: string,
        name: string,
        uid: string
    }
}