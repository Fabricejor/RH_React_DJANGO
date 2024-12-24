import React from 'react';
import { useRouter } from 'next/navigation'
// Définir les types des props
interface ModalProps {
    isOpen: boolean; // `isOpen` doit être un booléen
    closeModal: () => void; // `closeModal` est une fonction sans arguments
}

const CompagnyLogin: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;
    const router = useRouter()
    
    function Checkconnexion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        // Here you can add the logic to handle the login
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        // For demonstration, we'll just log the email and password
        console.log('Email:', email);
        console.log('Password:', password);

        router.push("/dashboard")
        // You can add your authentication logic here
        // For example, you can make an API call to your backend to authenticate the user
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-5">
        <div className="relative bg-white rounded-lg shadow-lg p-5 w-full max-w-md md:max-w-lg">
            <button
                type='button'
                onClick={closeModal}
                className="absolute top-2 right-3 text-gray-500 text-2xl font-bold hover:text-gray-700"
            >
                ×
            </button>
            <div className="flex flex-col ">
                <div className="mb-5 self-start">
                    <img
                        src="logo.png"
                        alt="UjuzAi Logo"
                        className="w-12"
                    />
                </div>
                <h2 className="text-xl font-bold text-center mb-6">
                    Company login
                </h2>
                <form className="w-full flex flex-col items-center gap-4">
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block font-bold mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#165b77]"
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block font-bold mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#165b77]"
                        />
                        <a
                            href="#"
                            className="block text-right text-[#165b77] text-sm mt-2"
                        >
                            forgot password
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#165b77] text-white py-3 rounded-md hover:bg-[#16343f]"
                        onClick={Checkconnexion}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-100"
                    >
                        <img
                            src="logoGoogle.png"
                            alt="Google Logo"
                            className="w-5"
                        />
                        login with Google
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default CompagnyLogin;
