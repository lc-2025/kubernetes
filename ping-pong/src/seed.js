import { Pool } from 'pg';
import dotenv from 'dotenv';
import { CREATE, ERASE, INSERT } from './queries/ping-pong';
import { ERROR, SEED, TRANSACTION } from './utils/tokens';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const { CREATION, DONE, START } = SEED;

/**
 * @description DB seeding helper
 * @author Luca Cattide
 * @date 11/12/2025
 */
async function seed() {
  const client = await pool.connect();
  const { BEGIN, COMMIT, ROLLBACK } = TRANSACTION;

  try {
    console.log(START);

    await client.query(BEGIN);

    console.log(CREATION);

    await client.query(`${ERASE} ${CREATE}`);

    console.log(SEED.INSERT);

    await client.query(INSERT, [0]);
    await client.query(COMMIT);

    console.log(DONE);
  } catch (error) {
    await client.query(ROLLBACK);

    console.error(ERROR.SEED, error);

    throw error;
  } finally {
    client.release();
  }
}

seed()
  .then(() => pool.end())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
