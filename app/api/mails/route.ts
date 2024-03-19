import { NextResponse } from 'next/server';
import { authGmail } from '@/app/lib/gmail';
import { TokenDB } from '@/app/lib/definitions';

// const userId: string = `${process.env.EMAIL}`;
const userId: string = `me`;

async function getDetailEmail(id: string, token: string): Promise<any> {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}?format=metadata&fields=payload.headers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );

  const data = await res.json();
  return data;
}

async function getListEmail(token: string): Promise<any> {
  const emailList: any[] = [];
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?maxResults=5&labelIds=Label_1763624457455248516`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  const data = await res.json();
  if (data.error) {
    return data;
  } else {
    const promises = data.messages.map(async (message: any) => {
      const { payload } = await getDetailEmail(message.id, token);
      const buffer = {
        idEmail: message.id,
        date: payload.headers.find((header: any) => header.name === 'Date')
          .value,
        to: payload.headers.find(
          (header: any) => header.name === 'Delivered-To',
        ).value,
        from: payload.headers.find((header: any) => header.name === 'From')
          .value,
        subject: payload.headers.find(
          (header: any) => header.name === 'Subject',
        ).value,
      };
      emailList.push(buffer);
    });

    await Promise.all(promises);
    emailList.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return emailList;
  }
}

export async function GET(request: any): Promise<Response> {
  const { access_token, refresh_token } = (await authGmail()) as TokenDB;
  if (!access_token) {
    return new NextResponse(JSON.stringify({ error: 'No token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const emailList = await getListEmail(access_token);

  return new NextResponse(JSON.stringify({ data: emailList }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
