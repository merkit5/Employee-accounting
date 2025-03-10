const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');


router.get('/', async (req, res) => {
    try {
        const employee = await Employee.findAll();
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.update(req.body);
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id/dismiss', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.update({is_employed: false});
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;