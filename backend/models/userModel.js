import { pool } from '../db/index.js';

export const createUser = async (name, email, employee_id, hashedPassword, role = 'employee') => {
  const result = await pool.query(
    'INSERT INTO users (name, email, employee_id, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, employee_id, hashedPassword, role]
  );
  return result.rows[0];
};

export const findUserByEmailOrId = async (identifier) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 OR employee_id = $1',
    [identifier]
  );
  return result.rows[0];
};