import AuthForm from "@/components/AuthForm";
import VendorAccount from "@/components/VendorAccount";
import PhoneInput from "@/components/PhoneInput";
import { Formik } from "formik";
import * as yup from 'yup'
import { vendorServicesOptions } from "@/constants/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import supabase, { checkPhoneNumberExists } from "@/database/dbInit";

export default function CreateVendorProfile() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if(isLoading && data){

            const { type, requestInfo } = data

            if(type == 'confirmPhoneNumber'){
                confirmPhoneNumber({ requestInfo })
            }
        }
    }, [apiReqs])

    const confirmPhoneNumber = async ({ requestInfo }) => {
        try {

            const phoneNumberExists = await checkPhoneNumberExists({ phone_number: requestInfo?.phone_number })

            if(!phoneNumberExists){
                setApiReqs({ isLoading: false, errorMsg: null, data: null })
                navigate('/new-vendor/verify-email', { state: requestInfo })
                toast.success("Phone number unique")

                return
            }

            const errorMsg = 'Phone number in use by another account'
            setApiReqs({ isLoading: false, errorMsg, data: null })
            toast.error(errorMsg)

            return
            
        } catch (error) {
            console.log(error)
            return confirmPhoneNumberFailure({ errorMsg: 'Something went wrong! Try again later' })
        }
    }
    const confirmPhoneNumberFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg: null, data: null })
        toast.error(errorMsg)

        return;
    }

    return (
        <div>
            <style>
                {`
                   body{
                   overflow-x: hidden;
                   }
                `}
            </style>
            <div className="-mt-10 mr-10">
                <VendorAccount />
            </div>
            <div className="w-screen flex justify-center -mt-6">
                <Formik
                    validationSchema={yup.object().shape({
                        business_name: yup.string().required("Business name is required"),
                        email: yup.string().email("Must be a valid email address").required("Email is required"),
                        service_category: yup.string().required("Service category is required"),
                        phone_number: yup.string().required("Phone number is required"),
                        password: yup
                            .string()
                            .required('Password is required')
                            .min(8, 'Password must be at least 8 characters')
                            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                            .matches(/\d/, 'Password must contain at least one number')
                            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),

                        confirmPassword: yup
                            .string()
                            .required('Confirm Password is required')
                            .oneOf([yup.ref('password'), null], 'Passwords must match'),                        
                    })}
                    initialValues={{
                        business_name: '', email: '', service_category: '', password: '', confirmPassword: '',
                        phone_number: ''
                    }}
                    onSubmit={values => {
                        const stateData = {
                            ...values,
                            service_category: values.service_category?.replaceAll(" ", "_").toLowerCase()
                        }

                        delete stateData.confirmPassword

                        setApiReqs({
                            isLoading: true,
                            errorMsg: null,
                            data: {
                                type: 'confirmPhoneNumber',
                                requestInfo: stateData
                            }
                        })
                    }}
                >
                    {({
                        values, isValid, dirty, handleBlur, handleChange, handleSubmit
                    }) => (
                        <AuthForm
                            buttonFunc={handleSubmit}
                            title="Create your Vendor Profile"
                            description="Become a lavendercare service vendor by filling in your information below"
                            buttonText="Create account"
                            buttonLink="/new-vendor/verify-email"
                            fields={[
                                { withErrMsg: true, name: "business_name", onChange: handleChange, onBlur: handleBlur, value: values.business_name, label: "Business Name", type: "text", placeholder: "Type your business name", required: true },
                                { withErrMsg: true, name: "email", onChange: handleChange, onBlur: handleBlur, value: values.email, label: "Business Email Address", type: "email", placeholder: "Type your business email address", required: true },
                                { options: vendorServicesOptions, withErrMsg: true, name: "service_category", onChange: handleChange, onBlur: handleBlur, value: values.service_category, label: "Service Category", type: "select", placeholder: "What category do your services fall under", required: true },
                                { withErrMsg: true, name: 'password', onChange: handleChange, onBlur: handleBlur, value: values.password, label: "Create Password", type: "password", placeholder: "Create password", required: true },
                                { withErrMsg: true, name: "confirmPassword", onChange: handleChange, onBlur: handleBlur, value: values.confirmPassword, label: "Confirm Password", type: "password", placeholder: "Re-Type password", required: true },
                            ]}
                            customFields={{
                                2: (
                                    <div className="my-2">
                                        <PhoneInput 
                                            value={values.phone_number}
                                            name="phone_number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            withErrMsg={true}
                                        />
                                    </div>
                                )
                            }}
                            styles={{
                                wrapper: "bg-transparent shadow-none p-8 max-w-lg w-full",
                                title: "text-3xl font-bold text-center text-gray-800 mb-1",
                                description: "text-base text-gray-500 text-center mb-6",
                                fieldWrapper: "flex flex-col space-y-1",
                                label: "text-sm font-medium text-gray-600",
                                input: "border border-gray-300 bg-grey-50 rounded-lg px-4 py-3 text-sm placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                                button: "w-full bg-primary-500 text-grey-50 text-base py-7 rounded-full font-bold mt-4 cursor-pointer",
                            }}
                        />
                    )}
                </Formik>
            </div>
        </div>
    );
}
