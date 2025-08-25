import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const BusinessProfile = () => {
    return (
        <div className="bg-grey-50 w-full rounded-lg">
            <div className="p-4 sm:p-6 max-w-full md:max-w-2xl">
                {/* Top section with logo and verification */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 justify-between mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {/* Profile Logo */}
                            <Avatar className="border-grey-50 border-2 shadow-2xl w-16 h-16 sm:w-18 sm:h-18 rounded-full">
                                <AvatarImage src="/assets/avatar-2.svg" alt="User avatar" />
                            </Avatar>

                            {/* Info */}
                            <div className="flex flex-col">
                                <h2 className="text-xl sm:text-2xl font-semibold text-grey-800">
                                    Hope Enterprise
                                </h2>
                                <p className="text-sm sm:text-md text-grey-500">
                                    janedoe@gmail.com
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <Badge className="self-start sm:self-auto rounded-full bg-error-50 text-error-600 text-xs sm:text-md font-medium px-2 sm:px-3 py-1">
                            Unverified
                        </Badge>
                    </div>

                    {/* Verify Account Button */}
                    <Button className="w-full sm:w-auto bg-success-500 text-white text-sm sm:text-md font-bold rounded-full">
                        Verify Account
                    </Button>
                </div>

                {/* Upload Logo Link */}
                <button className="text-sm text-primary-500 font-bold hover:underline mb-6 flex items-center gap-1">
                    <Icon icon="mdi:edit-outline" width="16" height="16" />
                    Upload Logo
                </button>

                {/* Form */}
                <form className="space-y-4">
                    {/* Business Location */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">
                            Business Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search location"
                                className="border border-grey-300 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 w-full"
                            />
                            <Icon
                                icon="mdi:magnify"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400"
                                width="18"
                                height="18"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-600">
                            Phone Number
                        </label>
                        <div className="flex flex-col sm:flex-row">
                            <select className="border border-grey-300 bg-grey-50 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-2 py-3 text-sm focus:outline-none">
                                <option value="+234">+234</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                type="tel"
                                placeholder="81234232323"
                                className="flex-1 border border-t-0 sm:border-t border-grey-300 bg-grey-50 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none px-4 py-3 text-sm placeholder-grey-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">
                            About
                        </label>
                        <textarea
                            placeholder="Tell potential clients about your company"
                            maxLength={400}
                            rows={6}
                            className="border border-grey-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none placeholder-grey-400"
                        />
                        <span className="text-xs text-grey-400 text-right mt-1">
                            0/400
                        </span>
                    </div>

                    {/* Working Conditions */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">
                            Working Conditions
                        </label>
                        <textarea
                            placeholder=" e.g All bookings must be done via the LavenderCare app"
                            rows={6}
                            className="border border-grey-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none placeholder-grey-400"
                        />
                        <p className="text-xs sm:text-sm text-grey-500 m-2 text-left">
                            This helps potential clients understand the limitations of your services
                        </p>
                    </div>

                    {/* Service Category */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">
                            Service Category
                        </label>
                        <div className="relative">
                            <Icon
                                icon="iconamoon:search"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400 pointer-events-none"
                                width="18"
                                height="18"
                            />
                            {/* Badge container */}
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none">
                                <Badge className="bg-grey-100 text-grey-700 text-xs font-medium px-2 rounded-full">
                                    Category name
                                </Badge>
                                <Badge className="bg-grey-100 text-grey-700 text-xs font-medium px-2 rounded-full">
                                    Category name
                                </Badge>
                            </div>
                            <input
                                type="text"
                                placeholder="Type to add"
                                className="border border-grey-300 rounded-lg pl-32 sm:pl-[260px] pr-4 py-3 text-sm focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <Button className="w-full sm:w-auto bg-primary-100 shadow-2xl text-white rounded-4xl py-4 sm:py-5 font-medium">
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BusinessProfile;