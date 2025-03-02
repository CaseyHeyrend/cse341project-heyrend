// pirate model
// Dependencies: mongoose
// Description: This model is used to create a schema for the pirate page. It will store the pirate's name, position.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pirateSchema = new Schema({
    fullName: String,
    birthPlace: String,
    birthday: String,
    status: {String,
        enum: ['Alive', 'Deceased', 'Unknown']
    },
    fruitType: {String,
        enum: ['Paramecia', 'Zoan', 'Logia, Mythical Zoan', 'Ancient Zoan', 'Artificial Zoan', 'Special Paramecia', "N/A"] 
    },
    affiliations: String,
    position: String
});

const Pirate = mongoose.model('Pirate', pirateSchema);

module.exports = Pirate;


