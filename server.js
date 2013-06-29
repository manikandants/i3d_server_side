var express = require('express'),
    wines = require('./routes/product'),
	testdownload=require('./routes/downloadImage');
 
var app = module.exports=express();

//app.get('/productlist/:id/reports', wines.findByManager);
app.get('/barcode/:barCode', wines.findByBarcode);
app.get('/productname/:productName', wines.findByProductName);
app.get('/productid/:id', wines.findById);
//app.get('/productlist', wines.findAll);
app.get('/image/:filename', testdownload.findByImagePath);
app.get('/obj/:filename', testdownload.findByObjPath);

app.listen(8080);
console.log('Listening on port 8080...');
