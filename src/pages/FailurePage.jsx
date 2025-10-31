import React from 'react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg w-full">
                <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h1 className="text-3xl font-bold text-red-700 mb-2">¡Pago Fallido!</h1>
                <p className="text-lg text-red-600 mb-6">
                    Hubo un problema al procesar tu pago. Por favor, verifica la información de tu tarjeta o intenta con otro método.
                </p>
                
                <div className="space-y-4">
                    <Link 
                        to="/cart" 
                        className="inline-block w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    >
                        Volver al Carrito
                    </Link>
                    <Link 
                        to="/help" 
                        className="inline-block w-full px-6 py-3 border border-red-600 text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none transition duration-150 ease-in-out"
                    >
                        Contactar Soporte
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;
