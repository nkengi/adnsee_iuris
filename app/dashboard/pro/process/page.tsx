import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Process',
};
 
export default async function Process() {  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Process pro...
      </h1>
    </main>
  );
}