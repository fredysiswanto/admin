import { findOtp } from '@/app/(utils)/helper';
import { TokenDB } from '@/app/lib/definitions';
import { authGmail } from '@/app/lib/gmail';
import { Base64 } from 'js-base64';
import { NextResponse } from 'next/server';

interface EmailData {
  idEmail: string;
  date: string;
  to: string;
  from: string;
  subject: string;
  otp: string;
  body: string;
}
interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPart {
  mimeType: string;
  body: {
    data: string;
  };
}

const userId: string = `me`;
async function GetIdEmail() {
  const { access_token } = (await authGmail()) as TokenDB;
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages?maxResults=1&labelIds=Label_1763624457455248516`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    },
  );
  const data = await res.json();
  const id = data.messages[0].id;
  return id;
}

async function DetailEmail() {
  const id = await GetIdEmail();
  const { access_token } = (await authGmail()) as TokenDB;
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}?fields=payload`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    },
  );
  const { payload } = await res.json();
  const plainTextPart: any = payload.parts.find(
    (part: EmailPart) => part.mimeType === 'text/plain',
  );

  const raw = plainTextPart.body.data;
  if (raw) {
    const otp: any = findOtp(raw);
    const body = Base64.decode(raw);

    const data: EmailData = {
      idEmail: id,
      date: payload.headers.find((header: any) => header.name === 'Date')!
        .value,
      to: payload.headers.find((header: any) => header.name === 'Delivered-To')!
        .value,
      from: payload.headers.find((header: any) => header.name === 'From')!
        .value,
      subject: payload.headers.find((header: any) => header.name === 'Subject')!
        .value,
      otp,
      body,
    };
    return data;
  }
}

export async function GET(request: Request): Promise<Response> {
  const searchParams = new URL(request.url).searchParams;
  const query: string | null = searchParams.get('otp');

  const data: any = await DetailEmail();
  if (query === 'true') {
    return NextResponse.json({ data: { otp: data.otp } });
  } else {
    return NextResponse.json({ data });
  }
}
