import Image from "next/image";
// import { open_sans } from '@/app/ui/fonts';

export default function NkengiLogo() {
  return (
    <div
      className={` flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/svg/logo-tmp.svg"
        alt="Nkengi logo"
        width={40}
        height={40} />
        
      <p className="text-[44px]">Nkengi</p>
    </div>
  );
}
