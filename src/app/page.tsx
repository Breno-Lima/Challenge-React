"use client";

import { Montserrat, Urbanist, Alata } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import Pulsating from "@/components/pulsing";
import styled from "styled-components";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeSlash } from "@phosphor-icons/react";
import FakeLoading from "@/components/fakeLoading";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["800"],
});

const alata = Alata({
  subsets: ["latin"],
  weight: ["400"],
});

const StyledDiv = styled.div`
  align-items: center;
  background: ${({ color }) => color || "#ffb100"};
  border-radius: 32px;
  color: white;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 130px;
`;

interface LoadingModalProps {
  isLoading: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <FakeLoading />
    </div>
  );
};

export default function Home() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e: { target: { value: any; }; }) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Expressão regular para verificar se é um email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handlePassword = (e: { target: { value: any; }; }) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Expressão regular para verificar se é uma senha válida
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(inputPassword));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const access_token = localStorage.getItem('access_token');
    const response = await fetch("https://teste.reobote.tec.br/api/login", {
      body: JSON.stringify({
        email,
        password,
        persistent: true,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      method: "POST",
    });

    if (!response.ok) {
      toast.error('Credenciais incorretas');
      setIsLoading(false);
      return;
    }

    const responseText = await response.text();
    const data = JSON.parse(responseText);

    setLoginSuccess(true);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('email', email);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <main className="bg-custom-bg bg-cover bg-center h-screen flex items-center justify-center p-4">
      <ToastContainer />
      <LoadingModal isLoading={isLoading} />
      <div className="w-full max-w-lg lg:max-w-none lg:w-[56rem] lg:h-[32rem] rounded-lg backdrop-blur-md shadow-3xl flex flex-col lg:flex-row">
        <div className="backdrop-blur-lg bg-white/30 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none w-full lg:w-[50%] text-center p-6 lg:p-0 justify-center">
          <div className="flex flex-col justify-center h-full">
            <h1 className={`text-[25pt] pt-12 lg:pt-0 ${montserrat.className}`}>Bem Vindo</h1>
            <h2 className={`text-[25pt] pt-12 lg:pt-20 ${urbanist.className} lg:pr-[5rem]`}>
              <span className="inline-block half-border">Novo Login</span>
            </h2>
            <Link href="/register">
              <div className="pt-12 lg:pt-20">
                <Pulsating visible={visible} color="#FFD4E4">
                  <button className="transform transition-transform duration-500 hover:scale-110">
                    <StyledDiv color="#8b269e" className="hover:bg-violet-800 duration-500">Criar conta</StyledDiv>
                  </button>
                </Pulsating>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col backdrop-blur-lg bg-white/30 lg:bg-transparent rounded-b-lg lg:rounded-lg lg:rounded-l-none w-full justify-center lg:h-full m-auto relative p-6 lg:p-0">
          <span className={`text-[25pt] m-auto lg:pt-6 ${montserrat.className}`}>Faça Login</span>
          <div className="flex justify-center items-center pb-2 pt-8 lg:pt-0">
            <input
              type="email"
              className={`p-2  rounded-lg bg-transparent backdrop-blur-lg bg-white/30 w-full lg:w-[50%] h-[50px] ${alata.className} focus:outline-none focus:ring transition duration-300 border ${isValidEmail ? 'border-green-500' : 'border-red-500'}`}
              placeholder="Digite seu melhor email"
              value={email}
              onChange={handleEmail}
              style={{
                boxShadow: 'none',
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/30 w-full lg:w-[50%] h-[50px] ${alata.className} border ${isValidPassword ? 'border-green-500' : 'border-red-500'}`}
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePassword}
              style={{
                outline: 'none',
                boxShadow: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-[15%] lg:pr-[28%] pt-[4.1rem] lg:pt-[5.5rem] cursor-pointer" >
              {showPassword ? <EyeSlash size={24} weight="light" color="gray" onClick={toggleShowPassword} /> : <Eye size={24} weight="light" color="violet-custom" onClick={toggleShowPassword} />}
            </div>
          </div>
          <div className="pt-8 lg:pt-0 m-auto">
            <button 
              onClick={handleLogin} 
              className="rounded-3xl bg-orange-custom px-8 py-2 hover:bg-orange-custom duration-500 transform hover:scale-110"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
