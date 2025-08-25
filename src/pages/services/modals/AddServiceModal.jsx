import Modal from "@/components/Modal";
import { useState } from "react";

export default function AddServiceModal() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            {isOpen && (
                <Modal
                    title="Add Service details"
                    primaryButton="Continue"
                    onClose={() => setIsOpen(false)}
                    styles={{
                        wrapper: "max-w-xs md:max-w-md relative",
                        content: "relative",
                        title: "text-lg font-bold text-left text-black relative",
                        closeIconWrapper: "absolute top-6 right-5 z-10",
                        closeButton: "text-grey-500 hover:text-grey-700 p-1 cursor-pointer",
                        closeIcon: "w-6 h-6",
                        footer: "flex justify-end mt-4",
                        primaryButton:
                            "bg-primary-500 text-white flex items-center gap-2 rounded-4xl !px-9 !py-3 !h-auto",
                    }}
                >
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-grey-600 mb-1">Service Name</label>
                            <input
                                type="text"
                                placeholder="e.g Deep tissue massage"
                                className="w-full border border-grey-300 rounded-md p-2"
                            />
                            <span className="block text-end text-sm my-2 text-grey-500">0/20</span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-grey-600 mb-1">Service Category</label>
                            <select className="w-full border border-grey-300 rounded-md p-2.5 focus:outline-none text-grey-500">
                                <option>Select Category that applies</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-grey-600 mb-1">Service Sub-Category</label>
                            <select className="w-full border border-grey-300 rounded-md p-2.5 focus:outline-none text-grey-500">
                                <option>Select sub-category</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-grey-600 mb-1">Service Details</label>
                            <textarea
                                placeholder=" e.g this service includes a 1hr long massage."
                                className="w-full border border-gray-300 rounded-md p-2 placeholder:text-start align-top"
                            />
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}
