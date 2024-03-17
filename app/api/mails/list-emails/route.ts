import { TokenDB } from '@/app/lib/definitions';
import { authGmail } from '@/app/lib/gmail';
import { NextResponse } from 'next/server';

const userId = `me`;
export async function GET() {
  const { access_token } = (await authGmail()) as TokenDB;

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?maxResults=5&labelIds=Label_1763624457455248516`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json',
      },
    },
  );

  const data = await res.json();
  return NextResponse.json({ data });
}
