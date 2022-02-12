const express =require('express');
const routes =require('./routes');
const path=require('path');


//crear un app de express
const app =express();


//habilitar pug
app.set('view engine','pug')

//añadir la carpeta de vistas
app.set('views',path.join(__dirname,'./views'))


app.use('/',routes())

app.listen(3000);


