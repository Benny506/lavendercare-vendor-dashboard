import ErrorMsg1 from '@/components/ErrorMsg1';
import HourSelect from '@/components/HourSelect';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { extractHour_FromHHMM, timeToAMPM_FromHour } from '@/lib/utils';
import { ErrorMessage, Formik } from 'formik';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup'


const SetServiceHours = ({
    info = {
        monday: { opening: '', closing: '' },
        tuesday: { opening: '', closing: '' },
        wednesday: { opening: '', closing: '' },
        thursday: { opening: '', closing: '' },
        friday: { opening: '', closing: '' },
        saturday: { opening: '', closing: '' },
        sunday: { opening: '', closing: '' }
    },
    isOpen,
    hide = () => { },
    goBackAStep = () => { },
    handleContinueBtnClick = () => { },
    continueBtnText = null
}) => {

    const [days, setDays] = useState(info)

    const [selectedDay, setSelectedDay] = useState('monday')

    const onContinue = () => {
        const dayKeys = Object.keys(days)

        let hasValue = false

        for (let i = 0; i < dayKeys.length; i++) {
            const day = days[dayKeys[i]]

            if (day.opening && day.closing) {
                hasValue = true
                break
            }
        }

        if (!hasValue) {
            toast.info("Select at least one availability")
            return;
        }

        handleContinueBtnClick(days)
    }

    return (
        <>
            {isOpen && (
                <Modal
                    title="Set Availability"
                    onClose={hide}
                    description="Set opening and closing hours for each day in the week"
                    primaryButton="Go back"
                    primaryButtonFunc={goBackAStep}
                    secondaryButtonFunc={onContinue}
                    secondaryButton={continueBtnText || "Save and Continue"}
                    width='w-full'
                    styles={{
                        wrapper: "w-full lg:max-w-[70vw] relative",
                        content: "relative",
                        title: "text-lg font-bold text-left text-black relative",
                        closeIconWrapper: "absolute top-6 right-5 z-10",
                        closeButton: "text-grey-500 hover:text-grey-700 p-1 cursor-pointer",
                        closeIcon: "w-6 h-6",
                        description: "text-sm my-2",
                        footer: "flex flex-col md:flex-row gap-2 justify-between mt-10 w-full font-bold",
                        primaryButton: "w-full px-5 py-3  bg-primary-50 text-primary-700 rounded-4xl",
                        secondaryButton: "w-full px-5 py-3  text-grey-50 bg-primary-500 rounded-4xl",
                    }}
                >
                    <div className='border border-grey-100 rounded-md lg:flex block w-full'>
                        <div className='border-r border-grey-100 py-4 pb-2 px-2  space-y-4 flex flex-row flex-wrap lg:flex-col items-center lg:w-[20%] w-full lg:mb-0 mb-4 font-semibold text-sm'>
                            {Object.keys(days).map((day, index) => {

                                const active = day === selectedDay ? true : false

                                const handleDayClick = () => setSelectedDay(day)

                                return (
                                    <div key={day} onClick={handleDayClick} className={`lg:w-full w-1/2 text-center py-3 ${active ? "text-grey-50 bg-primary-500" : "cursor-pointer hover:bg-gray-100"} p-2 rounded-lg`}>
                                        <p>{day}</p>
                                    </div>
                                )
                            }
                            )}
                        </div>

                        <div>
                            <Formik
                                validationSchema={yup.object().shape({
                                    start_hour: yup.string()
                                        .required("Start hour is required"),
                                    end_hour: yup.string()
                                        .required("End hour is required")
                                        .test("is-greater", "End hour must be later than start hour", function (value) {
                                            const { start_hour } = this.parent;
                                            if (!start_hour || !value) return false;

                                            // Convert to minutes for easy comparison
                                            const [sh, sm] = start_hour.split(":").map(Number);
                                            const [eh, em] = value.split(":").map(Number);

                                            const startTotal = sh * 60 + sm;
                                            const endTotal = eh * 60 + em;

                                            return endTotal > startTotal;
                                        })
                                })}
                                initialValues={{
                                    start_hour: '', end_hour: ''
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    const { start_hour, end_hour } = values

                                    const [sh, sm] = start_hour.split(":").map(Number);
                                    const [eh, em] = end_hour.split(":").map(Number);

                                    setDays(prev => ({
                                        ...prev,
                                        [selectedDay]: { opening: sh, closing: eh }
                                    }))

                                    resetForm()
                                }}
                            >
                                {({ handleBlur, handleChange, handleSubmit, isValid, dirty, values }) => (
                                    <div className='m-7 flex flex-col items-start justify-center px-2 gap-4'>
                                        <div className=''>
                                            {
                                                days[selectedDay]?.opening
                                                    ?
                                                    <p className=''>
                                                        {timeToAMPM_FromHour({ hour: days[selectedDay]?.opening })} - {timeToAMPM_FromHour({ hour: days[selectedDay]?.closing })}
                                                    </p>
                                                    :
                                                    <p className=''>
                                                        Not set
                                                    </p>
                                            }
                                        </div>

                                        <div className=''>
                                            <label className=''>Opening at</label>
                                            <br />
                                            <HourSelect
                                                name="start_hour"
                                                value={values.start_hour}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            <ErrorMessage name='start_hour'>
                                                {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                            </ErrorMessage>
                                        </div>

                                        <div className=''>
                                            <label className=''>Closing at</label>
                                            <br />
                                            <HourSelect
                                                name="end_hour"
                                                value={values.end_hour}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            <ErrorMessage name='end_hour'>
                                                {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                            </ErrorMessage>
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            className={'bg-primary-600'}
                                        >
                                            Set
                                        </Button>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal>
            )
            }
        </>
    )
}

export default SetServiceHours  