const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://fifthOh:hello1234@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('MongoDB connection error', error);
        } else {
            console.log('succeed MongoDB connection');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.error('MongoDB Connection Error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('Disconnect MongoDB. Try to connect it again.');
    connect();
});

module.exports = connect;