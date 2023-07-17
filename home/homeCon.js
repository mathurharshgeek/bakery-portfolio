const mongoose = require('mongoose');
const Menu = require('./model');
const User=require('./test')
const validator=require("validator");
const bcrypt=require("bcrypt");
const userData=require('./userData');
const Test_admin=require('../admin/model');

function homeCon()
{
   return{
    async index(req,res){//because we have called index method in web.js thats why awe are able to acccess req and res here
        const pizzas=await Menu.find()//it will give all the pizza we have avauable in menu 
        return res.render('home',{pizzas:pizzas});//rendering home and sending menu
         
     }   ,

  async test2(req,res){
          const {name,username,password}=req.body;
          if(!username ||  !name || !password)
          {
              req.flash('error','All Fields Are Required')//req.flash  is use to notify a message on frontend which can be accecs as messages.erroe
              res.redirect('/cart');
          }
          const user=new Test_admin({
              name:name,
              username:username,
              password:password
            })
            user.save().then(ress=>{
                sameUser=user;
                req.flash('success','User Store Successfully')

            }).catch(err =>{
                req.flash('error','something went wromg')
                console.log(err);
            })
     
   } ,
   getRegister(req,res){
    res.render('register');
   },
   async postRegister(req,res){
    console.log(req.body);
    const { name, email, password } = req.body;
  // Validate request
  if (!name || !email || !password) {
    req.flash("error", "All Fields are required");
    req.flash("name", name);
    req.flash("email", email);
    return res.redirect(`/register`);
  }
  var right = false;
  if (!right) {
    if (!validator.isAlpha(req.body.name)) {
      req.flash(
        "error",
        "Invalid Name, it should not contain a number or a symbol"
      );
    console.log("invalid name");
      return res.redirect(`/register`);
    }
    if (!validator.isEmail(req.body.email)) {
      req.flash("error", "Invalid Email");
     console.log("invalid email");
     
      return res.redirect(`/register`);
    }
    if (!validator.isStrongPassword(req.body.password)) {
      req.flash(
        "error",
        "Password must be of 8 characters and it must contain a capital letter, a number and a special character"
      );
    console.log("invalid password");

      return res.redirect(`/register`);
    }
    right = true;
  }

  let user = await userData.findOne({ email });
  if (user) {
    req.flash("error", "Email already taken");

    res.render("register");
  } else {
    const hashpw = await bcrypt.hash(req.body.password, 10);

    let newUser = new userData({
      name: name,
      email: email,
      password: hashpw,
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => console.log(err));


  
   }

}


}

}
module.exports=homeCon;
