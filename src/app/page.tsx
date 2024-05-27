"use client";

import {Montserrat, Urbanist, Alata} from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import Pulsating from "@/components/pulsing";
import styled from "styled-components";
import { useState } from "react";

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

export default function Home() {

  const [visible, setVisible] = useState(true);

  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(inputPassword));
  };

  return (
    <main className="bg-custom-bg bg-cover bg-center h-screen flex items-center justify-center">

      <div className="w-[56rem] h-[32rem] rounded-lg backdrop-blur-md shadow-3xl flex">

        <div className="backdrop-blur-lg bg-white/30 rounded-l-lg w-[50%] text-center">
          <div className="flex flex-col justify-center">
            <h1 className={`text-[25pt] pt-24 ${montserrat.className}`}>Bem Vindo</h1>
            <h2 className={`text-[25pt] pt-20 ${urbanist.className} pr-[5rem]`}>
              <span className="inline-block half-border">Novo Login</span>
            </h2>
            <Link href="/register">
            <div className="pt-20">
            <Pulsating visible={visible} color="#FFD4E4">
              <button className="transform transition-transform duration-500 hover:scale-110">
               <StyledDiv color="#8b269e" className="hover:bg-violet-800 duration-500">Criar conta</StyledDiv>
              </button>
            </Pulsating>
            </div>
            </Link>
          </div>
         
        </div>

        <div className="flex flex-col backdrop-blur-lg rounded-lg w-full justify-center m-auto relative">
          <span className={`text-[25pt] m-auto ${montserrat.className}`}>Faça Login</span>
          <div className="flex justify-center items-center pb-2 pt-16">
          <input
            type="email"
            className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/30 w-[50%] h-[50px] ${alata.className} focus:outline-none focus:ring transition duration-300 border ${
              isValidEmail ? 'border-green-500' : 'border-red-500'
            }`}
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
              type="password"
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/30 w-[50%] h-[50px] ${alata.className} border ${
                isValidPassword ? 'border-green-500' : 'border-red-500'
              }`}
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
          </div>
          <div className="pt-16 m-auto">
            <button className="rounded-3xl bg-orange-custom px-8 py-2 hover:bg-orange-custom duration-500 transform hover:scale-110">Entrar</button>
          </div>
        </div>



      </div>
     
    </main>
  );
}
