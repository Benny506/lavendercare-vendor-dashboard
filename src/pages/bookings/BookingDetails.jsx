import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CancelAppointment from './CancelAppointment'
import CancelAppointmentSuccess from './CancelAppointmentSuccess'
import ConfirmAppointment from './ConfirmAppointment'
import ConfirmAppointmentSuccess from './ConfirmAppointmentSuccess'

const BookingDetails = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full p-6 min-h-screen">
            {/* Back Button */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    className="flex items-center gap-2 mb-6 text-primary-600 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <span className="text-2xl">
                        <Icon icon="ph:arrow-left" />
                    </span>
                    <span className="font-semibold text-lg">Back to Services</span>
                </button>

                <p className="text-grey-700 font-bold">
                    Appointment in 24days : 24hr : 24mins
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-grey-700">Massage therapy</h2>
                <div className="flex gap-2">
                    <Badge variant="secondary" className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">Self Care</Badge>
                    <Badge variant="secondary" className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">Massage</Badge>
                </div>
            </div>

            <div className="flex gap-4 my-6 bg-error-50 w-full p-4 rounded-2xl justify-between items-center">
                <div className="flex flex-col justify-between text-grey-600">
                    <p className="text-md font-semibold">
                        Upcoming
                    </p>
                    <p className="text-sm">This appointment has been confirmed</p>
                </div>
                <p className='font-bold text-error-700'>Cancel Appointment</p>
            </div>

            {/* Order Section */}
            <div className="bg-white rounded-lg p-4 shadow mb-6">
                <h3 className="text-xl font-bold text-grey-700 mb-3">Order details</h3>

                <div className="flex flex-col item-ceter justify-between bg-grey-100 rounded-2xl p-4">
                    <div className="flex flex-col gap-2 items-center w-full border-b border-grey-200 pb-3 space-y-1">
                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Order number:</p>
                            <p className='font-bold'>#2ew345w34544</p>
                        </div>

                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Order placed on:</p>
                            <p className='font-bold'>23-08-23 / 03:00</p>
                        </div>

                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Location:</p>
                            <p className='font-bold'>Lekki, Lagos, Nigeria</p>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between gap-4 w-full py-3 font-bold text-lg'>
                            <p>Appointment set for:</p>
                            <p>23-08-23 / 03:00 - 4:00PM</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Customer info and Summary  */}

            <div className="grid grid-cols-2 gap-4">

                <div className="bg-white rounded-lg p-4 shadow ">
                    <h3 className="text-xl font-bold text-grey-700 mb-3">Customer Info</h3>
                    <div className="flex flex-col item-ceter justify-between bg-grey-100 rounded-2xl p-4">
                        <div className="flex flex-col gap-2 items-center w-full space-y-1">
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Name:</p>
                                <p className='font-bold'>Jane Doe</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Sex:</p>
                                <p className='font-bold'>Female</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Status:</p>
                                <p className='font-bold'>Pregnant</p>
                            </div>
                        </div>

                        <div className='w-full  p-4 mt-1'>
                            <Button className="text-grey-50 font-bold bg-primary-500 rounded-4xl p-6 w-full">View messages</Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow ">
                    <h3 className="text-xl font-bold text-grey-700 mb-3">Summary</h3>
                    <div className="flex flex-col item-ceter justify-between bg-grey-100 rounded-2xl p-4">
                        <div className="flex flex-col gap-2 items-center w-full border-b border-grey-200 pb-3 space-y-1">
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Type:</p>
                                <p className='font-semibold'>Fixed</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Cost:</p>
                                <p className='font-semibold'>₦4200</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Discount:</p>
                                <p className='font-semibold'>+₦2200</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Processing fee (2%):</p>
                                <p className='font-semibold text-error-500'>-₦200</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between gap-4 w-full py-3 font-bold text-lg'>
                                <p>Total:</p>
                                <p>₦7200</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow my-6">
                <div className="flex items-center mb-3 gap-2">
                    <h3 className="text-xl font-bold text-grey-700">Customer Review</h3>
                </div>

                <div className="text-gray-600 flex gap-2 item-ceter justify-between bg-grey-100 rounded-2xl p-4 my-2">
                    <div className="flex items-center gap-2 text-yellow-500 px-2">
                        <span className="text-xl font-extrabold text-black">4/5</span>
                        <Icon icon="mdi:star" className="text-xl" />
                        <Icon icon="mdi:star" className="text-xl" />
                        <Icon icon="mdi:star" className="text-xl" />
                        <Icon icon="mdi:star" className="text-xl" />
                        <Icon icon="mdi:star-half-full" className="text-xl" />
                    </div>
                </div>


                {/* Review Card */}
                {Array(2).fill(0).map((_, i, arr) => (
                    <div
                        key={i}
                        className={`py-3 space-y-2 pb-5 ${i !== arr.length - 1 ? "border-b" : ""}`}
                    >
                        <p className="text-sm text-gray-500">12/12/2024</p>
                        <h4 className="font-semibold">Hope O.</h4>
                        <div className="flex text-yellow-500 mb-1 gap-2">
                            {Array(4).fill(0).map((_, index) => (
                                <Icon key={index} icon="mdi:star" className="text-lg" />
                            ))}
                            <Icon icon="mdi:star-outline" className="text-lg" />
                        </div>
                        <p className="text-sm text-gray-500">
                            Size: <span className="font-medium">L</span> | Colour: <span className="font-medium">BLUE</span>
                        </p>
                        <p className="text-gray-600 text-sm">
                            This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit.
                        </p>
                    </div>
                ))}
            </div>

            {/* Uncomment for cancel appointment modal  */}
            {/* <CancelAppointment /> */}
            {/* <CancelAppointmentSuccess /> */}

            {/* Uncomment for confirm appointment modal  */}
            {/* <ConfirmAppointment /> */}
            <ConfirmAppointmentSuccess />
        </div>
    )
}

export default BookingDetails