import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dashboard Pro',
};
 
export default async function DashPro() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Dashboard Pro...
      </h1>
    </main>
  );
}