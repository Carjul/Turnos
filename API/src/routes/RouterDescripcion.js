const express = require('express');
const { deleteOne, Creardescripcion, GetDescription } = require('../controllers/ControllerDescription');

const router = express.Router();

router.post('/', async (req, res) => {
    const { servicio, name } = req.body;
    const turno = await Creardescripcion(servicio, name)
    res.status(201).json(turno);
});

router.get('/', async (req, res) => {
    const turnos = await GetDescription()
    res.json(turnos);
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await deleteOne(id)
    res.json({ msg: "elimidos" })
})

module.exports = router