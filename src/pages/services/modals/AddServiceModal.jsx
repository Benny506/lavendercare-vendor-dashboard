import ErrorMsg1 from "@/components/ErrorMsg1";
import Modal from "@/components/Modal";
import { services, vendorServicesOptions } from "@/constants/constant";
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import * as yup from 'yup'

export default function AddServiceModal({ 
    isOpen=false, 
    hide=()=>{},
    handleContinueBtnClick=()=>{},
    info={}
}) {

    return (
        <div>
            {isOpen && (
                <Formik
                    validationSchema={yup.object().shape({
                        service_name: yup.string().max(20, "Must not be more than 20 characters").required("Service name is required"),
                        service_category: yup.string().required("Service category is required"),
                        service_details: yup.string().required("Service details is required")
                    })}
                    initialValues={{
                        service_name: info?.service_name || '',
                        service_category: info?.service_category || '',
                        service_details: info?.service_details || ''
                    }}
                    onSubmit={(values) => {
                        handleContinueBtnClick(values)
                    }}
                >
                    {({ values, isValid, dirty, handleBlur, handleChange, handleSubmit}) => (
                        <Modal
                            title="Add Service details"
                            primaryButton="Continue"
                            onClose={hide}
                            primaryButtonFunc={handleSubmit}
                            styles={{
                                wrapper: "max-w-md relative",
                                content: "relative",
                                title: "text-lg font-bold text-left text-black relative",
                                closeIconWrapper: "absolute top-6 right-5 z-10",
                                closeButton: "text-grey-500 hover:text-grey-700 p-1 cursor-pointer",
                                closeIcon: "w-6 h-6",
                                footer: "flex justify-end mt-4",
                                primaryButton:
                                    "bg-primary-500 text-white flex items-center gap-2 rounded-4xl !px-9 !py-3 !h-auto",
                            }}
                        >                           
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-grey-600 mb-1">Service Name</label>
                                    <input
                                        name="service_name"
                                        value={values.service_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="e.g Deep tissue massage"
                                        className="w-full border border-grey-300 rounded-md p-2"
                                    />
                                    <span className="block text-end text-sm my-2 text-grey-500">{values.service_name.length}/20</span>
                                    <ErrorMessage name="service_name">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-600 mb-1">Service Category</label>
                                    <select 
                                        name="service_category"
                                        value={values.service_category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}                                    
                                        className="w-full border border-grey-300 rounded-md p-2.5 focus:outline-none text-grey-500"
                                    >
                                        <option value={""} selected disabled>Select Category that applies</option>
                                        {
                                            vendorServicesOptions.map((opt, optIndex) => (
                                                <option
                                                    key={optIndex}
                                                    value={opt?.toLowerCase().replaceAll(" ", "_")}
                                                >
                                                    { opt }
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <ErrorMessage name="service_category">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>                                    
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-grey-600 mb-1">Service Details</label>
                                    <textarea
                                        name="service_details"
                                        value={values.service_details}
                                        onChange={handleChange}
                                        onBlur={handleBlur}  
                                        style={{
                                            minHeight: '200px',
                                            minWidth: '100%'
                                        }}                                    
                                        placeholder=" e.g this service includes a 1hr long massage."
                                        className="w-full border border-gray-300 rounded-md p-2 placeholder:text-start align-top"
                                    />
                                    <ErrorMessage name="service_details">
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} /> }
                                    </ErrorMessage>                                      
                                </div>
                            </form>
                        </Modal>
                    )}
                </Formik>
            )}
        </div>
    );
}
