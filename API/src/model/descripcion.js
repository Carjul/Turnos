const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    servicio: { type: String, required: true },
    name: { type: String, required: true, }, 
});
const DescriptionSchema = mongoose.model('Description', schema);
module.exports = DescriptionSchema;