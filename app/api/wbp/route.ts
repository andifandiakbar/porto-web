import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search') || '';
    const [rows] = await db.execute('SELECT * FROM wbp_data WHERE nama LIKE ?', [`%${query}%`]);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, nik, kasus } = body;

    const [result]: any = await db.execute(
      'INSERT INTO wbp_data (nama, nik, kasus, status, blok_kamar) VALUES (?, ?, ?, ?, ?)',
      [nama, nik, kasus, 'Narapidana', 'Belum Diatur']
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal simpan ke MySQL' }, { status: 500 });
  }
}