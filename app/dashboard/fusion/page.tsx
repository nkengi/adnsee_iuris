import { Metadata } from 'next';
import QuizList from "@/components/UI/Quiz/QuizList";
import QuizTest from "@/components/UI/Quiz/QuizTest";
 
export const metadata: Metadata = {
  title: 'Dashboard Fusion',
};

export default function DashFusion(){
      
    return (
        <>
            <h1>Dashboard Fusion</h1>
            <QuizList />
            {/* <QuizTest /> */}
        </>
    );
}