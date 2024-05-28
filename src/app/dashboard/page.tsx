"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import User from '../../../public/images/userplus.png';
import Reobote from '../../../public/images/reobote.png';
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
    // Read the name from localStorage
    

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const name = typeof window !== 'undefined' ? localStorage.getItem('name') : '';
    const [name, setName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setName(name);
            console.log('Nome:', name);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            const email = localStorage.getItem('email');
            const name = localStorage.getItem('name');
            console.log('Nome:', name);
            console.log('Nome:', name);
            console.log('Nome:', name);
            console.log('Nome:', name);
            console.log('Nome:', name);
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
        <main className="flex bg-custom-bg bg-cover bg-center h-screen justify-start pt-4">
            <div className='justify-center pr-[12rem] pl-[8rem]'>
                <Link href="https://reobote.tec.br/" target="_blank">
                    <button className='flex justify-center items-center'>
                        <Image
                            src={Reobote}
                            width={50}
                            height={50}
                            alt="Logo"
                        />
                    </button>
                </Link>
            </div>

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
                    <span className={`text-violet-custom ${montserrat.className}`}>Bem vindo, {name} </span>
                </div>
                <div className='rounded-full bg-violet-custom mr-8 px-6 hover:bg-red-custom duration-500 transform hover:scale-110'>
                    <button onClick={openModal}>
                        <span className={`text-white hover:text-white duration-500 ${montserrat.className}`}>Sair</span>
                    </button>
                </div>
            </header>

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

            <div className=' grid m-auto items-center rounded-lg border'>
                <h1 className={`text-[25pt]  ${montserratbold.className}`}>Usuários Cadastrados</h1>
                <div></div>
            </div>
        </main>
    );
}
