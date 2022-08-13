const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "Mehru.123",
    database: "node_database",
    host: "localhost",
    port: 5432
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM node ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM node WHERE id = $1',
   [id],
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { firstname, lastname, email, number,gender , password } = request.body

  pool.query('INSERT INTO node (firstname, lastname, email, number,gender , password) VALUES ($1, $2, $3 ,$4, $5, $6)',
   [firstname, lastname, email, number,gender , password],
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email, number,gender , password} = request.body;

  pool.query(
    'UPDATE node SET firstname = $1, lastname=$2, email=$3, number=$4,gender=$5 , password=$6 WHERE id = $7',
    [firstname, lastname, email, id, number,gender , password],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM node WHERE id = $1',
   [id],
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};