const fs = require('fs');
const colors = require('colors');
const Bootcamp = require('./models/Bootcamp');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config/config.env' });

const bootcamps = [__dirname, '/_data/bootcamps.json'];

const bootcampData = JSON.parse(fs.readFileSync(bootcamps.join(''), 'utf-8'));

mongoose.connect(process.env.MONGO_URI,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed'.red.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
    
};

const importData = async () => {
    try {
        await Bootcamp.insertMany(bootcampData);
        console.log('Data created'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
   
};

if (process.argv[2] === '-d') {
    deleteData();
}
if (process.argv[2] === '-i') {
    importData();
}
