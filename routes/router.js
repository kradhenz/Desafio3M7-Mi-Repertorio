import express from 'express';
import path from 'path';
import { addData, getData, updateData, deleteData } from '../controllers/queries.js';

const router = express.Router();
const __dirname = import.meta.dirname;

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body
    const result = await addData(titulo, artista, tono)
    res.json(result)
})

router.get('/canciones', async (req, res) => {
    const result = await getData()
    res.json(result)
})

router.put('/cancion/:id', async (req, res) => {
    const { id } = req.params
    const { titulo, artista, tono } = req.body
    const result = await updateData(id, titulo, artista, tono)
    res.send('Cancion actualizada')
})

router.delete('/cancion', async (req, res) => {
    const { id } = req.query
    const result = await deleteData(id)
    res.send('Cancion eliminada')
})

export default router;