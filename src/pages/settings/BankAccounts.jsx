import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import AddNewAccountModal from "./AddNewAccontModal";
import AccountAddedModal from "./AccountAddedModal";

const BankAccounts = () => {
    return (
        <div className="bg-grey-50 p-6 rounded-lg w-full flex items-center justify-center flex-col min-h-[500px]">
            {/* Bank Image */}
            <div className="mb-4">
                <img src="/assets/cash.svg" alt="" />
            </div>

            {/* Text */}
            <p className="text-grey-700 text-lg font-bold text-center">No Bank Accounts Added</p>
            <p className="text-grey-500 mb-6 text-center text-sm">Your saved bank accounts will appear here</p>

            {/* Add Bank Button */}
            <Button className="bg-primary-600 text-white flex items-center gap-2 rounded-4xl !px-9 !py-3 !h-auto cursor-pointer">
                <Icon icon="mdi:plus" width="18" height="18" />
                Add Bank
            </Button>

            {/* Modals  */}
            {/* <AddNewAccountModal /> */}
            {/* <AccountAddedModal /> */}
        </div>
    );
};

export default BankAccounts;
