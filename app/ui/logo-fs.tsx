import Image from 'next/image';
import Link from 'next/link';

export default function LogoFs() {
  return (
    <div>
      <Link href={'/dashboard'}>
        <Image
          className="max-md:hidden"
          src="/images/logo/logo_kotak.png"
          width={100}
          height={100}
          alt="logo"
        />
        <Image
          className="md:hidden"
          src="/images/logo/logo_kotak.png"
          width={50}
          height={50}
          alt="logo"
        />
      </Link>
    </div>
  );
}
