const axios = require('axios');
import { expect } from '@playwright/test';
const cookie = require('cookie');

let apiurl

async function authenticateUser(username, password,{request}) {    // Navigate to the login page
   const apiurl = await getApiBaseUrl();//website ko url rw api url alag xa vane use garne 
   const headers = {
    'content-type': 'application/json',
     };
    const requestBody ={
        email: username,
        password: password;

    };
    const response = await request.post(`${apiurl}/auth/login`, {
        
        data: requestBody,
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}
async function getApiBaseUrl() {
    apiUrl = process.env.API_BASE_URL ;
    if(!apiUrl){
        apiUrl = 'https://thinking-tester-api.herokuapp.com';
    }
    return apiUrl;
}
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Creates a new entity in the API, given the required user data and API module URL
 * @param {object} userData - The user data to be used for authentication and entity creation
 * @param {string} module - The API module URL (e.g. '/users')
 * @param {object} request - The Playwright request context
 * @returns {string|null} The created entity ID, or null if the creation fails
/*******  f28f1177-8096-4f05-9313-c4ff3359d4cb  *******/
async function createEntity(userData, module ,{request}) {
    const apiurl = await getApiBaseUrl();
    const accessToken = await authenticateUser(userData.email, userData.password, {request});
    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer' + accessToken,
    };
    
    const response = await request.post(apiurl + module, {
        headers,
        data: JSON.stringify(userData),
    });
    
    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);
    if (responseBody && responseBody.id) {
        return responseBody.id; // Return the created entity ID
    }else{
        return null;
    }

    
    
}
async function getEntity(accessToken, status,module,{request}) {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/jsonn',
        'Authorization': 'Bearer ' + accessToken,

    };
    const response = await request.get(apiurl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
    const responseBody = await response.json();
    if (responseBody && responseBody[0]._id) {
        return responseBody[0]._id;
    } else {
        return null;
    }
}
async function getCurrentDateTimeStamp(){
    const now = new Date();
    const year = now.getFullYear(); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
module.exportd ={authenticateUser, createEntity, getEntity, getCurrentDateTimeStamp, getApiBaseUrl};

deleteEntity = async (accessToken, module, {request}) => {
    const apiurl = await getApiBaseUrl();
    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    };  
    const response = await request.delete(apiurl + module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(200);
}

async function validateEntity(accessToken,status,{request}){
    const apiUrl = await getApi
}