import React, { useState } from 'react'
import { walletInfo, walletTransactions } from '@/constants/constant'
import { Icon } from '@iconify/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import WithdrawModal from './WithdrawModal'
import ConfirmWithdrawalModal from './ConfirmWithdrawalModal'
import WithdrawalSuccessModal from './WithdrawalSuccessModal'
import TransactionDetailsModal from './TransactionDetailsModal'

const Wallet = () => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)

    const filteredTransactions = walletTransactions.filter(txn => {
        const matchesSearch = txn.referenceId.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === "all" || txn.status.toLowerCase() === filter.toLowerCase()
        return matchesSearch && matchesFilter
    })

    const totalPages = 10

    const columns = [
        { key: "withdrawalDate", label: "Withdrawal date" },
        { key: "referenceId", label: "Reference ID" },
        { key: "receivingBankAccount", label: "Receiving Bank Account" },
        {
            key: "amount",
            label: "Amount",
            render: (row) => (
                <span>₦{row.amount}</span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span className={`px-3 py-1 text-xs rounded-full font-medium
                    ${row.status === "Success" && "bg-success-50 text-success-600"}
                    ${row.status === "Processing" && "bg-warning-50 text-warning-700"}
                    ${row.status === "Failed" && "bg-error-50 text-error-700"}`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            key: "action",
            label: "Action",
            render: () => (
                <button className="text-primary-500 text-sm font-extrabold">
                    View Receipt
                </button>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="py-4 md:p-4 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
                {walletInfo.map((info, index) => {
                    const [bgColor, iconColor = "text-grey-600"] = info.color.split(" ");
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-lg flex items-center justify-between ${bgColor}`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    {info.icon && (
                                        <Icon icon={info.icon} className={`text-xl ${iconColor}`} />
                                    )}
                                    <p className="text-sm text-grey-600">{info.title}</p>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    ₦ {typeof info.value === 'number'
                                        ? info.value.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                        : info.value
                                    }
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Withdrawal History Header */}
            <div className="bg-white rounded-2xl border">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 p-3 md:p-6 border-b-1">
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                Withdrawal History
                            </h2>
                            <p className="text-md text-gray-400">View your withdrawals below</p>
                        </div>

                        <div>
                            <Select>
                                <SelectTrigger className="flex items-center border border-gray-200 rounded-md md:px-4 py-3 bg-white text-gray-700 text-sm font-medium">
                                    <Icon icon="uil:calender" className="md:mr-2 text-lg text-gray-400" />
                                    <SelectValue placeholder="January 01, 2023 - July 20, 2023" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jan-jul-2023">January 01, 2023 - July 20, 2023</SelectItem>
                                    <SelectItem value="jul-dec-2023">July 21, 2023 - December 31, 2023</SelectItem>
                                    <SelectItem value="jan-jun-2024">January 01, 2024 - June 30, 2024</SelectItem>
                                    <SelectItem value="all">All Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="bg-primary-500 text-white px-5 py-2 rounded-4xl font-bold text-sm min-w-[160px]">
                            Withdraw to Bank
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredTransactions}
                    pagination={
                        <Pagination
                            className="gap-16 md:gap-0"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    }
                    styles={{
                        wrapper: "md:p-3 overflow-x-auto max-w-2xs md:max-w-full",
                        table: "w-full border-collapse",
                        headerRow: "bg-grey-50 text-left text-gray-700 text-sm border-b border-grey-100",
                        headerCell: "p-4 font-semibold",
                        row: "border-b hover:bg-gray-50",
                        cell: "p-4 text-sm font-semibold",
                        emptyWrapper: "flex flex-col items-center justify-center py-20 text-center",
                        icon: "w-20 h-20 mb-6 text-primary-500",
                        emptyTitleText: "No data to display",
                        emptySubText: "You have not made any withdrawals",
                        emptyIcon: "material-symbols:account-balance-outline"
                    }}
                />
            </div>

            {/* Modals (uncomment to activate) */}
            {/* <WithdrawModal /> */}
            {/* <ConfirmWithdrawalModal /> */}
            {/* <WithdrawalSuccessModal /> */}
            {/* <TransactionDetailsModal /> */}
        </div>
    )
}

export default Wallet