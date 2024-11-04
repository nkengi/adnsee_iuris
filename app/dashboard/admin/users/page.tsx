import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Users',
};

export default function Users(){
    return (
        <>
            <h1>Users admin</h1>
            <h2>Create Edit Suppr a specifique SuperUser</h2>
            <h2>Users listing</h2>
            <ol>
                <li>Info utilisateur</li>
                <li>listing facturation</li>
            </ol>
            
        </>
    );
}