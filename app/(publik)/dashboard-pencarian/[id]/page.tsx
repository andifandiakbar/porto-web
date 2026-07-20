"use client";

import React, { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import FormKunjungan from './components/FormKunjungan';
import FormTitipan from './components/FormTitipan';

function DetailContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const layanan = searchParams.get('layanan');

  if (layanan === 'titipan') {
    return <FormTitipan id={id} />;
  }

  return <FormKunjungan id={id} />;
}

export default function DetailPencarian({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontSize: '18px' }}>Memuat Halaman...</div>}>
      <DetailContent id={id} />
    </Suspense>
  );
}