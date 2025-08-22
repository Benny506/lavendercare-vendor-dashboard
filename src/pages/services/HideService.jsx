import Modal from '@/components/Modal'

const HideService = () => {
    return (
        <Modal
            image="/assets/brush.svg"
            title="Hide Service "
            description="Hiding this service will make remove it from the LavenderCare shop. All bookings already made will not be affected."
            primaryButton='Proceed'
            secondaryButton='Cancel'
            styles={{
                description: "text-center text-grey-500 mt-2 mb-20",
                footer: "flex flex-col gap-3 mt-6 w-full",
                primaryButton: "w-full px-5 py-3 bg-primary-500 text-grey-50 rounded-4xl font-semibold mb-1",
                secondaryButton: "w-full px-5 py-3 bg-primary-50 text-primary-700 rounded-4xl font-semibold"
            }}
        />
    )
}

export default HideService