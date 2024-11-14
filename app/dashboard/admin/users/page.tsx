import { Metadata } from 'next';
import UserAssignment from "@/components/UI/Admin/UserAssignment";
export const metadata: Metadata = {
  title: 'Users',
};

export default function Users(){
    return (
        <>
            <UserAssignment/>
        </>
    );
}