import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 4000,
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
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}