"use client";
// import api from '@/services/api';

import { useState } from "react";
import Link from 'next/link';
import {ArrowLeft } from "@phosphor-icons/react";
import {Montserrat, Alata} from "next/font/google";
import Pulsating from "@/components/pulsing";
import styled from "styled-components";
import router from "next/router";
// import fetchApi from '@/services/api';

const alata = Alata({
    subsets: ["latin"],
    weight: ["400"],
  });

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300"], 
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


export default function Register() {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] = useState(false);
  const [error, setError] = useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(inputPassword));
  };
  
  const handlePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const inputPasswordConfirmation = e.target.value;
    setPasswordConfirmation(inputPasswordConfirmation);
    setIsValidPasswordConfirmation(inputPasswordConfirmation === password);
  };
  
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);
  };

const handleRegister = async () => {
  try {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('https://teste.reobote.tec.br/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        persistent: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar. Verifique seus dados e tente novamente.');
    }
    
    const data = await response.json();
    console.log("data:", data);
    console.log('Registro realizado com sucesso:', data);
    localStorage.setItem('access_token', data.access_token);
    console.log('access_token:', data.access_token)
    localStorage.setItem('name', data.name);
    console.log('name:', name)
    localStorage.setItem('email', data.email);
    window.location.href = '/';

  } catch (error) {
    console.error('Erro ao registrar:', error);
    setError('Erro ao registrar. Verifique seus dados e tente novamente.');
  }
};

    
  return (
    
    <main className="bg-custom-bg bg-cover bg-center h-screen flex items-center justify-center">
          <div className="w-[56rem] h-[32rem] rounded-lg backdrop-blur-md shadow-3xl flex flex-col">
            <div className="flex pt-4 items-center pl-4">
            <Link href="/">
              <div className="flex justify-start backdrop-blur-md shadow-3xl bg-white/30 p-2 rounded-2xl hover:bg-orange-custom duration-500 duration-500">
                <button><ArrowLeft size={32} weight="thin"/></button>
              </div>
            </Link>
          </div>
          <h1 className={`text-[25pt] m-auto ${montserrat.className}`}>Criar conta</h1>
          <div className="flex flex-col justify-center items-center pt-6">
            <div className="flex w-full justify-center pb-4">
            <input
            type="text"
            className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/30 w-[50%] h-[50px] ${alata.className} focus:outline-none focus:ring transition duration-300 border`}
            placeholder="Digite seu nome"
            value={name}
            onChange={handleName}
            style={{
              boxShadow: 'none',
            }}
          />
            </div>
            <div className="flex w-full justify-center">
            <input
              type="email"
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] ${alata.className} focus:outline-none focus:ring transition duration-300 border ${
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
           <div className="pt-4 flex w-full justify-center">
            <input
              type="password"
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] ${alata.className} border ${
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

           <div className="pt-4 flex w-full justify-center">
           <input
              type="password"
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] ${alata.className} border ${
                isValidPasswordConfirmation ? 'border-green-500' : 'border-red-500'
              }`}
              placeholder="Confirme sua senha"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmation}
              style={{
                outline: 'none',
                boxShadow: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            />
           </div>
             
          </div> 
          <div className="pt-16 m-auto pb-4">
            <button onClick={handleRegister}>
              <Pulsating visible={visible} color="#FFD4E4">
              <StyledDiv color="bg-orange-custom" className="rounded-3xl bg-blue-custom px-8 py-2 hover:bg-orange-custom duration-500 transform hover:scale-110">Criar</StyledDiv>
              </Pulsating>  
            </button>
          
          </div>
        </div>
     
    </main>
  );
  }
