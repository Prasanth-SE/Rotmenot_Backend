const mongoose = require('mongoose');

const url = process.env.NODE_ENV === 'development' ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    : `${process.env.DB_CONN_TYPE}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log ('dbUrl', url);
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(url, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', console.info.bind(console, 'MongoDB connected'))

module.exports = {
    dbUrl: url 
};
