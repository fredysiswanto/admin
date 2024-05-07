import { InboxIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '../button';
import { getOTPLatest } from '@/app/lib/gmail';

export default async function CartOTP() {
  let otp = await getOTPLatest();
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <InboxIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">OTP Terakir</h3>
          </div>
          <p
            className={`${lusitana.className}
          truncate rounded-xl bg-white  text-center text-2xl`}
          >
            {otp}
          </p>
          <div className="flex gap-2">
            <Button>Refresh</Button>
            <Button>Copy</Button>
          </div>
        </div>
      </div>
    </>
  );
}
