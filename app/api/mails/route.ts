import { NextResponse } from 'next/server';
import { authGmail } from '@/app/lib/gmail';
import { TokenDB } from '@/app/lib/definitions';

// const userId: string = `${process.env.EMAIL}`;
const userId: string = `me`;
async function token() {
  const token = await authGmail();
  return token;
}

async function ListEmail(id: string): Promise<any> {
  const { access_token } = (await authGmail()) as TokenDB;
  const token = access_token;

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

export async function GET(request: any): Promise<Response> {
  const emailList: any[] = [];
  const { access_token } = (await authGmail()) as TokenDB;
  const token = access_token;
  console.log(token);

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?maxResults=5&labelIds=Label_1763624457455248516`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );

  console.log(res);

  const data = await res.json();
  const promises = data.messages.map(async (message: any) => {
    const { payload } = await ListEmail(message.id);
    const buffer = {
      idEmail: message.id,
      date: payload.headers.find((header: any) => header.name === 'Date').value,
      to: payload.headers.find((header: any) => header.name === 'Delivered-To')
        .value,
      from: payload.headers.find((header: any) => header.name === 'From').value,
      subject: payload.headers.find((header: any) => header.name === 'Subject')
        .value,
    };
    emailList.push(buffer);
  });

  await Promise.all(promises);
  emailList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return new NextResponse(JSON.stringify({ data: emailList }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
