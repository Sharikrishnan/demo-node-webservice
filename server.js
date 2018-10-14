const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

hbs.registerHelper("getCurrenrYear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("caps",(text) => {
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now} : ${req.method} ${req.url}`;
    fs.appendFileSync("server.log",log+"\n");
    console.log();
    next();
});

/* app.use((req,res,next) => {
    res.render("maintance.hbs",{
        pageTitle: 'Maintances'
    });
}); */

app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        name : 'Hari'        
    });
});
app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle : 'About Page'
    });
});
app.get('/bad', (req,res) => {
    res.statusCode=200;
    res.send({
        errorMessage : "Bad request",
    });
});

app.listen(port,() => {console.log(`Server started at port ${port}`);});