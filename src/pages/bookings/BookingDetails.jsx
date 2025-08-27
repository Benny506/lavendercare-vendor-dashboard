import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CancelAppointment from './CancelAppointment'
import CancelAppointmentSuccess from './CancelAppointmentSuccess'
import ConfirmAppointment from './ConfirmAppointment'
import ConfirmAppointmentSuccess from './ConfirmAppointmentSuccess'
import { useSelector } from 'react-redux'
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice'
import { toast } from 'react-toastify'
import { clockTimer, formatNumberWithCommas, isoToDateTime, timeToAMPM_FromHour } from '@/lib/utils'
import { bookingsMap } from '@/lib/utilsJsx'

const BookingDetails = () => {
    const navigate = useNavigate()
    
    const { state } = useLocation()
    const booking_id = state?.booking_id

    const bookings = useSelector(state => getUserDetailsState(state).bookings)
    const services = useSelector(state => getUserDetailsState(state).services)

    const [booking, setBooking] = useState()
    const [service, setService] = useState()
    const [timerStr, setTimerStr] = useState('')

    useEffect(() => {

        if(!booking_id) {
            navigate('/bookings')
        
        } else{
            const _b = (bookings || []).filter(b => b.id === booking_id)[0]
            
            if(!_b){
                navigate('/bookings')
                toast.info("Unable to locate single booking")
            
            } else{
                const service = (services || []).filter(s => s?.id == _b?.service_id)[0]

                if(!_b){
                    navigate('/bookings')
                    toast.info("Unable to locate single booking")
                
                } else{
                    setBooking(_b)
                    setService(service)
                }                
            }
        }

    }, [state])

    useEffect(() => {
        if(!booking) return;

        const { day, start_hour } = booking

        const timerInterval = setInterval(() => {
            const { str, isZero } = clockTimer({ targetDate: day, startHour: start_hour })

            setTimerStr(str)

            if(isZero) clearInterval(timerInterval);
        })

        return () => {
            clearInterval(timerInterval)
        }
    }, [booking])

    if(!booking_id || !booking || !service) return <></>

    const { service_name, service_category } = service
    const { status } = booking

    return (
        <div className="w-full py-6 px-0 md:p-6 min-h-screen">
            {/* Back Button */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-0 mb-4 md:mb-0">
                <button
                    type="button"
                    className="flex items-center gap-2 mb-6 text-primary-600 cursor-pointer"
                    onClick={() => navigate('/bookings')}
                >
                    <span className="text-2xl">
                        <Icon icon="ph:arrow-left" />
                    </span>
                    <span className="font-semibold text-lg">Back to Bookings</span>
                </button>

                <p className="text-grey-700 font-bold">
                    Appointment in { timerStr }
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-grey-700">{ service_name }</h2>
                <div className="flex gap-2">
                    <Badge variant="secondary" className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">{ service_category?.replaceAll("_", " ") }</Badge>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 my-6 bg-error-50 w-full p-4 rounded-2xl justify-between items-start md:items-center">
                <div className="flex flex-col justify-between text-grey-600">
                    <p className="text-md font-semibold capitalize mb-1">
                        { status }
                    </p>

                    <p className="text-sm">
                        { bookingsMap[status]?.feedBack }
                    </p>
                </div>

                {
                    status == 'upcoming'
                    &&
                        <p className='font-bold text-error-700'>Cancel Appointment</p>
                }
            </div>

            {/* Order Section */}
            <div className="bg-white rounded-lg p-4 shadow mb-6">
                <h3 className="text-xl font-bold text-grey-700 mb-3">Order details</h3>

                <div className="flex flex-col item-ceter justify-between bg-grey-100 rounded-2xl p-4">
                    <div className="flex flex-col gap-2 items-center w-full border-b border-grey-200 pb-3 space-y-1">
                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Order number:</p>
                            <p className='font-bold'>{booking?.id}</p>
                        </div>

                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Order placed on:</p>
                            <p className='font-bold'>{ isoToDateTime({ isoString: booking?.created_at }) }</p>
                        </div>

                        <div className='flex items-center justify-between gap-4 w-full'>
                            <p>Location:</p>
                            <p className='font-bold'>Lekki, Lagos, Nigeria</p>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between gap-4 w-full py-3 font-bold text-lg'>
                            <p>Appointment set for:</p>
                            <p>{ booking?.day } / { timeToAMPM_FromHour({ hour: booking?.start_hour }) } - { timeToAMPM_FromHour({ hour: booking?.end_hour }) }</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Customer info and Summary  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white rounded-lg p-4 shadow ">
                    <h3 className="text-xl font-bold text-grey-700 mb-3">Customer Info</h3>
                    <div className="flex flex-col item-ceter justify-between bg-grey-100 rounded-2xl p-4">
                        <div className="flex flex-col gap-2 items-center w-full space-y-1">
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Name:</p>
                                <p className='font-bold'>
                                    { booking?.user_profile?.name }
                                </p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Sex:</p>
                                <p className='font-bold'>Female</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Status:</p>
                                <p className='font-bold'>
                                    { booking?.user_profile?.is_pregnant ? 'Pregnant' : 'Post-partum' }
                                </p>
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
                                <p className='font-semibold capitalize'>{ booking?.pricing_type }</p>
                            </div>

                            <div className='flex items-center justify-between gap-4 w-full'>
                                <p>Cost:</p>
                                <p className='font-semibold'> { booking?.currency } { formatNumberWithCommas(booking?.amount) } </p>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between gap-4 w-full py-3 font-bold text-lg'>
                                <p>Total:</p>
                                <p>
                                    { booking?.currency } { formatNumberWithCommas(booking?.amount) }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="bg-white rounded-lg p-4 shadow my-6">
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
            </div> */}

            {/* Uncomment for cancel appointment modal  */}
            {/* <CancelAppointment /> */}
            {/* <CancelAppointmentSuccess /> */}

            {/* Uncomment for confirm appointment modal  */}
            {/* <ConfirmAppointment /> */}
            {/* <ConfirmAppointmentSuccess /> */}
        </div>
    )
}

export default BookingDetails