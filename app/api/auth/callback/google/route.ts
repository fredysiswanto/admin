import { getNewToken } from '@/app/lib/gmail';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('code');
  const data = { refreshToken: query };
  if (query !== null) {
    const data = await getNewToken(query);
    return NextResponse.json({ data });
  }
  return NextResponse.json({ data });
}
