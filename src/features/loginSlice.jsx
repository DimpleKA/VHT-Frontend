import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false,
        jwt: "",
        name: "",
        profileImg: "",
        email: "",
        mobile: "",
    },
    reducers: {
        login: (state, action) => {
            const { jwt, name, profileImg, email, mobile } = action.payload;
            state.isLoggedIn = true;
            state.jwt = jwt;
            state.name = name;
            state.profileImg = profileImg;
            state.email = email;
            state.mobile = mobile;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.jwt = "";
            state.name = "";
            state.profileImg = "";
            state.email = "";
            state.mobile = "";
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
