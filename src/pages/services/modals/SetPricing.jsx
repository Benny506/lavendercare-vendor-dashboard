import ErrorMsg1 from "@/components/ErrorMsg1";
import Modal from "@/components/Modal"
import { currencies } from "@/constants/constant";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from 'yup'

const SetPricing = ({ 
        isOpen, 
        hide, 
        goBackAStep, 
        info={},
        handleContinueBtnClick=()=>{},
        continueBtnText
    }) => {

    return (
        <>
            {isOpen && (
                <Formik
                    validationSchema={yup.object().shape({
                        pricing_type: yup.string().required('Pricing type is required'),
                        currency: yup.string().required("Currency is required"),
                        amount: yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").required("A valid amount is required")
                    })}
                    initialValues={{
                        currency: info?.currency,
                        pricing_type: info?.pricing_type || '', 
                        amount: info?.amount || ''
                    }}
                    onSubmit={values => {
                        handleContinueBtnClick(values)
                    }}
                >
                    {({ handleBlur, handleChange, handleSubmit, values }) => (
                        <Modal
                            title="Set Pricing"
                            primaryButton="Go back"
                            secondaryButton={continueBtnText || "Continue"}
                            onClose={hide}
                            secondaryButtonFunc={handleSubmit}
                            primaryButtonFunc={goBackAStep}
                            styles={{
                                wrapper: "max-w-sm relative",
                                content: "relative",
                                title: "text-lg font-bold text-left text-black relative",
                                closeIconWrapper: "absolute top-6 right-5 z-10",
                                closeButton: "text-grey-500 hover:text-grey-700 p-1 cursor-pointer",
                                closeIcon: "w-6 h-6",
                                footer: "flex gap-6 mt-10 w-full font-bold",
                                primaryButton: "w-full px-5 py-3  bg-primary-50 text-primary-700 rounded-4xl",
                                secondaryButton: "w-full px-5 py-3  text-grey-50 bg-primary-500 rounded-4xl",
                            }}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Pricing type</label>
                                    <select 
                                        name="pricing_type"
                                        value={values.pricing_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
                                    >
                                        <option value={""} disabled selected>Select</option>
                                        <option value={'fixed'}>Fixed</option>
                                        <option value={'hourly'}>Hourly</option>
                                    </select>
                                    <ErrorMessage name="pricing_type">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Currency</label>
                                    <select 
                                        name="currency"
                                        value={values.currency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
                                    >
                                        <option value={""} disabled selected>Select</option>
                                        {
                                            currencies.map((c, cIndex) => (
                                                <option
                                                    key={cIndex}
                                                    value={c}
                                                >
                                                    { c }
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <ErrorMessage name="currency">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>
                                </div>                                

                                <div>
                                    <label className="block text-sm font-medium">Amount/Session</label>
                                    <input
                                        name="amount"
                                        value={values.amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
                                    />
                                    <ErrorMessage name="amount">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>                                    
                                </div>
                            </div>
                        </Modal>
                    )}
                </Formik>
            )}
        </>
    )
}

export default SetPricing