import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import ShowService from "./ShowService";
import HideService from "./HideService";
import ShowServiceSuccess from "./ShowServiceSuccess";
import HideServiceSuccess from "./HideServiceSuccess";
import ConfirmChanges from "./modals/ConfirmChanges";
import ConfirmChangesProgress from "./modals/ConfirmChangesProgress";
import CancelChanges from "./modals/CancelChanges";
import CancelChangesSuccess from "./modals/CancelChangesSuccess";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceStatusColor, getServiceStatusFeedBack } from "@/lib/utilsJsx";
import { formatNumberWithCommas, secondsToLabel } from "@/lib/utils";
import SetPricing from "./modals/SetPricing";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import supabase from "@/database/dbInit";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import SetServiceDetails from "./modals/SetServiceDetails";
import SetAvailability from "./modals/SetAvailability";
import AddServiceModal from "./modals/AddServiceModal";
import DuplicateService from "./modals/DuplicateService";
import SetServiceHours from "./modals/SetServiceHours";

export default function ServiceDetails() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { state } = useLocation()

  const service_id = state?.service_id

  const profile = useSelector(state => getUserDetailsState(state).profile)
  const services = useSelector(state => getUserDetailsState(state).services)

  const [editModals, setEditModals] = useState({
    type: null,
  })
  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })
  const [service, setService] = useState()

  useEffect(() => {
    if(!service_id){
      navigate('/services')
    }

    const s = (services || []).filter(s => s?.id === service_id)[0]
    
    if(!s){
      toast.info("Unable to find service")
      navigate('/services')
    
    } else{
      setService(s)
    }
  }, [service_id, services])

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop())

    if(isLoading && data){
      const { type, requestInfo } = data

      if(type == 'editService'){
        editService({ requestInfo })
      }

      if(type === 'duplicateService'){
        duplicateService({ requestInfo })
      }
    }
  }, [apiReqs])

    const duplicateService = async ({ requestInfo }) => {
    try {

      const { data, error } = await supabase
        .from('services')
        .insert(requestInfo)
        .select()
        .single()

      if(error){
        console.log(error)
        throw new Error()
      }

      const updatedServices = [...(services || []), data]

      setApiReqs({ isLoading: false, data: null, errorMsg: null })

      dispatch(appLoadStop())
      dispatch(setUserDetails({ services: updatedServices }))

      toast.success("Service duplicated with different location")
      
    } catch (error) {
      console.log(error)
      return duplicateServiceFailure({ errorMsg: 'Something went wrong! Try again' })
    }
  }
  const duplicateServiceFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg, data: null })
    toast.error(errorMsg)

    return;
  }

  const editService = async ({ requestInfo }) => {
    try {

      const { data, error } = await supabase
        .from('services')
        .update(requestInfo)
        .eq('id', service_id)
        .select()
        .single()

      if(error){
        console.log(error)
        throw new Error()
      }

      const updatedServices = (services || []).map(s => {
        if(s.id === id){
          return {
            ...s,
            ...requestInfo
          }
        }

        return s
      })

      dispatch(setUserDetails({ services: updatedServices }))

      setApiReqs({ isLoading: false, errorMsg: null, data: null })

      toast.success("Service editted")

      return

      
    } catch (error) {
      console.log(error)
      return editServiceFailure({ errorMsg: 'Something went wrong! Try again' })
    }
  }
  const editServiceFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg, data: null })
    toast.error(errorMsg)

    return
  }

  if(!service) return <></>

  const { id, service_name, availability, pricing_type, currency, amount, base_price, base_duration,
    status, service_category, service_details, location, country, city, pricing
   } = service


  const updateAvailability = (availability) => {
    if(!availability){
      toast.info("Not all fields are set")
      return
    }

    setApiReqs({
      isLoading: true,
      errorMsg: null,
      data: {
        type: 'editService',
        requestInfo: {
          availability
        }
      }
    })    
  }

  const updateServiceDetails = ({ service_details, service_category, location, service_name }) => {
    if(!service_details || !service_category || !location || !service_name){
      toast.info("Not all fields are set")
      return
    }

    setApiReqs({
      isLoading: true,
      errorMsg: null,
      data: {
        type: 'editService',
        requestInfo: {
          service_details,
          service_category, 
          location, 
          service_name
        }
      }
    })
  }

  const updatePricing = ({ currency, base_duration, base_price }) => {
    if(!currency || !base_duration || !base_price){
      toast.info("Not all fields are set")
      return
    }

    setApiReqs({
      isLoading: true,
      errorMsg: null,
      data: {
        type: 'editService',
        requestInfo: {
          currency, base_duration, base_price
        }
      }
    })

    return;
  }

  return (
    <div className="w-full py-4 md:py-6 px-0 md:px-6 min-h-screen">
      {/* Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-0 mb-4 md:mb-0">
        <button
          type="button"
          className="flex items-center gap-2 mb-6 text-primary-600 cursor-pointer"
          onClick={() => navigate('/services')}
        >
          <span className="text-2xl">
            <Icon icon="ph:arrow-left" />
          </span>
          <span className="font-semibold md:text-lg text-sm">Back to Services</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <Button  
            onClick={() => setEditModals({ type: 'duplicate_service' })}
            className="bg-purple-600 rounded-4xl py-6 px-5 text-white"
          >
            Duplicate in another location
          </Button>

          <Button onClick={() => setEditModals({ type: 'availability' })} className="bg-success-500 rounded-4xl py-6 px-5 text-white">
            <Icon icon="mdi:edit-outline" width="30" height="30" />
            Edit Availability
          </Button>

          <Button 
            onClick={() => setEditModals({ type: 'hide_service' })} 
            className={`${service?.status === 'hidden' ? 'bg-green-700' : 'bg-red-700'} rounded-4xl py-6 px-5 text-white`}
          >
            { service?.status === 'hidden' ? 'Show' : 'Hide' }
          </Button>          
        </div>

        {/* Edit Availabity Modals  */}
        {/* <ConfirmChanges /> */}
        {/* <ConfirmChangesProgress /> */}

        {/* <CancelChanges /> */}
        {/* <CancelChangesSuccess /> */}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-grey-700"> { service_name } </h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3 capitalize"> { service_category?.replaceAll("_", " ") } </Badge>
        </div>
      </div>

      <div 
        className={`flex gap-4 my-6 w-full p-4 rounded-2xl ${getServiceStatusColor({ status })}`}
      >
        <div className="flex flex-col justify-between">
          <p className="text-md font-bold">
            { status }
          </p>
          <p className="text-sm">
            {getServiceStatusFeedBack({ status })}
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex items-center justify-between mb-3 gap-4 flex-wrap">
          <h3 className="text-xl font-bold text-grey-700">Pricing</h3>
          <Button onClick={() => setEditModals({ type: 'pricing' })} variant="ghost" className="text-primary-500">
            <Icon icon="mdi:edit-outline" width="30" height="30" />Edit Pricing
          </Button>          
        </div>

        <div className="bg-grey-100 rounded-2xl p-4">
          <div className="flex flex-col items-start gap-5">
            {/* <span>Type : <Badge className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">{pricing_type}</Badge></span>
            <div>|</div> */}
            <span>Currency: <strong> {currency} </strong></span>
            <span>Base price: <strong> {formatNumberWithCommas(base_price)} </strong></span>
            <span>Base Duration: <strong> {secondsToLabel({ seconds: base_duration })} </strong></span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-xl font-bold text-grey-700 mb-3">Details</h3>
          <Button onClick={() => setEditModals({ type: 'service_details' })} variant="ghost" className="text-primary-500">
            <Icon icon="mdi:edit-outline" width="30" height="30" />Edit Details
          </Button>
        </div>
        
        <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 item-ceter justify-between bg-grey-100 rounded-2xl p-4">
          <li style={{
            listStyleType: 'none'
          }}> 
            { service_details } 
          </li>
          <li className="capitalize">
            Country: { country?.replaceAll("_", " ") }
          </li>          
          <li className="capitalize">
            State: { service?.state?.replaceAll("_", " ") }
          </li> 
          <li className="capitalize">
            City: { city?.replaceAll("_", " ") }
          </li>                                       
          <li className="capitalize">
            Location: { location }
          </li>
        </ul>      
      </div>    

      {/* Customer Reviews */}
      {/* <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-center mb-3 gap-2">
          <h3 className="text-xl font-bold text-grey-700">Customer Review</h3>
          <span className="font-normal">(12 Reviews)</span>
        </div>

        <div className="text-gray-600 flex flex-col md:flex-row gap-4 md:gap-2 item-ceter justify-between bg-grey-100 rounded-2xl p-4 my-2">

          <div className="flex gap-2 items-center">
            <Select defaultValue="5">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by: 5 stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" disabled>Sort by: 5 stars</SelectItem>
                <SelectItem value="5">⭐ 5</SelectItem>
                <SelectItem value="4">⭐ 4</SelectItem>
                <SelectItem value="3">⭐ 3</SelectItem>
                <SelectItem value="2">⭐ 2</SelectItem>
                <SelectItem value="1">⭐ 1</SelectItem>
              </SelectContent>
            </Select>
            <p className="">12 Reviews</p>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <span className="text-xl font-extrabold text-black">4.5/5</span>
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star-half-full" className="text-xl" />
          </div>

        </div>
        
        {Array(4).fill(0).map((_, i, arr) => (
          <div
            key={i}
            className={`py-3 space-y-2 pb-5 ${i !== arr.length - 1 ? "border-b" : ""}`}
          >
            <p className="text-sm text-gray-500">12/12/2024</p>
            <h4 className="font-semibold">Hope O.</h4>
            <div className="flex text-yellow-500 mb-1 gap-2">
              {Array(4).fill(0).map((_, index) => (
                <Icon key={index} icon="mdi:star" className="text-lg" />
              ))}
              <Icon icon="mdi:star-outline" className="text-lg" />
            </div>
            <p className="text-sm text-gray-500">
              Size: <span className="font-medium">L</span> | Colour: <span className="font-medium">BLUE</span>
            </p>
            <p className="text-gray-600 text-sm">
              This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit.
            </p>
          </div>
        ))}

        <div className="relative flex items-center w-full mb-3">
          <div className="flex-grow h-[1px] bg-gray-300"></div>
          <Button
            variant="link"
            className="mx-2 text-gray-600 font-bold text-md bg-[#fdfcff] px-3 cursor-pointer"
          >
            See more Reviews
          </Button>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>

      </div> */}

      {/* Uncomment for service modal  */}
      {/* <ShowService/> */}
      {/* <ShowServiceSuccess /> */}

      {/* Uncomment for service modal  */}
      <HideService 
        service={service}
        isOpen={editModals?.type === 'hide_service'}
        hide={() => setEditModals({ type: null })}
      />
      {/* <HideServiceSuccess /> */}

      <SetPricing
          info={{
            currency, base_price, base_duration
          }} 
          goBackAStep={() => setEditModals({ type: null })}
          isOpen={editModals.type == 'pricing'}
          hide={() => setEditModals({ type: null })}
          handleContinueBtnClick={updatePricing}  
          continueBtnText="Save"              
      /> 
      <AddServiceModal
          info={{
            service_details,
            location,
            service_category,
            service_name,
            country,
            city,
            state: service?.state
          }} 
          goBackAStep={() => setEditModals({ type: null })}
          isOpen={editModals.type == 'service_details'}
          hide={() => setEditModals({ type: null })}
          handleContinueBtnClick={updateServiceDetails}  
      />      
      {/* <SetServiceDetails 
          info={{
            service_details
          }} 
          goBackAStep={() => setEditModals({ type: null })}
          isOpen={editModals.type == 'service_details'}
          hide={() => setEditModals({ type: null })}
          handleContinueBtnClick={updateServiceDetails}  
          continueBtnText="Save"              
      /> */}
      {/* <SetAvailability
          info={{
            ...availability
          }} 
          isOpen={editModals.type == 'availability'}
          hide={() => setEditModals({ type: null })}
          goBackAStep={() => setEditModals({ type: null })}        
          handleContinueBtnClick={updateAvailability}   
          continueBtnText="Save"                   
      /> */}
      <SetServiceHours
          info={{
            ...availability
          }} 
          isOpen={editModals.type == 'availability'}
          hide={() => setEditModals({ type: null })}
          goBackAStep={() => setEditModals({ type: null })}        
          handleContinueBtnClick={updateAvailability}   
          continueBtnText="Save"                   
      />     

      <DuplicateService 
          isOpen={editModals.type == 'duplicate_service'}
          hide={() => setEditModals({ type: null })}
          handleContinueBtnClick={(args) => {
            const requestInfo = {
              ...service,
              ...args,
              status: 'pending'
            }

            delete requestInfo?.id
            delete requestInfo?.created_at

            setApiReqs({
              isLoading: true,
              errorMsg: null,
              data: {
                type: 'duplicateService',
                requestInfo
              }
            })
          }}        
      />                  
    </div>
  );
}