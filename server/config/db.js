const mongoose = require('mongoose');

const connectdb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected')
    } catch(err){
        console.log(`error from backend : ${err.message}`)
    }
}

module.exports = connectdb;