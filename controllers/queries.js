import pool from "../config/db.js"

// CREATE 
const addData = async (titulo, artista, tono) => {
    try {
        const consulta = {
            text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *',
            values: [titulo, artista, tono]
        }
        const response = await pool.query(consulta)
        console.log(response.rows)
        return response.rows
    } catch (error) {
        console.log(error.message)
    }
}

// READ
const getData = async () => {
    try {
        const consulta = {
            text: 'SELECT * FROM canciones'
        };
        const response = await pool.query(consulta)
        return response.rows
    } catch (error) {
        console.log(error.message)
    }
};

// UPDATE
const updateData = async (id, titulo, artista, tono) => {
    try {
        const consulta = {
            text: 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *',
            values: [titulo, artista, tono, id]
        }
        const response = await pool.query(consulta)
        return response.rows;
    } catch (error) {
        console.log(error.message)
    }
}

// DELETE
const deleteData = async (id) => {
    try {
        const consulta = { // 
            text: 'DELETE FROM canciones WHERE id = $1',
            values: [id]
        }
        const response = await pool.query(consulta)
        if (response.rowCount === 0) {
            throw new Error("Canción no encontrada")
        }
        return response.rows
    } catch (error) {
        console.log(error.message)
    }
}

export { getData, addData, updateData, deleteData }