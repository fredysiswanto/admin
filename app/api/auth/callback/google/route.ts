import { getNewToken } from '@/app/lib/gmail';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('code');
  const data = { refreshToken: query };
  if (query !== null) {
    const data = await getNewToken(query);
    if (data) {
      redirect('/dashboard');
    }
    return NextResponse.json({ data: { error: 'Error getting new token' } });
  }
  return NextResponse.json({ data: { error: 'No code provided' } });
}
