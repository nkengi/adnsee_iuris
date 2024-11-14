import { Metadata } from 'next';
import QuizTest from "@/components/UI/Quiz/QuizTest";
import QuizList from "@/components/UI/Quiz/QuizList";
 
export const metadata: Metadata = {
  title: 'Dashboard Admin',
};

export default function DashAdmin(){
    return (
        <>
            <h1>Dashboard Admin</h1>
            <QuizList/>
            <QuizTest/>
        </>
    );
}