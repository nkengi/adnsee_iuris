import Link from 'next/link';
import NavLinks from '@/components/UI/Dashboard/nav-links-admin';
import NkengiLogo from './nkengi-logo';
import Image from 'next/image';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <NkengiLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form id="signout" name="SignOut" 
            action={async () => {
            'use server';
            // await signOut();
            // alert("Sign Out");
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            {/* <Image className="w-6"/> */}
            <Image
                  src="/svg/sign-out-alt-3.svg"
                  alt={`Sign Out icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
            <div className="hidden md:block text-black">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
