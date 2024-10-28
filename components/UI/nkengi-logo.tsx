import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { open_sans } from '@/app/ui/fonts';

export default function NkengiLogo() {
  return (
    <div
      className={`${open_sans.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Nkengi</p>
    </div>
  );
}
