import AuthForm from '@/components/AuthForm'
import { vendorLogin } from '@/database/dbInit'
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice'
import { setUserDetails } from '@/redux/slices/userDetailsSlice'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const Login = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'login'){
                login({ requestInfo })
            }
        }
    }, [apiReqs])

    const login = async ({ requestInfo }) => {
        try {

            const { email, password } = requestInfo

            const { data, errorMsg } = await vendorLogin({ email, password })

            if(!data || errorMsg) {
                if(errorMsg){
                    setApiReqs({ isLoading: false, data: null, errorMsg })
                    toast.error(errorMsg)

                    return
                }

                throw new Error()
            }

            const { profile, session, user, services, bookings, phone_number } = data

            dispatch(setUserDetails({
                profile, services, bookings, phone_number, session, user
            }))

            setApiReqs({ isLoading: false, data: null, errorMsg: null })

            navigate('/')

            return;
            
        } catch (error) {
            return loginFailure({ errorMsg: 'Something went wrong! Try again' })
        }
    }
    const loginFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        toast.error(errorMsg)

        return
    }

    return (
        <div>
            <Formik
                validationSchema={yup.object().shape({
                    email: yup.string().email("Must be a valid email address").required("Email is required"),
                    password: yup.string().required("Password required")
                })}
                initialValues={{
                    email: '', password: ''
                }}
                onSubmit={(values) => {
                    setApiReqs({
                        isLoading: true, 
                        errorMsg: null,
                        data: {
                            type: 'login',
                            requestInfo: values
                        }
                    })
                }}
            >
                {({ values, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                    <AuthForm
                        buttonErrMsg={apiReqs.errorMsg}
                        title="Login"
                        description="Enter your business email and password to Login"
                        buttonText="Login"
                        buttonFunc={handleSubmit}
                        fields={[
                            { onChange: handleChange, onBlur: handleBlur, withErrMsg: true, value: values.email, name: 'email', label: "Business Email Address", type: "email", placeholder: "Type your business email address", required: true },
                            { onChange: handleChange, onBlur: handleBlur, withErrMsg: true, value: values.password, name: 'password', label: "Password", type: "password", placeholder: "Type your password", required: true },
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
                )}
            </Formik>
        </div>
    )
}

export default Login