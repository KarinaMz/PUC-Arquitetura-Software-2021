const BASE_URL = "http://localhost:8080";

function getUsername(){
    return localStorage.username;
}

function getHeaders(){
    const token = localStorage.jwtToken;
    return {'Authorization': `Bearer ${token}`};
}

export { BASE_URL, getHeaders, getUsername };