const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoLocation = new Schema({
    name: {
        type: String,
        required: true
    },
    location: { 
        type: {
            type: String,
            default: "point"
        }, 
        coordinates: {
            type: String,
            required: true
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true
    }
});

mongoose.model("geolocations", GeoLocation);