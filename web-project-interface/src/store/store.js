import {configureStore} from "@reduxjs/toolkit"
import webListReducer from "./webList"

export default configureStore({
    reducer: {
        webList: webListReducer,
    },
})