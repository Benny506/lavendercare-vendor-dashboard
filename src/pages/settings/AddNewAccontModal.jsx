import Modal from "@/components/Modal";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

export default function AddNewAccountModal(/*{ onClose }*/) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {isOpen && (
                <Modal
                    title="Add New Account"
                    onClose={() => setIsOpen(false)}
                    primaryButton="Save Bank"
                    styles={{
                        wrapper: "max-w-sm relative",
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
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium">Bank</label>
                            <Select>
                                <SelectTrigger className="w-full mt-1 border border-gray-300 rounded-lg p-2">
                                    <SelectValue placeholder="Select bank" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="access">Access Bank</SelectItem>
                                    <SelectItem value="gtb">GTBank</SelectItem>
                                    <SelectItem value="uba">UBA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-5">
                            <label className="text-sm font-medium">Account Number</label>
                            <input
                                type="text"
                                placeholder="Type your account number"
                                className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none mb-2"
                            />
                            <Badge className="bg-success-50 text-success-700 w-full rounded-4xl justify-start items-center py-1.5">
                                <Icon icon="ei:check" width="20" height="20" />
                                John Doe
                            </Badge>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
