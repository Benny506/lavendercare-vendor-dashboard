import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { serviceStatuses } from "@/constants/constant";
import FinishSettingUp from "./FinishSettingUp";
import AddServiceModal from "./modals/AddServiceModal";
import SetPricing from "./modals/SetPricing";
import SetAvailability from "./modals/SetAvailability";
import ConfirmDetails from "./modals/ConfirmDetails";
import ReviewInProgress from "./modals/ReviewInProgress";
import { useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { formatNumberWithCommas } from "@/lib/utils";
import { getServiceStatusBadge } from '@/lib/utilsJsx'
import { useNavigate } from "react-router-dom";

export default function Services() {

    const navigate = useNavigate()

    const [filter, setFilter] = useState("all");

    const services = useSelector(state => getUserDetailsState(state).services)

    const [newService, setNewService] = useState({
        step: null, details: {}
    })
    const [serviceCount, setServiceCount] = useState({
        active: 0, inActive: 0
    })
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {

        const myServices = services || []

        let active = 0
        let inActive = 0

        for(let i = 0; i < myServices.length; i++){
            if(myServices[i]){
                const { status } = myServices[i]

                if(status === 'active'){
                    active = active + 1
                
                } else{
                    inActive = inActive + 1
                }
            }
        }

        setServiceCount({
            active, inActive
        })
    }, [services])

    const filteredServices = (services || []).filter(service => {

        const { 
            service_name, 
            service_category: category
        } = service

        const service_category = category?.replaceAll("_", " ")

        const matchSearch =
            (
                (service_name?.toLowerCase().includes(searchFilter?.toLowerCase())
                ||
                searchFilter?.toLowerCase().includes(service_name?.toLowerCase()))

            ||

                (service_category?.toLowerCase().includes(searchFilter?.toLowerCase())
                ||
                searchFilter?.toLowerCase().includes(service_category?.toLowerCase()))
            )          

        const matchesTab = filter === 'all' ? true : service.status === filter
        const matchesSearch = searchFilter ? matchSearch : true

        return matchesSearch && matchesTab
    })

    return (
        <div className="flex flex-col gap-6 py-6 px-0 md:py-6 md:px-6 w-full">
            {/* Top Summary Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0">
                <div className=" bg-grey-50 rounded-sm md:rounded-l-sm p-4 flex flex-col justify-between">
                    <div className=" w-full flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Icon icon="weui:setting-outlined" width="24" height="24" className=" text-success-500" />
                            <p className="text-sm text-grey-600">Active Services</p>
                        </div>
                        <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" />
                    </div>
                    {serviceCount.active > 0 && serviceCount.active ? (
                        <p className="text-lg font-semibold my-5 text-grey-700">{serviceCount.active}</p>
                    ) : (
                        <div className="w-3 h-1 my-6 bg-black"></div>
                    )}
                </div>
                <div className="bg-primary-50 rounded-sm md:rounded-r-sm p-4 flex flex-col justify-between">
                    <div className=" w-full flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Icon icon="weui:setting-outlined" width="24" height="24" className=" text-error-500" />
                            <p className="text-sm text-grey-600">Inactive Services</p>
                        </div>
                        <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" />
                    </div>
                    {serviceCount.inActive > 0 || serviceCount.inActive ? (
                        <p className="text-lg font-semibold my-5 text-grey-700">{serviceCount.inActive}</p>
                    ) : (
                        <div className="w-3 h-1 my-6 bg-black"></div>
                    )}
                </div>

            </div>

            <div className="bg-white rounded-2xl border">
                {/* Search and Filter */}
                <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 pb-4 lg:pb-1 border-b-1">

                    <div className="flex justify-between items-center lg:mb-3 p-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-xl text-gray-900">All Services</h2>
                            <p className="text-xs text-gray-400">
                                See all your services below
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            {/* <Icon icon="iconamoon:search" width="24" height="24" className="absolute text-red-50 left-2 top-2" /> */}
                            <Input 
                                value={searchFilter}
                                onChange={e => setSearchFilter(e.target.value)}
                                placeholder="Search services" 
                                className="w-full py-5" 
                            />
                        </div>


                        <div className="">
                            <Select onValueChange={(value) => setFilter(value)}>
                                <SelectTrigger className="py-5">
                                    <SelectValue placeholder="Filter by: All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        value={'all'}
                                        className={'text-capitalize'}
                                    >
                                        All
                                    </SelectItem>                                    
                                    {
                                        serviceStatuses.map((status, i) => {
                                            return (
                                                <SelectItem 
                                                    key={i}
                                                    value={status}
                                                    className={'text-capitalize'}
                                                >
                                                    { status }
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button 
                        onClick={() => setNewService({ step: 'add', details: {} })}
                        className="text-grey-50 bg-primary-500 rounded-4xl p-5 font-bold cursor-pointer"
                    >
                        + Add New Service
                    </Button>
                </div>


                {/* Service Cards */}
                {filteredServices && filteredServices.length > 0 ? (
                    <div className="flex flex-wrap p-4 justify-between">
                        {filteredServices.map((service, i) => {
                            
                            const { service_name, service_category, pricing_type,
                                amount, status, currency
                              } = service

                            return (
                                <div
                                    key={service?.id}
                                    className={`lg:w-1/2 w-full lg:mb-0 mb-2 ${i+1%2===0 ? 'pl-2' : 'pr-2'}`}
                                >
                                    <div
                                        className="w-full bg-white border rounded-xl p-4 space-y-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{service_name}</p>

                                            <div className="flex gap-2">
                                                <Badge variant="outline" className='font-bold text-grey-700 bg-grey-100 border-none py-1 px-2 rounded-2xl'>
                                                    {service_category?.replaceAll("_", " ")}
                                                </Badge>                                            
                                            </div>
                                        </div>

                                        <p className="text-sm text-grey-700 font-medium">
                                            {pricing_type} Price: {currency} {formatNumberWithCommas(amount)}
                                        </p>

                                        <div className="flex gap-2">
                                            <Switch checked={status === "active"} />
                                            <div className="flex flex-1 items-center justify-between">
                                                <div>
                                                    {getServiceStatusBadge({ status })}
                                                    {
                                                        (status != 'active')
                                                        &&
                                                            <p className="text-xs">
                                                                Prospective clients can not see this service
                                                            </p>                                                    
                                                    }
                                                </div>

                                                <div 
                                                    onClick={() => navigate('/services/service', { state: { service_id: service?.id } })}
                                                    className="flex items-center gap-2 text-primary-600 font-extrabold cursor-pointer"
                                                >
                                                    <p className="text-sm mt-3">View</p>
                                                    <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Icon icon="material-symbols:work-outline" className="w-16 h-16 mb-4 text-primary-700" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            No services to display
                        </h3>
                        <p className="text-sm text-gray-500 text-center">
                            You have not added any services
                        </p>
                    </div>
                )}
            </div>

            {/* Uncomment for finish setting up modal  */}
            {/* <FinishSettingUp /> */}
            <AddServiceModal
                info={newService.details.serviceInfo} 
                isOpen={newService.step == 'add'}
                hide={() => setNewService({ step: null, details: {} })}
                handleContinueBtnClick={(args) => setNewService(prev => ({
                    step: 'pricing',
                    details: {
                        ...prev.details,
                        serviceInfo: args
                    }
                }))}
            />
            <SetPricing 
                info={newService.details.pricing} 
                isOpen={newService.step == 'pricing'}
                hide={() => setNewService({ step: null, details: {} })}
                goBackAStep={() => setNewService(prev => ({ ...prev, step: 'add' }))}
                handleContinueBtnClick={(args) => setNewService(prev => ({
                    step: 'availability',
                    details: {
                        ...prev.details,
                        pricing: args
                    }
                }))}                
            />
            <SetAvailability 
                info={newService.details.availability} 
                isOpen={newService.step == 'availability'}  
                hide={() => setNewService({ step: null, details: {} })}
                goBackAStep={() => setNewService(prev => ({ ...prev, step: 'pricing' }))}          
                handleContinueBtnClick={(args) => setNewService(prev => ({
                    step: 'confirm',
                    details: {
                        ...prev.details,
                        availability: args
                    }
                }))}                   
            />
            <ConfirmDetails 
                info={newService}
                isOpen={newService.step == 'confirm'}  
                hide={() => setNewService({ step: null, details: {} })} 
                goBackAStep={() => setNewService(prev => ({ ...prev, step: 'availability' }))}                     
                handleContinueBtnClick={() => setNewService({ step: 'review', details: {} })}                 
            />
            <ReviewInProgress 
                isOpen={newService.step == 'review'}  
                hide={() => setNewService({ step: null, details: {} })}                             
            />
        </div >
    );
}