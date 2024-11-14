import { Metadata } from 'next';
import QuizPlay from "@/components/UI/Quiz/QuizPlay";
 
export const metadata: Metadata = {
  title: 'Process',
};
 
export default async function Process() {  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Process Fusion...
      </h1>
      <QuizPlay/>
    </main>
  );
}