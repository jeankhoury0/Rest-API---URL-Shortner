var faker = require('faker');
const registerController = require('../../src/controller/registerController')
const express = require('express');
const connection = require('../db.config')


const userFaker =  (req,res) => {
   
    for(let i =0; i < 2 ; i++) {
        const user = {
            "firstName": faker.name.firstName(), 
            "lastName": faker.name.lastName(),
            "email": faker.internet.email(), 
            "password": faker.internet.password(),
        }
    }
    
}


module.exports = userFaker;