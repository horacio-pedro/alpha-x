const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
    name: {
        type: String,
        required: true
    },
    geozone: {
        country: {
            name:{type: String},
            continent:{type: String},
        },
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("locations", Location);