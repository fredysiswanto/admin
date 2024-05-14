'use client';

import { Button } from '@/app/ui/button';
import { lusitana } from '@/app/ui/fonts';
import { Suspense, useState } from 'react';
const url = process.env.NEXT_PUBLIC_BASEBASE_URL;
// const url = 'http://localhost:3000/';
// console.log(url, 'url');

export default function EmailPages() {
  const [otp, setOtp] = useState('');
  async function handleClick() {
    const res = await fetch(`${url}/api/mails/latest?otp=true`, {
      next: { revalidate: 0 },
    });
    const { data } = await res.json();
    ('handle click terpanggil');
    setOtp(data.otp);
    return data.otp;
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Emails
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex">
            {/* <div className="h-5 w-5 text-gray-700" /> */}
            <h3 className="text-md ml-2 font-medium">Last OTP :</h3>
          </div>
          <p
            className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            {otp}
          </p>
          <Button className="ml-2" onClick={handleClick}>
            Refresh
          </Button>
          <span className="font-small text-sm">
            please wait 5-15s after click request otp via email{' '}
          </span>
        </div>
      </div>
    </main>
  );
}
