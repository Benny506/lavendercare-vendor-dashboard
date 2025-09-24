import { getAppointmentStatus, sortByStatusPriority } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        profile: null,
        session: null,
        user: null,
        services: [],
        bookings: [],
        phone_number: {
            phone_number: null,
            country_code: null
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            if(action?.payload?.profile){
                state.profile = action.payload?.profile
            }

            if(action?.payload?.services){
                state.services = action?.payload?.services
            }

            if(action?.payload?.session){
                state.session = action?.payload?.session
            }

            if(action?.payload?.user){
                state.user = action?.payload?.user
            }            

            if(action?.payload?.bookings){
                const bookings = (action.payload?.bookings || []).map(b => {

                    const { status, start_hour, end_hour, day } = b

                    return {
                        ...b,
                        status: getAppointmentStatus({
                            status,
                            date_ISO: new Date(day).toISOString(),
                            startHour: start_hour,
                            endHour: end_hour
                        })
                    }
                })
                
                state.bookings = sortByStatusPriority(bookings)
            }

            if(action?.payload?.phone_number){
                const number = action?.payload?.phone_number 

                if(number?.phone_number && number?.country_code){
                    state.phone_number.country_code = number?.country_code
                    state.phone_number.phone_number = number?.phone_number
                }
            }
        },
        clearUserDetails: (state, action) => {
            state.profile = null
            state.session = null
            state.user = null
            state.services = []
            state.bookings = []
            state.phone_number = {
                phone_number: null,
                country_code: null                
            }
        }        
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer