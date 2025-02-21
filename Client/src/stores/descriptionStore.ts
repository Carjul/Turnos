import { defineStore } from "pinia"
import { ref } from "vue"
import io from 'socket.io-client'

export interface Config {
    _id: string;
    servicio: string;
    name: string;
}

export const useConfigStore = defineStore('config', () => {
    const Desc = ref<Config[]>([])

    //const socket = io('http://localhost:3000')
    const socket = io()

    const cargarConfig = async () => {
        try {
            const response = await fetch('/api/description')
            const data = await response.json()
            Desc.value = data
        } catch (error) {
            console.error('Error al cargar config:', error)
        }
    }
    const crearConfig = async (servicio: string, name: string) => {
        try {
            const response = await fetch('/api/description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ servicio, name })
            })
            const data = await response.json()
            socket.emit('crear-config', data._id)
        } catch (error) {
            console.error('Error al crear turno:', error)
        }
    }
    const DeleteConfig = (id: string) => {
        socket.emit('borrar-config', id)
    }

    socket.on('config-act', () => {
        cargarConfig()
    })

    return { Desc, crearConfig, DeleteConfig, cargarConfig }
})