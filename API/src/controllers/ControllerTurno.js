const Turno = require("../model/turno");


const fechaBogota = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    hour12: true
});


const CrearTurno = async (servicio, name) => {
    try {
        if (!servicio || !name) {
            throw new Error('Servicio y nombre son requeridos');
        }

        // Buscar el último turno del mismo servicio
        const ultimoTurno = await Turno.findOne({ servicio })
            .sort({ value: -1 }) // Ordenar por value de forma descendente
            .limit(1);

        // Calcular el nuevo valor
        const nuevoValue = ultimoTurno ? ultimoTurno.value + 1 : 1;

        const turno = new Turno({ 
            servicio, 
            name,
            value: nuevoValue,
            createdAt: fechaBogota
        });
        
        await turno.save();
        return turno;
    } catch (error) {
        throw new Error(`Error al crear turno: ${error.message}`);
    }
}

const GetOneTurno = async (id) => { 
    try {
        const turnos = await Turno.findById(id)  
        return turnos;
    } catch (error) {
        throw new Error(`Error al obtener turnos: ${error.message}`);
    }
}

const GetTurnos = async () => { 
    try {
        const turnos = await Turno.find({estado:'en espera'})
            .sort({ value: 'asc' })
            .lean();
            
        return turnos;
    } catch (error) {
        throw new Error(`Error al obtener turnos: ${error.message}`);
    }
}

const GetTurnosAtendidos = async () => { 
    try {
        const turnos = await Turno.find({ 
            estado: { 
                $nin: ['en espera'] // $nin: not in - excluye los turnos 'en espera'
            }
        })
        .sort({ value: 'desc' })
        .lean();
            
        return turnos;
    } catch (error) {
        throw new Error(`Error al obtener turnos atendidos: ${error.message}`);
    }
}

const DeleteOne = async (id) => {
    try {
        const turno = await Turno.findByIdAndDelete(id);
        if (!turno) {
            throw new Error('Turno no encontrado');
        }
        return turno;
    } catch (error) {
        throw error;
    }
}

const DeleteAll = async () => {
    try {
        const result = await Turno.deleteMany({});
        return result;
    } catch (error) {
        throw error;
    }
}

// No olvides exportar las nuevas funciones
module.exports = {
    CrearTurno,
    GetOneTurno,
    GetTurnos,
    GetTurnosAtendidos,
    DeleteOne,
    DeleteAll
}
