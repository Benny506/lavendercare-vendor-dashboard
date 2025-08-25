import { bookingStatuses, serviceStatuses } from '../constants/constant'


//services
export const servicesMap = {
    active: {
        color: "bg-green-600 text-green-600",
        feedBack: 'Prospective clients can see this service'
    },
    pending: {
        color: "bg-orange-100 text-orange-500",
        feedBack: 'Awaiting approval from admin.'
    },
    rejected: {
        color: "bg-red-600 text-red-600",
        feedBack: 'Rejected by admin. Edit and re-submit for approval'
    },
    hidden: {
        color: "bg-gray-500 text-gray-500",
        feedBack: "Prospective clients can not see this service"
    }
}

export const getServiceStatusBadge = ({ status }) => {
    const serviceStatus = serviceStatuses.filter(s => s === status)[0]

    if(!serviceStatus) return;

    return (
        <div className='flex items-center justify-start'>
            <p
                className={`${servicesMap[status]?.color} text-xs rounded-lg px-3 py-1`}
            >
                { status }
            </p>
        </div>
    )
}

export const getServiceStatusFeedBack = ({ status }) => servicesMap[status]?.feedBack

export const getServiceStatusColor = ({ status }) => servicesMap[status]?.color





//bookings
export const bookingsMap = {
    ongoing: {
        color: "bg-success-50 text-success-500",
        feedBack: "This appointment is currently on-going"
    },
    upcoming: {
        color: "bg-warning-50 text-warning-700",
        feedBack: "This appointment has been confirmed"
    },
    attended: {
        color: "bg-primary-50 text-primary-700",
        feedBack: "This appointment has been completed"
    },
    cancelled: {
        color: "bg-grey-100 text-grey-700",
        feedBack: "This appointment was cancelled"
    },
    missed: {
        color: "bg-error-50 text-error-700",
        feedBack: "You missed this appointment"
    }    
}

export const getBookingStatusBadge = ({ status }) => {
    const bookingStatus = bookingStatuses.filter(s => s === status)[0]

    if(!bookingStatus) return;

    return (
        <div className='flex items-center justify-start'>
            <p
                className={`${bookingsMap[status]?.color} text-xs rounded-lg px-3 py-1`}
            >
                { status }
            </p>
        </div>
    )
}