export function getUserFromLS() {
    return localStorage.getItem('pointyUser');
}

export function setUserToLS(user) {
    localStorage.setItem('pointyUser', user);
}
