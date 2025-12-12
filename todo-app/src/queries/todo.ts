const QUERY_TODO = {
  ERASE: 'DROP TABLE IF EXISTS todo;',
  CREATE: `CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`,
  INSERT: 'INSERT INTO todo (task) VALUES ($1) RETURNING *;',
  SELECT: 'SELECT task FROM todo;',
};

export { QUERY_TODO };
