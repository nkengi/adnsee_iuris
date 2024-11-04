import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Process',
};
 
export default async function Process() {  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Process Admin...
      </h1>
      <h2>Créer un processus</h2>
      <p>option de visibilité freemium: perso, pro, fusion</p>
      <p>option de visibilité premium: perso, pro, fusion</p>
    </main>
  );
}