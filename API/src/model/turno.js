const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    servicio: { type: String, required: true },
    estado: { type: String, default: 'en espera', enum: ['en espera', 'atendiendo', 'atendido'], },
    name: { type: String, required: true, }, 
    value: { type: Number, default: 0, }, 
    createdAt: { type: String, required:true }
});
const TurnoSchema = mongoose.model('Turno', turnoSchema);
module.exports = TurnoSchema;