import { NextResponse } from 'next/server';
import main from '@/app/lib/gmail';

export async function GET() {
  const data = await main();

  return NextResponse.json({ data });
}
