import Modal from '@/components/Modal'

const ConfirmDetails = () => {
  return (
    <Modal
      image="/assets/brush-square.svg"
      title="Confirm details"
      description="Ensure all your service details are complete before clicking confirm."
      primaryButton="Confirm"
      secondaryButton="Check details"
      styles={{
        wrapper: "max-w-xs md:max-w-md",
        image: "mt-10",
        description: "text-center text-grey-500 mt-2 mb-20",
        footer: "flex flex-col gap-3 mt-6 w-full",
        primaryButton: "w-full px-5 py-3 bg-primary-700 text-grey-50 rounded-4xl font-semibold mb-1",
        secondaryButton: "w-full px-5 py-3 bg-primary-50 text-primary-700 rounded-4xl font-semibold"
      }}
    />
  )
}

export default ConfirmDetails