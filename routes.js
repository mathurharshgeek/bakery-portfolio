const homeCon=require('./home/homeCon');
const cartCon=require('./cart/cartCon');
const customerDetails=require('./order_feature/customerDetails');
const adminCon=require('./admin/adminCon');
const adminOrderCon=require('./admin/adminOrderCon');
const addMenu=require('./admin/addMenu');
const deleteMenu=require('./admin/deleteMenu');
const updateCake=require('./admin/updateCake');
const admin=require('./admin/adminConfig');
const statusCon=require('./admin/statusCon');
const passport=require("passport");
// const admin=require('./try');
const login=require('./login')
function routes(app)
{
    app.get('/',homeCon().index)
    //users routes
    app.get('/cart',cartCon().index)
    app.post('/update-cart',cartCon().update);
    app.post('/customerDetails',customerDetails().store);
    app.get('/singelOrder',customerDetails().singelOrder);
    app.get('/test',(req,res)=>{
        res.render('test');
    })
    // app.post('/test',homeCon().test)
    app.get('/test2',(req,res)=>{
        res.render('test');
    })
    app.post('/test2',homeCon().test2);
    app.get('/register',homeCon().getRegister);
    app.post('/register',homeCon().postRegister);

    //uncomment this route for admin login

    // app.get('/login',adminCon().login)
    // app.post('/login',adminCon().check)
    app.get('/login',login.getLogin());
    //admin routes
    app.post('/login',login.postLogin(passport));
    app.get('/admin/orders',admin,adminOrderCon().index)
    app.get('/add-menu',addMenu().index);  //write admin as middleware
    app.post('/add-menu',addMenu().add);//write admin as middleware
    app.get('/menu',admin,addMenu().show);
    app.get('/deletecake/:id',admin,deleteMenu().index);
    app.get('/updatecake/:id',admin,updateCake().index);
    app.post('/updatecake',admin,updateCake().update);
    app.get('/admin/orders',admin,adminOrderCon().index)
    app.post('/admin/orders/status',admin,statusCon().update);
    app.get('/logout', function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
        delete req.session.user;
      
          res.redirect('/');
        });
      });
         




}
module.exports=routes;