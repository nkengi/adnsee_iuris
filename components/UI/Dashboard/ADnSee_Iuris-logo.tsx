import Image from "next/image";
// import { open_sans } from '@/app/ui/fonts';

export default function ADnSee_Iuris_Logo() {
  return (
    <div
      className={` flex flex-row items-center leading-none text-white mb-1`}
    >
      <Image
        src="/svg/logo-tmp.svg"
        alt="ADnSee Iuris logo"
        width={40}
        height={40} />
        
      <p className="text-[20px] ml-4">ADnSee Iuris</p>
    </div>
  );
}
