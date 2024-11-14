import { Metadata } from 'next';
import QuizList from "@/components/UI/Quiz/QuizList";
import QuizPlay from "@/components/UI/Quiz/QuizPlay";
import QuizManagement from "@/components/UI/Quiz/QuizManagement";
 
export const metadata: Metadata = {
  title: 'Process',
};
 
export default async function Process() {  
  return (
    <main>
      <QuizList/>
      {/* <QuizPlay/> */}
      <QuizManagement/>
    </main>
  );
}