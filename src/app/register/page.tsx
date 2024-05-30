"use client";
// import api from '@/services/api';

import { useState } from "react";
import Link from 'next/link';
import { ArrowLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import { Montserrat, Alata } from "next/font/google";
import Pulsating from "@/components/pulsing";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FakeLoading from "@/components/fakeLoading";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = passwordRegex.test(inputPassword);
    setIsValidPassword(isValid);
  };

  const handlePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPasswordConfirmation = e.target.value;
    setPasswordConfirmation(inputPasswordConfirmation);
    setIsValidPasswordConfirmation(inputPasswordConfirmation === password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const handleRegister = async () => {
    if (!isValidEmail) {
      toast.error("Email inválido.");
      return;
    }
    if (!isValidPassword) {
      if (password.length < 8) {
        toast.error('A senha deve ter pelo menos 8 caracteres.');
        return;
      } else if (!/[A-Z]/.test(password)) {
        toast.error('A senha deve conter pelo menos uma letra maiúscula.');
        return;
      } else if (!/\d/.test(password)) {
        toast.error('A senha deve conter pelo menos um número.');
        return;
      }
    }
    if (!isValidPasswordConfirmation) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);
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
        toast.error('Erro ao registrar. Verifique seus dados e tente novamente.');
        setIsLoading(false); // Hide loading modal
        return;
      }

      const data = await response.json();
      console.log("data:", data);
      console.log('Registro realizado com sucesso:', data);
      localStorage.setItem('access_token', data.access_token);
      console.log('access_token:', data.access_token);
      localStorage.setItem('name', name);
      console.log('name:', name);
      localStorage.setItem('email', data.email);

      setTimeout(() => {
        setIsLoading(false); 
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      console.error('Erro ao registrar:', error);
      toast.error('Erro ao registrar. Verifique seus dados e tente novamente.');
      setError('Erro ao registrar. Verifique seus dados e tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-custom-bg bg-cover bg-center h-screen flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <LoadingModal isLoading={isLoading} />
      <div className="w-[56rem] h-[32rem] rounded-lg backdrop-blur-md shadow-3xl flex flex-col">
        <div className="flex pt-4 items-center pl-4">
          <Link href="/">
            <div className="flex justify-start backdrop-blur-md shadow-3xl bg-white/30 p-2 rounded-2xl hover:bg-orange-custom duration-500 duration-500">
              <button><ArrowLeft size={32} weight="thin" /></button>
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
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] ${alata.className} focus:outline-none focus:ring transition duration-300 border ${isValidEmail ? 'border-green-500' : 'border-red-500'
                }`}
              placeholder="Digite seu melhor email"
              value={email}
              onChange={handleEmail}
              style={{
                boxShadow: 'none',
              }}
            />
          </div>
          <div className="pt-4 flex w-full justify-center ">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] pr-10 ${alata.className} focus:outline-none focus:ring transition duration-300 border ${isValidPassword ? 'border-green-500' : 'border-red-500'
                }`}
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePassword}
              style={{
                boxShadow: 'none',
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-[28%] pt-[5.6rem] cursor-pointer" onClick={toggleShowPassword}>
              {showPassword ? <EyeSlash size={24} weight="light" /> : <Eye size={24} weight="light" color="violet-custom"/>}
            </div>
          </div>

          <div className="pt-4 flex w-full justify-center">
            <input
              type="password"
              className={`p-2 rounded-lg bg-transparent backdrop-blur-lg bg-white/60 w-[50%] h-[50px] ${alata.className} border ${isValidPasswordConfirmation ? 'border-green-500' : 'border-red-500'
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
