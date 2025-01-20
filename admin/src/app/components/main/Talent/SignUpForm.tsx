'use client'
import React, { useState, ChangeEvent } from 'react'
import "../../../globals.css"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RegisterUser, RegisterPost } from '@/app/services/services' //le serives pour post un candidat



interface candidat {
    nom_prenom: string;
    mail: string;
    numero_tlfn: string;
    code: string;
}
export default function SignUpForm() {

    const router = useRouter()

    const [formData, setFormData] = useState<candidat>({
        nom_prenom: '',
        mail: '',
        numero_tlfn: '',
        code: ''
    })
    // const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const Register = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.code !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas');
            return;
        } else {
            try {
                await RegisterPost(formData, confirmPassword);
                alert('Inscription Reussis!')
                router.push('/connexion'); // Rediriger vers une page de succès après l'inscription
            } catch (err) {
                setErrorMessage('Erreur lors de l\'inscription');
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

    return (
        <div className='flex min-h-screen bg-blue-50'>
            {/* Conteneur gauche : Formulaire */}
            <div className='w-1/2 bg-white flex flex-col justify-between p-6 shadow-lg'>
                <div>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center space-x-4 justify-start w-full'>
                            <img src="LOGO_UJUZAI_HD.png" alt="logo-gtp" className='w-36 h-auto' />
                        </div>
                    </div>
                    <h1 className='text-2xl font-bold text-[#03346E] mb-2'>
                        Ujuz AI Sign Up page
                    </h1>
                    <p className='text-gray-500 mb-4'>A human resources app by Gainde Talent Provider</p>

                    {/* Formulaire */}
                    <form className='space-y-3' onSubmit={Register}>
                        <input
                            type='text'
                            placeholder='Nom'
                            className='w-full p-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            minLength={2}
                            maxLength={255}
                            name='nom_prenom'
                            title='nom_prenom'
                            value={formData.nom_prenom}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full p-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            maxLength={254}
                            name='mail'
                            title='mail'
                            value={formData.mail}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='tel'
                            placeholder='Téléphone'
                            className='w-full p-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            minLength={3}
                            maxLength={20}
                            name='numero_tlfn'
                            title='numero_tlfn'
                            value={formData.numero_tlfn}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            placeholder='Mot de passe'
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            required
                            name='code'
                            title='code'
                            maxLength={255}
                            value={formData.code}
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Confirmer mot de passe'
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            required
                            maxLength={255}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setErrorMessage('')}
                        />
                        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                        <button type='submit' className='mt-3 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600'>
                            S'INSCRIRE
                        </button>
                    </form>


                </div>
                <p className='text-sm text-gray-500 mt-6'>
                    Déja membre? <Link href={'/connexion'} className='text-blue-500 cursor-pointer'> connectez vous</Link>
                </p>
            </div>

            {/* Conteneur droit : Image avec fond graphique */}
            <div
                className='right-form-container w-1/2 flex items-center justify-center relative'
            >
                <div className='relative text-center'>
                    <blockquote className='italic text-white mt-8'>
                        "Le succès ne vient pas par accident. C'est du travail intense, de
                        la persévérance, de l'apprentissage, de l'étude, du sacrifice et,
                        plus que tout, de la passion pour ce que vous faites ou ce que vous
                        êtes en train d'apprendre."
                    </blockquote>
                    <blockquote className='italic text-white mt-8'>Pelé</blockquote>
                </div>
            </div>
        </div>
    )
}
