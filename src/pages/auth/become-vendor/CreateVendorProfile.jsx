import AuthForm from "@/components/AuthForm";
import VendorAccount from "@/components/VendorAccount";
import PhoneInput from "@/components/PhoneInput";

export default function CreateVendorProfile() {
    return (
        <div>
            <style>
                {`
                   body{
                   overflow-x: hidden;
                   }
                `}
            </style>
            <div className="-mt-10 mr-10">
                <VendorAccount />
            </div>
            <div className="w-screen flex justify-center -mt-6">
                <AuthForm
                    title="Create your Vendor Profile"
                    description="Become a lavendercare service vendor by filling in your information below"
                    buttonText="Create account"
                    buttonLink="/new-vendor/verify-email"
                    fields={[
                        { label: "Business Name", type: "text", placeholder: "Type your business name", required: true },
                        { label: "Business Email Address", type: "email", placeholder: "Type your business email address", required: true },
                        { label: "Service Category", type: "text", placeholder: "What category do your services fall under", required: true },
                        { label: "Create Password", type: "password", placeholder: "Create password", required: true },
                        { label: "Confirm Password", type: "password", placeholder: "Re-Type password", required: true },
                    ]}
                    customFields={{
                        2: (
                            <div className="my-2">
                                <PhoneInput />
                            </div>
                        )
                    }}
                    styles={{
                        wrapper: "bg-transparent shadow-none p-8 max-w-lg w-full",
                        title: "text-3xl font-bold text-center text-gray-800 mb-1",
                        description: "text-base text-gray-500 text-center mb-6",
                        fieldWrapper: "flex flex-col space-y-1",
                        label: "text-sm font-medium text-gray-600",
                        input: "border border-gray-300 bg-grey-50 rounded-lg px-4 py-3 text-sm placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                        button: "w-full bg-primary-500 text-grey-50 text-base py-7 rounded-full font-bold mt-4 cursor-pointer",
                    }}
                />
            </div>
        </div>
    );
}
