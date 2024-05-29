"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import User from '../../../public/images/userplus.png';
import { Montserrat } from "next/font/google";
import Link from 'next/link';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300"],
});

const montserratbold = Montserrat({
    subsets: ["latin"],
    weight: ["500"],
});

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem('name');
            localStorage.setItem('name', storedName || '');
            setName(storedName || '');
        }
    }, []);

    const handleLogout = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            const email = localStorage.getItem('email');
            localStorage.setItem('name', name);
            console.log('Valor de name:', name);
            console.log('Access Token:', access_token);
            console.log('Email:', email);

            const response = await fetch('https://teste.reobote.tec.br/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify({ email, name }),
            });

            if (response.ok) {
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('access_token');
                window.location.href = '/';
            } else {
                console.error('Falha ao fazer logout');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className="grid grid-col bg-custom-bg bg-cover bg-center h-screen justify-center pt-4">
            <div className='flex flex-col justify-center'>
                <header className="flex backdrop-blur-md shadow-2xl bg-white/50 w-[50rem] h-[4rem] rounded-full items-center justify-between">
                    <div className='pl-4 justify-items-start flex items-center space-x-3'>
                        <button>
                            <Image
                                src={User}
                                width={40}
                                height={40}
                                alt="User"
                            />
                        </button>
                        <span className={`text-violet-custom ${montserrat.className}`}>Bem vindo, {name}</span>
                    </div>
                    <div className='rounded-full bg-violet-custom mr-8 px-6 hover:bg-red-custom duration-500 transform hover:scale-110'>
                        <button onClick={openModal}>
                            <span className={`text-white hover:text-white duration-500 ${montserrat.className}`}>Sair</span>
                        </button>
                    </div>
                </header>
                <div className='m-auto mt-14 items-center rounded-lg border-none backdrop-blur-lg bg-white/50 p-12'>
                    <h1 className={`text-[25pt]  ${montserratbold.className} pb-4`}>Usuários Cadastrados</h1>
                        <div className='rounded-lg backdrop-blur-lg bg-violet-custom/50 p-4 hover:bg-white/20 duration-500 transform hover:scale-110 shadow-2xl'>Ragnar</div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="backdrop-blur-md shadow-2xl bg-white/50 p-8 rounded-lg shadow-lg">
                        <h2 className={`text-lg mb-4 ${montserratbold.className}`}>Tem certeza que deseja sair?</h2>
                        <div className={`flex justify-center space-x-4 ${montserrat.className}`}>
                            <button
                                className="bg-red-500 hover:bg-red-custom duration-500 transform hover:scale-110 text-white px-4 py-2 rounded"
                                onClick={handleLogout}
                            >
                                <span>Sair</span>
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-white duration-500 px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
