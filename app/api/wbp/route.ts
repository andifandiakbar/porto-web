import { NextResponse } from 'next/server';

// Data simulasi manual
const dataWBP = [
  { id: 1, nama: "Ahmad Zulkarnaen", nik: "320102030", kasus: "Narkotika", status: "Narapidana", blok_kamar: "A-04" },
  { id: 2, nama: "Cahyadi", nik: "304050002", kasus: "Pencurian", status: "Tahanan", blok_kamar: "B-02" },
  { id: 3, nama: "Andi Wijaya", nik: "32010203040", kasus: "Penggelapan", status: "Narapidana", blok_kamar: "C-01" },
  { id: 4, nama: "Fandi", nik: "355334", kasus: "Mencuri", status: "Narapidana", blok_kamar: "C-02" },
  { id: 5, nama: "Syiar", nik: "3939484", kasus: "Maling Sendal", status: "Narapidana", blok_kamar: "B-01" }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  // Filter data berdasarkan input pencarian
  const filteredData = dataWBP.filter(item => 
    item.nama.toLowerCase().includes(search) || 
    item.nik.includes(search)
  );

  return NextResponse.json(filteredData);
}