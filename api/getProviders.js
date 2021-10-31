import { join } from 'path';
import * as fs from 'fs';
import * as mysql from 'promise-mysql';
import * as dotenv from 'dotenv';
dotenv.config()

async function getProviders(req, res) {
    const { blockCode } = req.query;

    const db = await mysql.createConnection({
        user: process.env.USER, 
        password: process.env.PASSWORD, 
        database: process.env.DATABASE,
        host: process.env.HOST, 
        port: process.env.PORT,
        ssl: {
          sslmode: 'verify-full',
          ca: fs.readFileSync(join('.secrets', 'server-ca.pem')),
          key: fs.readFileSync(join('.secrets', 'client-key.pem')),
          cert: fs.readFileSync(join('.secrets', 'client-cert.pem')), 
        },
      });

    await db.connect();

    const providers = db.query(`SELECT * FROM availability WHERE blockcode = ${blockCode}`);
    res.status(200).send(providers)
}

export default getProviders;