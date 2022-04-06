import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";

interface Slip {
  id: number;
  advice: string;
}

interface Advice {
  slip: Slip;
}

interface AdviceApiResponse {
  slip: Slip;
  data: Advice;
}

async function getAdvice() {
  try {
    const { data } = await axios.get<AdviceApiResponse>(
      "https://api.adviceslip.com/advice", {
        headers: {
          'Access-Control-Allow-Origin': 'https://advice-generator-02.vercel.app',
          'Cache-Control': 'no-cache, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

const Home: NextPage = () => {
  const [data, setData] = useState<Slip>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    getAdvice().then((data: any) => setData(data.slip));
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    getAdvice().then((data: any) => {
      setData(data.slip);
      setIsLoading(false);
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-dark-blue">
      <Head>
        <title>Advice Generator</title>
        <meta name="description" content="advice generator" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="w-[343px] container rounded-lg pt-12 px-6 bg-dark-grayish-blue text-center font-manrope">
        <h1 className="text-neon-green mb-4">
          {data ? `Advice #${data?.id}` : null}
        </h1>
        <p className="text-2xl text-light-cyan leading-relaxed mb-4">
          {data?.advice}
        </p>
        <div className="flex justify-center">
          <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
              <g transform="translate(138)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        </div>
        <button
          onClick={handleClick}
          className={`w-16 h-16 container mx-auto flex justify-center items-center top-8 rounded-full relative bg-neon-green ${
            isLoading ? "animate-spin" : ""
          } hover:shadow-[0_0_30px_5px_rgba(82,255,168,1)]`}
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
              fill="#202733"
            />
          </svg>
        </button>
      </main>
    </div>
  );
};

export default Home;
