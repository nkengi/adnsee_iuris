import { Metadata } from 'next';
import QuizList from "@/components/UI/Quiz/QuizList";
import QuizTest from "@/components/UI/Quiz/QuizTest";
// import { useEffect, useState } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard Perso',
};

export default function DashPerso() {
    // const [quizSummary, setQuizSummary] = useState({ total: 0, themes: [], progress: {} });

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch(`/api/quiz/summary?accountType=${accountType}&userId=${userId}`);
    //         const data = await res.json();
    //         setQuizSummary(data);
    //     }
    //     fetchData();
    // }, [userId, accountType]);

    // return (
    //     <>
    //         <h1>Dashboard Perso</h1>
    //         <QuizList />
    //         {/* <QuizTest /> */}
    //         <p>Total Quizzes: {quizSummary.total}</p>
    //         <div>
    //             <h2>Themes</h2>
    //             {quizSummary.themes.map(theme => (
    //                 <div key={theme.id}>
    //                     <h3>{theme.name}</h3>
    //                     <p>Quizzes: {theme.quizCount}</p>
    //                 </div>
    //             ))}
    //         </div>
    //         <div>
    //             <h2>Your Progress</h2>
    //             <p>Started: {quizSummary.progress.started}</p>
    //             <p>In Progress: {quizSummary.progress.inProgress}</p>
    //             <p>Completed: {quizSummary.progress.completed}</p>
    //         </div>
    //     </>
    // );
    return (
        <>
            <h1>Dashboard perso welcom</h1>
        </>
    );
}