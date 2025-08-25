import Modal from '@/components/Modal'
import React, { useState } from 'react';

const SetAvailability = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            {isOpen && (
                <Modal
                    title="Set Availability"
                    onClose={() => setIsOpen(false)}
                    description="You can set your available hours each day. Leave empty where you won’t be available. You can edit anytime."
                    primaryButton="Go back"
                    secondaryButton="Save and Continue"
                    styles={{
                        wrapper: "max-w-xs md:max-w-md relative",
                        content: "relative",
                        width: "w-sm",
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
                    <div className='border border-grey-100 rounded-md flex flex-col md:flex-row w-full'>
                        <div className='md:border-r border-grey-100 py-4 pb-2 px-2  space-y-4 flex flex-col items-center md:w-[45%] font-semibold text-sm'>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                                <div key={day} className={`w-full text-center py-3 ${index === 0 ? "text-grey-50 bg-primary-500" : ""} p-2 rounded-lg`}>
                                    <p>{day}</p>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col items-start justify-center px-2 gap-4'>
                            <div className='w-full'>
                                <label className=''>Start time</label>
                                <input type="input" name="" placeholder='0:00' className='p-2 border-[1px] border-grey-300 rounded-lg focus:outline-none' />
                            </div>

                            <div className='w-full'>
                                <label className=''>End time</label>
                                <input type="input" name="" placeholder='0:00' className='p-2 border-[1px] border-grey-300 rounded-lg focus:outline-none' />
                            </div>
                        </div>
                    </div>
                </Modal>
            )
            }
        </>
    )
}

export default SetAvailability