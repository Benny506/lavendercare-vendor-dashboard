import AuthForm from "@/components/AuthForm"

const CreateNewPassword = () => {
  return (
    <div>
        <AuthForm
                title="Create New Password"
                description="Create a new password"
                fields={[
                    { label: "Create Password", type: "password", placeholder: "Create Password", required: true },
                    { label: "Confirm Password", type: "password", placeholder: "Re-Type password", required: true },
                ]}
                buttonText="Create Password"
                buttonLink="/recover-password/password-recovered"
                styles={{
                    wrapper: "bg-transparent max-w-md mx-auto -mt-2 md:mt-0 p-6",
                    title: "text-3xl font-bold text-center text-gray-800 mb-1",
                    description: "text-base text-gray-500 text-center mb-6",
                    fieldWrapper: "flex flex-col space-y-1",
                    label: "text-sm font-medium text-gray-600",
                    input: "border border-gray-300 bg-grey-50 rounded-lg px-4 py-3 text-sm placeholder-grey-400 focus:outline-none",
                    button: "w-full bg-primary-500 text-grey-50 text-base py-7 rounded-full font-bold mt-2",
                }}
            />
    </div>
  )
}

export default CreateNewPassword