# Sistema de Gestión de Turnos

Una aplicación web moderna para la gestión de turnos, construida con Vue.js, Express y Socket.IO.

## 🚀 Características

- Creación y gestión de turnos en tiempo real
- Panel de administración para servicios
- Sistema de estados para turnos (en espera, atendiendo, atendido)
- Interfaz responsive y moderna con Tailwind CSS
- Comunicación en tiempo real mediante Socket.IO
- Persistencia de datos con MongoDB

## 🛠️ Tecnologías

### Frontend
- Vue 3 (Composition API)
- TypeScript
- Pinia para gestión de estado
- Tailwind CSS
- Socket.IO Client

### Backend
- Node.js
- Express
- MongoDB con Mongoose
- Socket.IO
- CORS
- Morgan para logging

## 📦 Instalación

### Requisitos Previos
- Node.js (v16 o superior)
- MongoDB
- npm o yarn

### Configuración del Backend

```bash
cd API
npm install
# Crear archivo .env con las variables de entorno
# URI=tu_conexion_mongodb
# PORT=3000
npm run dev
### Configuracion  Frontent
cd Client
npm install
npm run dev
```
## 🌟 Uso
### Configuración de Servicios

<p> Accede a la sección "Config"
Crea los servicios y asigna personal
Creación de Turnos </p>

<p> Ve a "Crear"
Selecciona el servicio
El turno se generará automáticamente
Gestión de Turnos </p>

<p> En "Inicio" verás todos los turnos activos
Puedes llamar, finalizar o cancelar turnos
Los turnos se actualizan en tiempo real </p>

## 🗂️ Estructura del Proyecto

```bash
├── API/                  # Backend
│   ├── src/
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── model/      # Modelos de datos
│   │   ├── routes/     # Rutas API
│   │   ├── socket/     # Configuración Socket.IO
│   │   └── Server.js   # Configuración del servidor
└── Client/              # Frontend
    ├── src/
    │   ├── components/ # Componentes Vue
    │   ├── stores/     # Estado global (Pinia)
    │   ├── views/      # Vistas principales
    │   └── router/     # Configuración de rutas