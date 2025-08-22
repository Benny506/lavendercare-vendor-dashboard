import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ChangePassword = () => {
    return (
        <div className="bg-grey-50 p-6 rounded-lg max-w-2xl">
            <form className="space-y-6">
                {[
                    {
                        id: "currentPassword",
                        label: "Current Password",
                        placeholder: "Enter your current password",
                    },
                    {
                        id: "newPassword",
                        label: "New Password",
                        placeholder: "Create a new password",
                    },
                    {
                        id: "confirmPassword",
                        label: "Confirm Password",
                        placeholder: "Re-enter your password",
                    },
                ].map(({ id, label, placeholder }) => (
                    <div key={id} className="flex flex-col relative">
                        <label className="text-sm font-medium mb-1" htmlFor={id}>
                            {label}
                        </label>
                        <input
                            id={id}
                            type="password"
                            placeholder={placeholder}
                            required
                            className="border border-grey-300 placeholder:text-grey-400 rounded-lg px-3 py-2 text-sm focus:outline-none pr-10"
                        />
                        <Icon
                            icon="uil:calendar"
                            className="absolute right-3 top-8 text-grey-800 pointer-events-none"
                            width={16}
                            height={16}
                        />
                    </div>
                ))}

                <Button
                    type="submit"
                    className="bg-primary-500 text-white flex items-center gap-2 rounded-4xl !px-9 !py-3 !h-auto"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;