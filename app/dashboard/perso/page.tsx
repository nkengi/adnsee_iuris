import { Metadata } from 'next';
import QuizList from "@/components/UI/Quiz/QuizList";
import QuizTest from "@/components/UI/Quiz/QuizTest";
 
export const metadata: Metadata = {
  title: 'Dashboard Perso',
};

export default function DashPerso(){
    return (
        <>
            <h1>Dashboard Perso</h1>
            <QuizList />
            {/* <QuizTest /> */}
        </>
    );
}