import Modal from "@/components/Modal"
import React, { useState } from "react";

const SetPricing = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            {isOpen && (
                <Modal
                    title="Set Pricing"
                    primaryButton="Go back"
                    secondaryButton="Continue"
                    onClose={() => setIsOpen(false)}
                    styles={{
                        wrapper: "max-w-xs md:max-w-sm relative",
                        content: "relative",
                        title: "text-lg font-bold text-left text-black relative",
                        closeIconWrapper: "absolute top-6 right-5 z-10",
                        closeButton: "text-grey-500 hover:text-grey-700 p-1 cursor-pointer",
                        closeIcon: "w-6 h-6",
                        footer: "flex gap-6 mt-10 w-full font-bold",
                        primaryButton: "w-full px-5 py-3  bg-primary-50 text-primary-700 rounded-4xl",
                        secondaryButton: "w-full px-5 py-3  text-grey-50 bg-primary-500 rounded-4xl",
                    }}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Pricing type</label>
                            <select className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none">
                                <option>Fixed</option>
                                <option>Hourly</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Amount/Session</label>
                            <input
                                type="number"
                                placeholder="$ 0.00"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default SetPricing