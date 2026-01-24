import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  // Data simulasi lengkap
  const dataWBP = [
    { 
      nama: "AHMAD ZULKARNAEN", 
      nik: "3201020304050001", 
      kasus: "Narkotika", 
      status: "Narapidana", 
      blok_kamar: "A-04" 
    },
    { 
      nama: "CAHYADI", 
      nik: "3201020304050002", 
      kasus: "Pencurian", 
      status: "Tahanan", 
      blok_kamar: "B-02" 
    },
    { 
      nama: "ANDI WIJAYA", 
      nik: "3201020304050003", 
      kasus: "Penggelapan", 
      status: "Narapidana", 
      blok_kamar: "C-01" 
    },
    { 
      nama: "SYIAR", 
      nik: "3201020304050004", 
      kasus: "Pencurian", 
      status: "Narapidana", 
      blok_kamar: "B-01" 
    }
  ];

  const filteredData = dataWBP.filter(item => 
    item.nama.toLowerCase().includes(search) || 
    item.nik.includes(search)
  );

  return NextResponse.json(filteredData);
}