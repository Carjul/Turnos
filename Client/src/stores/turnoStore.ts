import { defineStore } from 'pinia'
import { ref } from 'vue'
import io from 'socket.io-client'


export interface Turno {
  _id: string;
  servicio: string;
  estado: 'en espera' | 'atendiendo' | 'atendido';
  name: string;
  value: number;
  createdAt: Date;
}
export const useTurnoStore = defineStore('turno', () => {
  const turnos = ref([] as Turno[])
  const turnosProcess = ref([] as Turno[])
  //momentaniamente
  const turnosClient = ref([] as Turno[])
  const socket = io('http://localhost:3000')
  //const socket = io()


  const crearTurno = async (servicio: string, name: string) => {
    try {
      const response = await fetch('/api/turnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicio, name })
      })
      const data = await response.json()
      turnosClient.value.unshift(data)
      localStorage.setItem('turnos', JSON.stringify(turnosClient.value))
      socket.emit('crear-turno', data._id)
    } catch (error) {
      console.error('Error al crear turno:', error)
    }
  }

  const cargarTurnos = async () => {
    try {
      const response = await fetch('/api/turnos')
      const data = await response.json()
      turnos.value = data
    } catch (error) {
      console.error('Error al cargar turnos:', error)
    }
  }

  const cargarOneTurnos = async (id: string) => {
    try {
      let existing = turnosClient.value.find((e) => e._id === id)
      if (existing?._id) {

        turnosClient.value = turnosClient.value.filter((e) => e._id !== id)

        const response = await fetch('/api/turnos/'.concat(id))
        const data = await response.json()

        turnosClient.value.unshift(data)
        localStorage.setItem('turnos', JSON.stringify(turnosClient.value))
        console.log("cargo estodo turnocliente");
        

      }

    } catch (error) {
      console.error('Error al cargar turnos:', error)
    }
  }

  const cargarTurnosProcess = async () => {
    try {
      const response = await fetch('/api/turnos/enProcess')
      const data = await response.json()
      turnosProcess.value = data
    } catch (error) {
      console.error('Error al cargar turnos en proceso:', error)
    }
  }

  const llamarTurno = (id: string) => {
    socket.emit('llamar-turno', id)
  }

  const llamarTurnoAgain = (id: string) => {
    socket.emit('llamar-again', id)
  }

  const finalizarTurno = (id: string) => {
    socket.emit('finalizar-atencion', id)
  }

  const cancelarTurno = (id: string) => {
    turnosClient.value = turnosClient.value.filter((e) => e._id !== id)
    localStorage.setItem('turnos', JSON.stringify(turnosClient.value))
    socket.emit('borrar-turno', id)
  }

  const deleteAllTurnos = async () => {
    try {
      const response = await fetch('/api/turnos', {
        method: 'DELETE'
      })
      const data = await response.json()
      socket.emit('crear-turno', data.msg)
    } catch (error) {
      console.error('Error al eliminar turnos:', error)
    }
  }

  // Configurar socket listeners
  socket.on('turno-act', (payload) => {
    if (payload._id === 'elimidos') {
      turnosClient.value = [];
      localStorage.setItem('turnos', JSON.stringify(turnosClient.value))
    }
    cargarOneTurnos(payload._id)
    cargarTurnos()
    cargarTurnosProcess()
  })

  return {
    turnos,
    turnosProcess,
    turnosClient,
    crearTurno,
    cargarTurnos,
    cargarTurnosProcess,
    llamarTurno,
    llamarTurnoAgain,
    finalizarTurno,
    cancelarTurno,
    deleteAllTurnos
  }
})