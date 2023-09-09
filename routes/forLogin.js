const router = require('express').Router();

const xyz = false;
const makeTrue = ()=>{
    xyz = true;
}

const makeFalse = ()=>{
    xyz = false;
}

const currentValue = ()=>{
    return xyz;
}

module.exports = {makeTrue, makeFalse, currentValue};