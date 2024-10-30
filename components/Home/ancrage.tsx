"use client"; // Obligatoire pour utiliser des hooks côté client
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Ancrage() {
  // Références pour les sections
  const personnelSectionRef = useRef<HTMLDivElement>(null);
  const professionnelSectionRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fonction pour gérer le scroll
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionRef: React.RefObject<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleRedirect = (path: string) => {
    //https://nextjs.org/docs/messages/react-hydration-error
    if (isClient) window.location.href = path;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        {/* Nouvelle div pour centrer le contenu */}
        <div className="flex flex-col items-center min-h-screen text-left w-full">
          <h1 className="text-4xl font-bold text-white h-[38px] w-[180px] mb-4">Nkengi</h1>

          <ol className="list-inside list-decimal text-sm mb-4 font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Choose your account type{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                personel/professional
              </code>
              .
            </li>
            <li>Get started and free yourself step by step.</li>
          </ol>

          {/* Lien vers les sections Personel et Professionnel */}
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="#Personel"
              onClick={(e) => handleScrollToSection(e, personnelSectionRef)}
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Personel
            </a>

            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="#Professionel"
              onClick={(e) => handleScrollToSection(e, professionnelSectionRef)}
              rel="noopener noreferrer"
            >
              Professionel
            </a>
          </div>
        </div>

        {/* Section Personel */}
        <section
          id="Personel"
          ref={personnelSectionRef}
          className="p-8 bg-gray-100 w-full text-background rounded-lg"
        >
          <h2 className="text-2xl font-bold">Section Personel</h2>
          <p>Bienvenue dans la section Personel.</p>
          <button
            className="mt-4 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] h-10 px-4"
            onClick={() => window.location.href = '/signup?type=personel'}
          >
            Get started
          </button>
        </section>

        {/* Section Professionel */}
        <section
          id="Professionel"
          ref={professionnelSectionRef}
          className="p-8 bg-gray-800 w-full text-white rounded-lg"
        >
          <h2 className="text-2xl font-bold">Section Professionel</h2>
          <p>Bienvenue dans la section Professionel.</p>
          <button
            className="mt-4 rounded-full bg-white text-black hover:bg-gray-200 h-10 px-4"
            onClick={() => handleRedirect('/signup?type=professionel')}
          >
            Get started
          </button>
        </section>

        {/* Section Comparatif Plans */}
        <section
          id="ComparatifPlans"
          className="p-8 bg-gray-50 w-full rounded-lg flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-background">Comparatif des Plans</h2>
          <p className="text-center mb-8 text-background">
            Découvrez les différences entre nos plans Personel et Professionel et choisissez celui qui vous convient le mieux.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            {/* Section Personel */}
            <div className="flex-1 p-4 bg-gray-100 text-background rounded-lg">
              <h2 className="text-2xl font-bold">Section Personel</h2>
              <p>Bienvenue dans la section Personel.</p>
              <button
                className="mt-4 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] h-10 px-4"
                onClick={() => handleRedirect('/signup?type=personel')}
              >
                Get started
              </button>
            </div>

            {/* Section Professionel */}
            <div className="flex-1 p-4 bg-gray-800 text-white rounded-lg">
              <h2 className="text-2xl font-bold">Section Professionel</h2>
              <p>Bienvenue dans la section Professionel.</p>
              <button
                className="mt-4 rounded-full bg-white text-black hover:bg-gray-200 h-10 px-4"
                onClick={() => handleRedirect('/signup?type=professionel')}
              >
                Get started
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer placé après les sections */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nkengi.org →
        </a>
      </footer>
    </div>
  );
}
