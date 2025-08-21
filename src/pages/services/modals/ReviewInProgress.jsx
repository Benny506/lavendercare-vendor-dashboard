import Modal from '@/components/Modal'

const ReviewInProgress = () => {
    return (
        <Modal
            image="/assets/loading-orange.svg"
            title="Review in progress"
            description="We are currently reviewing your services. This process takes up to 24 hours. You will be notified once our team is done. If it meets all our requirements, this service will be added to the store."
            primaryButton="I understand"
            styles={{
                image: "mt-10",
                description: "text-center text-grey-500 mt-2 mb-10",
                footer: "flex flex-col gap-3 my-6 w-full",
                primaryButton: "w-full px-5 py-3 bg-primary-500 text-grey-50 rounded-4xl font-semibold mb-1",
            }}
        />
    )
}

export default ReviewInProgress