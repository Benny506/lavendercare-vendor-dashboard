import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";
import DeleteMessage from "./DeleteMessage";
import { useDispatch, useSelector } from "react-redux";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import supabase from "@/database/dbInit";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { formatNumberWithCommas, removeDuplicates, removeDuplicatesWithCount } from "@/lib/utils";
import Chat from "./Chat";

const Inbox = () => {
    const dispatch = useDispatch()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const [clients, setClients] = useState([])
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [showMenu, setShowMenu] = useState(false);
    const [activeChat, setActiveChat] = useState();
    const [activeUser, setActiveUser] = useState()
    const [Sidebar, setSidebar] = useState(false);

    useEffect(() => {
        const { unique, counts } = removeDuplicatesWithCount((bookings || []).map(b => b?.user_profile?.id))

        setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'fetchClients',
                requestInfo: {
                    userIds: unique,
                    counts
                }
            }
        })
    }, [])

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'fetchClients'){
                fetchClients({ requestInfo })
            }
        }
    }, [apiReqs])

    useEffect(() => {
        if(activeUser){
            const userChat = (bookings || []).filter(b => b?.user_profile?.id == activeUser?.id)[0]

            if(!userChat){
                toast.info("Error loading chats with this user. Try again, if the issue persists, contact support")
            
            } else{
                setActiveChat(userChat)
            }
        }
    }, [activeUser])

    const fetchClients = async ({ requestInfo }) => {
        try {

            const { userIds, counts } = requestInfo

            const { data, error } = await supabase
                .from('user_profiles')
                .select("*")
                .in('id', userIds)
            
            if(error){
                console.log(error)
                throw new Error()
            }

            setClients(data?.map(d => {
                return {
                    ...d,
                    numBookings: counts[d?.id]
                }
            }))

            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            return;
            
        } catch (error) {
            console.log(error)
            return fetchClientsFailure({ errorMsg: 'Something went wrong! Try again' })
        }
    }
    const fetchClientsFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        toast.error(errorMsg)

        return;
    }

    return (
        <div className="flex lg:h-screen">
            {/* Sidebar */}
            <div
                className={`
          fixed top-0 left-0 h-full w-xs md:w-md 
          bg-grey-50 lg:bg-transparent border-r border-primary-100
          flex flex-col gap-4 px-3 py-6 z-50
          transform transition-transform duration-300
          ${Sidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
        `}
            >
                {/* Close btn on mobile */}
                <div className="lg:hidden flex justify-end mb-3">
                    <X
                        size={30}
                        onClick={() => setSidebar(false)}
                        className="cursor-pointer"
                    />
                </div>

                {/* Search bar */}
                <div className="max-w-[400px]">
                    <Input
                        className="bg-grey-50 border-grey-300 py-3 rounded-xl w-full"
                        placeholder="Search"
                    />
                </div>

                {/* Chat list */}
                {clients.map((client, i) => {

                    const { name, state, country, profile_img, numBookings } = client

                    const handleClientClick = () => {
                        setActiveUser(client)
                        setSidebar(false)
                    }

                    return (
                        <div
                            key={i}
                            onClick={handleClientClick}
                            className="flex flex-col md:flex-row gap-2 border-b border-grey-200 pb-4 p-2 w-full cursor-pointer"
                        >
                            <img 
                                className="border-primary-400 border-2 rounded-full h-12 w-12"
                                src={profile_img || "https://res.cloudinary.com/dqcmfizfd/image/upload/v1756168978/testing/mother-family-mom-svgrepo-com_uz0o5c.png"}
                                alt={profile_img ? "Profile image" : "Dummy profile"}
                            />
                            <div className="flex flex-col flex-1">
                                <p className="text-grey-800 font-medium">{ name }</p>
                                <p className="text-grey-500 text-sm truncate capitalize">
                                    { country } { state }
                                </p>
                            </div>
                            {
                                numBookings > 0
                                &&
                                    <div className="flex md:flex-col flex-row items-end gap-1">
                                        {/* <p className="text-[13px]">4:00 AM</p> */}
                                        <div className="flex gap-1.5 items-center">
                                            {/* <Icon
                                                icon="mi:notification-off"
                                                width="20"
                                                height="20"
                                                className="text-grey-500"
                                            /> */}
                                            <span className="rounded-full bg-primary-100 text-primary-500 px-2 text-sm">
                                                { formatNumberWithCommas(numBookings) } booking{numBookings > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>                                
                            }
                        </div>
                    )}
                )}
            </div>

            {
                !activeChat || !activeUser
                ?
                    <div className="flex-1 flex flex-col mt-4">
                        <button
                            onClick={() => setSidebar(true)}
                            className="lg:hidden cursor-pointer"
                        >
                            <Menu size={24} />
                        </button>                        
                        <div className="flex flex-col items-center justify-center h-full text-grey-400">
                            <Icon
                                icon="mdi:message-text-outline"
                                width="48"
                                height="48"
                                className="text-primary-700"
                            />
                            <p className="text-sm text-grey-500 text-center">
                                Select a chat from the menu
                            </p>
                        </div>     
                    </div>
                :           
                    <Chat 
                        setSidebar={setSidebar}
                        userInfo={activeUser}
                        selectedChat={activeChat}
                    />                
            }
            {/* Delete modal  */}
            {/* <DeleteMessage /> */}
        </div>
    );
};

export default Inbox;
