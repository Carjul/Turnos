const Descripcion = require("../model/descripcion");

const Creardescripcion = async (servicio, name) => {
    try {
        if (!servicio || !name) {
            throw new Error('Servicio y nombre son requeridos');
        }

        const descripcion = new Descripcion({
            servicio,
            name
        });

        await descripcion.save();
        return descripcion;
    } catch (error) {
        throw new Error(`Error al crear descripcion: ${error.message}`);
    }
}

const GetDescription = async () => {
    try {
        const descripcion = await Descripcion.find({})
        return descripcion;

    } catch (error) {
        throw error;
    }
}

const deleteOne = async (id) => {
    try {
        const descripcion = await Descripcion.findByIdAndDelete(id);
        if (!descripcion) {
            throw new Error('descripcion no encontrado');
        }
        return descripcion;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    Creardescripcion,
    GetDescription,
    deleteOne
}