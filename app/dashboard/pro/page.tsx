import { Metadata } from 'next';
import QuizList from "@/components/UI/Quiz/QuizList";
import QuizTest from "@/components/UI/Quiz/QuizTest";
 
export const metadata: Metadata = {
  title: 'Dashboard Pro',
};
 
export default async function DashPro() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Dashboard Pro...
      </h1>
      <QuizList />
      {/* <QuizTest /> */}
    </main>
  );
}