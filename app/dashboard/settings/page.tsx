import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Settings',
};
 
export default async function Settings() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Settings Admin, Perso et Pro User a configurer en fonction de l'objet User ,type de compte...
      </h1>
    </main>
  );
}