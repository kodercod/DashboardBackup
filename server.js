const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do pool do NEON Postgres
const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-shrill-sun-a5l216gm.us-east-2.aws.neon.tech',
  database: 'neondb',
  password: 'A4a3MBSgjkRx',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testando a conexão com o banco de dados ao iniciar o servidor
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
    release(); // Libera o cliente de volta para o pool
  }
});

// Endpoint para buscar dados
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT cnpj, empresa, data_backup, status FROM backup_logs');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
