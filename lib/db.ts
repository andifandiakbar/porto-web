try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true }
    });

    const [rows] = await connection.execute(
      'SELECT * FROM wbp_data WHERE nama LIKE ?',
      [`%${search}%`]
    );

    await connection.end();
    return NextResponse.json(rows);
  }