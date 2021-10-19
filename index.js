const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const chalk = require('chalk');
const Email = require('./models/Email');
const Product = require('./models/Products');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 80;

const db = "mongodb+srv://mihhha1985:nintendo27@cluster0.axbjz.mongodb.net/beats?retryWrites=true&w=majority";

mongoose
    .connect(db)
    .then(res => console.log(chalk.bgMagenta.yellow('Connection DB')))
    .catch(err => console.error(err));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);
//console.log(createPath('index'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
//const urlencodedParser = express.urlencoded({extended: false});
app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(chalk.bgMagenta.yellow(`server running on port ${PORT}`));
})

app.get('/', (req, res) => {

    const title = 'Responsive Landing Page';

    Product.find()
        .then(product => {
            //console.log(product)
            res.render(createPath('index'), {title, product})
        }).catch(err => {
            res.status(404).end('Error 404');
            console.log(err)
        })
})

app.post('/add-email', (req, res) => {
    let email = req.body.email;
    //console.log(req.body);
    Email.find()
        .then(result => {

            for(let item of result){
                if(item.email === email){
                    return false;
                }
            }

            return true;
        }).then(result => {
            if(result){
                let adds = new Email({email});
                adds.save().then(() => {
                    res.json({
                        status: 'success',
                        email: email
                    })
                })
            }else{
                res.json({
                    status: 'error',
                    email: email
                })
            }
        }).catch(err => console.error(err));
})

app.use((req, res) => {
    res.status(404).end('Error 404');
})

