import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/loginSlice'
import allUserReducer from '../features/allUserSlice'

export default configureStore({
    reducer:{
    login:loginReducer,
    allUser:allUserReducer,
    },
})