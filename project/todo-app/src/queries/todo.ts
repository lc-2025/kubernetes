const QUERY_TODO = {
  ERASE: 'DROP TABLE IF EXISTS todo;',
  CREATE: `CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`,
  INSERT: 'INSERT INTO todo (task) VALUES ($1) RETURNING *;',
  SELECT: 'SELECT task, id, done FROM todo;',
  UPDATE: 'UPDATE todo SET done = true WHERE todo.id = $1;'
};

export { QUERY_TODO };
