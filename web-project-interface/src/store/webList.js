import { createSlice } from "@reduxjs/toolkit";

export const projectListSlice = createSlice({
    name: "projectList",

    /* state keeps count of how many times the web item list has been updated. This is used to trigger the web list to be re-rendered in App.js */
    initialState: {
        itemUpdatedCount: 0,
    },

    reducers : {
        /* increments the state of itemUpdatedCount */
        updateItemCount: (state) => {
                state.itemUpdatedCount += 1
            },
        }
})

export const {updateItemCount} = projectListSlice.actions

export default projectListSlice.reducer