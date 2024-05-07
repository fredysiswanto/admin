'use client';
import { getOTPLatest } from '@/app/lib/gmail';

export default function LatestOtp() {
  let otp;

  return (
    <div>
      <div>
        <p>Data OTP : {otp}</p>
        <button
          onClick={() => {
            getOTPLatest;
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
