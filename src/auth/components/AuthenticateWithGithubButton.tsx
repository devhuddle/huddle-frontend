import { useRouter } from 'next/router'
import AuthenticationService from '../services/AuthenticationService'
import { axiosService } from '../../utils/services/AxiosService'
import React from 'react'

export default function AuthenticateWithGithubButton (props: { passErrorMessage: (errorMessage: string) => void }): JSX.Element {
  const router = useRouter()
  const authenticationService = new AuthenticationService(axiosService)

  async function handleLoginOrSignupWithGithub (event: any): Promise<void> {
    try {
      event.preventDefault()
      const userCredentials = await authenticationService.loginOrSignupWithGithub()
      if (userCredentials.user !== null) {
        void await router.push('/dashboard')
      }
    } catch (error: any) {
      props.passErrorMessage(error.message)
    }
  }

  return (
        <button aria-label="Continue with github" onClick={(event) => {
          void handleLoginOrSignupWithGithub(event)
        }} role="button"
                className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
            <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                    fill="#333333"
                />
            </svg>
            <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
        </button>
  )
}
