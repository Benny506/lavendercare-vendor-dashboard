import AuthForm from '@/components/AuthForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            <AuthForm
                title="Login"
                description="Enter your business email and password to Login"
                buttonText="Login"
                buttonLink="/"
                fields={[
                    { label: "Business Email Address", type: "email", placeholder: "Type your business email address", required: true },
                    { label: "Password", type: "password", placeholder: "Type your password", required: true },
                ]}
                customFields={{
                    1: (
                        <div className='flex justify-end w-full mt-2 cursor-pointer' onClick={() => {navigate("/recover-password")}}>
                            <span className='font-bold text-primary-500'> Forgot Password? </span>
                        </div>
                    )
                }}
                footerText="I am new here."
                footerLink="/new-vendor"
                footerLinkText="Create Vendor Account"
                styles={{
                    wrapper: "bg-transparent max-w-md mx-auto p-6",
                    title: "text-3xl font-bold text-center text-gray-800 mb-1",
                    description: "text-base text-gray-500 text-center mb-6",
                    fieldWrapper: "flex flex-col space-y-1",
                    label: "text-sm font-medium text-gray-600",
                    input: "border border-gray-300 bg-grey-50 rounded-lg px-4 py-3 text-sm placeholder-grey-400 focus:outline-none",
                    button: "w-full bg-primary-500 text-grey-50 text-base py-7 rounded-full font-bold mt-2",
                    footerText: "text-grey-500 text-center mt-2",
                    footerLink: "text-primary-500 font-bold cursor-pointer"
                }}
            />
        </div>
    )
}

export default Login