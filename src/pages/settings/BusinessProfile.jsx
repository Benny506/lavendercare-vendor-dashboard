import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const BusinessProfile = () => {
    return (
        <div className="bg-grey-50 w-full rounded-lg">
            <div className="p-6 max-w-2xl">
                {/* Top section with logo and verification */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            {/* Profile Logo */}
                            <Avatar className="border-grey-50 border-2 shadow-2xl w-18 h-18 rounded-full">
                                <AvatarImage src="/assets/avatar-2.svg" alt="User avatar" />
                            </Avatar>

                            {/* Info */}
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-semibold text-grey-800">Hope Enterprise</h2>
                                <p className="text-md text-grey-500">janedoe@gmail.com</p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <Badge className="rounded-full bg-error-50 text-error-600 text-md font-medium px-3 py-1">
                            Unverified
                        </Badge>
                    </div>

                    {/* Verify Account Button */}
                    <Button className="bg-success-500 text-white text-md font-bold rounded-full">
                        Verify Account
                    </Button>
                </div>

                {/* Upload Logo Link */}
                <button className="text-sm text-primary-500 bg-none font-bold hover:underline mb-6 flex items-center gap-1">
                    <Icon icon="mdi:edit-outline" width="16" height="16" />
                    Upload Logo
                </button>

                {/* Form */}
                <form className="space-y-4">
                    {/* Business Location */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">Business Location</label>
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
                        <div className="flex">
                            <select className="border border-grey-300 bg-grey-50 rounded-l-lg px-1 py-3 text-sm focus:outline-none">
                                <option value="+234">+234</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                type="tel"
                                placeholder="81234232323"
                                className="flex-1 border border-l-0 border-grey-300 bg-grey-50 rounded-r-lg px-4 py-3 text-sm placeholder-grey-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">About</label>
                        <textarea
                            placeholder="Tell potential clients about your company"
                            maxLength={400}
                            rows={6}
                            className="border border-grey-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none placeholder-grey-400"
                        />
                        <span className="text-xs text-grey-400 text-right mt-1">0/400</span>
                    </div>

                    {/* Working Conditions */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">Working Conditions</label>
                        <textarea
                            placeholder=" e.g All bookings must be done via the lavendarCare app"
                            rows={6}
                            className="border border-grey-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none placeholder-grey-400"
                        />
                        <p className="text-sm text-grey-500 m-2 text-left">This helps potential clients understands the limitations of your services</p>
                    </div>

                    {/* Service Category */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-grey-700 mb-1">
                            Service Category
                        </label>

                        <div className="relative">
                            {/* Icon */}
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

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Type to add"
                                className="border border-grey-300 rounded-lg pl-[260px] pr-4 py-3 text-sm focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <Button className="bg-primary-100 shadow-2xl text-white rounded-4xl py-5 font-medium">
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default BusinessProfile;