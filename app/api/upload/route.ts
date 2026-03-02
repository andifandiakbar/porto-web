import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(req: Request) {
  try {

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase Env Variables!");
      return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `wbp_photos/${fileName}`;

    const { data, error } = await supabase.storage
      .from('photos') 
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    console.error("Upload Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}