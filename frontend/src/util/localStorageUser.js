export function getUserFromLS() {
    return localStorage.getItem('user');
}

export function setUserToLS(user) {
    localStorage.setItem('user', user);
}
