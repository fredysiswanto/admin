import { findOtp } from '@/app/(utils)/helper';
import { TokenDB } from '@/app/lib/definitions';
import { authGmail } from '@/app/lib/gmail';
import { Base64 } from 'js-base64';
import { NextResponse } from 'next/server';

interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPayload {
  parts: EmailPart[];
  headers: EmailHeader[];
}

interface EmailPart {
  mimeType: string;
  body: {
    data: string;
  };
}

interface EmailData {
  idEmail: string;
  date: string;
  to: string;
  from: string;
  subject: string;
  otp: string;
  body: string;
}

const userId: string = `me`;

async function DetailEmail(id: string) {
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

  const { payload }: { payload: EmailPayload } = await res.json();
  const plainTextPart: any = payload.parts.find(
    (part: EmailPart) => part.mimeType === 'text/plain',
  );

  const raw = plainTextPart.body.data;
  if (raw) {
    const otp: any = findOtp(raw);
    const body = Base64.decode(raw);

    const data: EmailData = {
      idEmail: id,
      date: payload.headers.find((header) => header.name === 'Date')!.value,
      to: payload.headers.find((header) => header.name === 'Delivered-To')!
        .value,
      from: payload.headers.find((header) => header.name === 'From')!.value,
      subject: payload.headers.find((header) => header.name === 'Subject')!
        .value,
      otp,
      body,
    };
    return data;
  }
}

export async function GET(
  request: Request,
  { params }: any,
): Promise<Response> {
  const id: string = params.id;
  const searchParams = new URL(request.url).searchParams;
  const query: string | null = searchParams.get('otp');
  const data: any = await DetailEmail(id);

  if (query === 'true') {
    return NextResponse.json({ data: { otp: data.otp } });
  } else {
    return NextResponse.json({ data });
  }
}
