const mongoose = require('mongoose');

const uri = 'mongodb+srv://longddm4200:longddm4200@longddm4200.l2gxluo.mongodb.net/onthi'

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connect success');
    } catch (error) {
        console.log(error);
        console.log("Connect fail")
    }
}

module.exports = {connect}