import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Process',
};
 
export default async function Process() {  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Process Admin, Perso et Pro User a configurer en fonction de l'objet User ,type de compte...
      </h1>
    </main>
  );
}