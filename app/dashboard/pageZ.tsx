import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};

export const dynamic = "force-dynamic";
 
export default async function Dashboard() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Dashboard - Perso - Pro - Fusion for User & SuperUser
      </h1>
    </main>
  );
}