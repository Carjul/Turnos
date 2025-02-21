const express = require('express');
const { CrearTurno, GetOneTurno, GetTurnos, DeleteAll, GetTurnosAtendidos } = require('../controllers/ControllerTurno.js');
const router = express.Router();

// Crear un turno
router.post('/', async (req, res) => {
    const { servicio, name } = req.body;
    const turno = await CrearTurno(servicio, name)
    res.status(201).json(turno);
});

router.get('/enProcess', async (req, res) => {
    const turnos = await GetTurnosAtendidos()
    res.json(turnos);
});

router.get('/', async (req, res) => {
    const turnos = await GetTurnos()
    res.json(turnos);
});


router.get('/:id', async (req, res) => {
    const {id} = req.params   
    const turnos = await GetOneTurno(id)
    res.json(turnos);
});



router.delete('/', async(req,res)=>{
await DeleteAll()
res.json({msg:"elimidos"})
})

module.exports = router;