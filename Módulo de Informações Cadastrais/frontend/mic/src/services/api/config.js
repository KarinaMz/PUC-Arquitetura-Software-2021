const BASE_URL = "https://5fh6x159l8.execute-api.sa-east-1.amazonaws.com/poc";

/** 
 * API Gateway = "https://5fh6x159l8.execute-api.sa-east-1.amazonaws.com/poc";
 * EC2 = http://micbackend-env-1.eba-mermtpj8.sa-east-1.elasticbeanstalk.com
 * Local = http://localhost:8080
*/

function getUsername(){
    return localStorage.username;
}

function getHeaders(){
    const token = localStorage.jwtToken;
    return {'Authorization': `Bearer ${token}`};
}

export { BASE_URL, getHeaders, getUsername };