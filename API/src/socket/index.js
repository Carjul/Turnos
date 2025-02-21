const {  DeleteOne } = require('../controllers/ControllerTurno');
const { deleteOne } = require('../controllers/ControllerDescription');
const Turno = require('../model/turno')
const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado', socket.id);

        // Escuchar evento para llamar un turno

        socket.on('llamar-turno', async (servicio) => {
            try {
                const turno = await Turno.findOneAndUpdate(
                    { _id: servicio, estado: 'en espera' },
                    { estado: 'atendiendo' },
                    { new: true }
                );

                if (turno) {
                    io.emit('turno-act', turno);
                }
            } catch (error) {
                console.error('Error al iniciar atención:', error);
                socket.emit('error', { message: 'Error al iniciar atención del turno' });
            }
        });


        socket.on('finalizar-atencion', async (servicio) => {
            try {
                const turno = await Turno.findOneAndUpdate(
                    { _id: servicio, estado: 'atendiendo' },
                    { estado: 'atendido' },
                    { new: true }
                );

                if (turno) {
                    io.emit('turno-act', turno);
                }
            } catch (error) {
                console.error('Error al finalizar atención:', error);
                socket.emit('error', { message: 'Error al finalizar atención del turno' });
            }
        });
        socket.on('llamar-again', async (servicio) => {
            try {
                const turno = await Turno.findOneAndUpdate(
                    { _id: servicio, estado: 'atendido' },
                    { estado: 'atendiendo' },
                    { new: true }
                );

                if (turno) {
                    io.emit('turno-act', turno);
                }
            } catch (error) {
                console.error('Error al volve iniciar atención:', error);
                socket.emit('error', { message: 'Error al iniciar atención del turno' });
            }
        });

        socket.on('crear-turno', (id) => {
            io.emit('turno-act', { _id: id });
        })

        socket.on('borrar-turno', async (id) => {
         let x=  await DeleteOne(id)
            io.emit('turno-act', x);
        })

        socket.on('crear-config', (id) => {
            io.emit('config-act', { _id: id });
        })

        socket.on('borrar-config', async (id) => {
            let x=  await deleteOne(id)
               io.emit('config-act', x);
           })
   
        socket.on('disconnect', () => {
            console.log('Cliente desconectado', socket.id);
        });
    });

}

module.exports = { socketEvents }