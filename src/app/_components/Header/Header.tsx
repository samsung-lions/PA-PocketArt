import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div className="bg-black p-5 w-full flex ">
      <Link href="/">
        <Image src="/logo.png" alt="로고" width={70} height={50} />
      </Link>
    </div>
  );
}

export default Header;
