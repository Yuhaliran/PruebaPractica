const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM Vendedor', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log('Se han seleccionado todos los vendedores');
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Vendedor WHERE idVendedor = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length > 0) {
        console.log('Se ha seleccionado un vendedor');
        res.json(results[0]); 
      } else {
        console.log('No se ha encontrado el vendedor buscado');
        res.status(404).json({ message: 'Vendedor no encontrado' });
      }
    });
  });
  

router.get('/vendedores/nombre/:nombre', (req, res) => {
    const { nombre } = req.params;
    connection.query(
        'SELECT * FROM Vendedor WHERE nombre LIKE ?',
        [`%${nombre}%`],  
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length > 0) {
                console.log('se busco un vendedor por nombre');
                res.json(results);
            } else {
                console.log('No se hallo un vendedor buscado por nombre ');
                res.status(404).json({ message: 'Vendedor no encontrado' });
            }
        }
    );
});

router.get('/buscar/:nombre', (req, res) => {
    const { nombre } = req.params;
    connection.query('SELECT * FROM Vendedor WHERE nombre LIKE ?', [`%${nombre}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body;
    connection.query(
      'INSERT INTO Vendedor (nombre, apellido, direccion, edad, profesion, estadocivil) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, direccion, edad, profesion, estadocivil],
      (err, result) => {
        if (err) {
          console.error('Error al insertar:', err);
          return res.status(500).json({ error: err.message });
        }
        console.log('Vendedor insertado, ID:', result.insertId); 
        res.json({ message: 'Vendedor creado', id: result.insertId });
      }
    );
  });
  

router.put('/:id', (req, res) => {
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body;
    const { id } = req.params;
    connection.query(
        'UPDATE Vendedor SET nombre=?, apellido=?, direccion=?, edad=?, profesion=?, estadocivil=? WHERE idVendedor=?',
        [nombre, apellido, direccion, edad, profesion, estadocivil, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Vendedor actualizado' });
        }
    );
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM Vendedor WHERE idVendedor=?',
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if(result.affectedRows === 0){
              return res.status(404).json({ message: 'Vendedor no encontrado' });
            }
            res.json({ message: 'Vendedor eliminado' });
        }
    );
});


module.exports = router;
