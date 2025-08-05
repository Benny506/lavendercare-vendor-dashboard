import AuthForm from "@/components/AuthForm";

export default function VerifyEmail() {
    return (
        <AuthForm
            image="/assets/email-icon.svg"
            title="Enter OTP"
            description="We've sent a 6-digit code to your email. Please enter it below."
            // Dummy field to allow custom UI injection
            fields={[{ label: "", type: "hidden", placeholder: "" }]}
            customFields={{
                0: (
                    <div className="flex flex-col items-center gap-4 mt-2">
                        {/* OTP Boxes */}
                        <div className="flex justify-center gap-3">
                            {Array(6)
                                .fill("")
                                .map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="w-12 h-12 text-center border border-grey-300 rounded-lg text-lg bg-grey-50"
                                        maxLength={1}
                                    />
                                ))}
                        </div>

                        {/* Timer */}
                        <p className="text-sm text-grey-600">
                            <span className="font-bold">00:59</span>
                        </p>
                    </div>
                ),
            }}
            styles={{
                wrapper: "max-w-sm mx-auto p-6",
                title: "text-xl font-bold text-center text-gray-800",
                description: "text-gray-500 text-center",
            }}
        />
    );
}
