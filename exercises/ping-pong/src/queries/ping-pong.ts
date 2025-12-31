const CREATE = `CREATE TABLE ping_pong (
  id SERIAL PRIMARY KEY,
  count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;
const ERASE = `DROP TABLE IF EXISTS ping_pong;`;
const GET = `SELECT count FROM ping_pong LIMIT 1`;
const INSERT = `INSERT INTO ping_pong (count) VALUES ($1)`;
const UPDATE = `UPDATE ping_pong SET count = count + 1 WHERE id = $1`;

export { CREATE, ERASE, GET, INSERT, UPDATE };
