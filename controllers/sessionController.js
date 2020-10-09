const express=require('express');
const sessionRouter= express.Router();

const mongoose = require('mongoose');
const Session = mongoose.model('Session');
var ssn;

sessionRouter.get('/', (req, res) => {
    ssn = req.session;
    if(ssn.userName){
        res.render("login", {
            viewTitle: "Login"
        });
    }
    else{
        res.redirect('/post/list');
    }
});

sessionRouter.get('/login', (req, res) => {
    res.render("login", {
        viewTitle: "Login"
    });
});

sessionRouter.post('/login',(req,res) => {
    ssn=req.session;
    
});


function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'userName':
                body['userNameError']=err.errors[field].message;
                break;
            case 'password':
                body['passwordError']=err.errors[field].message;
            default:
                break;
        }
    }
}

module.exports=sessionRouter;