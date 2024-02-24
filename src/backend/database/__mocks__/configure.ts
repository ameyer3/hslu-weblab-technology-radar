import { newDb } from 'pg-mem'
import fs from 'fs'

const db = newDb();
db.public.none(fs.readFileSync('database/schema.sql', 'utf8'));
const { Pool } = db.adapters.createPg();
export const pool = new Pool()
