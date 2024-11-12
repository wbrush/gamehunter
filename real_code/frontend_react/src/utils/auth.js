// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
    // get user data from JSON web token by decoding it
    getUser() {
        const token = this.getToken()
        if (token) {
            return decode(token);
        }
    }

    // return `true` or `false` if token exists (does not verify if it's expired yet)
    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
