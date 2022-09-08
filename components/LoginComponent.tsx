
import { useRouter } from 'next/router'
import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import AuthenticationModel from '../models/AuthenticationModel'
import { axiosService } from '../services/AxiosService'
import LoginService from '../services/LoginService'
import SignupService from '../services/SignupService'

export default function LoginComponent () {
    const [errorMessage, setErrorMessage] = React.useState('')
    const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
    const router = useRouter();

    const loginService = new LoginService(axiosService)

    async function login (event: any): Promise<void> {
            event.preventDefault()
            const user = new AuthenticationModel(event.target.email.value, event.target.password.value)
            const authenticationResponse = await loginService.login(user)

            if (authenticationResponse.isSuccess) {
                router.push('/dashboard')
                window.localStorage.setItem('isAuthenticated', 'true')
                setIsAuthenticated(true)
            } else {
                setErrorMessage(authenticationResponse.message)
            }
    }

    async function handleLoginWithGithub(event: any) : Promise<void> {
        event.preventDefault()
        const authenticationResponse = await loginService.loginWithGithub()
        if (authenticationResponse.userCrendential?.user) {
            router.push('/dashboard')
            window.localStorage.setItem('isAuthenticated', 'true')
            setIsAuthenticated(true)
        } else {
            setErrorMessage(authenticationResponse.errorMesssage)
        }
    }

    async function handleLoginWithGoogle(event: any) : Promise<void> {
        event.preventDefault()
        const authenticationResponse = await loginService.loginWithGoogle()
        if (authenticationResponse.userCrendential?.user){
            router.push('/dashboard')
            window.localStorage.setItem('isAuthenticated', 'true')
            setIsAuthenticated(true)
        } else {
            setErrorMessage(authenticationResponse.errorMesssage)
        }
    }

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Welcome Back</h1>
                    <form onSubmit={login}>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />

                        <span className='w-full text-center text-red-500'>
                            {errorMessage !== '' && <h6>{errorMessage}</h6>}
                        </span>

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                        >Login</button>
                    </form>

                    <h6 className='text-center m-2'>
                        OR
                    </h6>

                    <div>
                    <button aria-label="Continue with google" onClick={handleLoginWithGoogle} role="button"  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full">
                        <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>
                        <button aria-label="Continue with github" onClick={handleLoginWithGithub} role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                            <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                                    fill="#333333"
                                />
                            </svg>
                            <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
                        </button>
                    </div>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service </a> and <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? <a className="no-underline border-b border-blue text-blue" href="../signup/">
                        Sign up
                    </a>.
                </div>
            </div>
        </div>
    )
}
    