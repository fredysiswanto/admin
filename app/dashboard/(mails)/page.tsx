import CartOTP from '@/app/ui/mails/card-otp';
import EmailTable from '@/app/ui/mails/table';
import { lusitana } from '@/app/ui/fonts';
import LatestOtp from '@/app/ui/mails/latest-otp';
export default async function EmailPages() {
  return (
    <div>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Emails</h1>
        </div>
      </div>
      <div className="lg:grid-cols-4">
        {/* <CartOTP></CartOTP> */}
        {/* <EmailTable></EmailTable> */}
        <LatestOtp></LatestOtp>
      </div>
    </div>
  );
}
