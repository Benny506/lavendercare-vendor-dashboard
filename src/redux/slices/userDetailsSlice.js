import { getAppointmentStatus, sortByStatusPriority } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        profile: null,
        services: [],
        bookings: [],
    },
    reducers: {
        setUserDetails: (state, action) => {
            if(action?.payload?.profile){
                state.profile = action.payload?.profile
            }

            if(action?.payload?.services){
                state.services = action?.payload?.services
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
        },
        clearUserDetails: (state, action) => {
            state.profile = null
            state.services = []
            state.bookings = []
        }        
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer