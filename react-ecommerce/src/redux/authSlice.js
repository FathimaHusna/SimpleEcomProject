import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated : JSON.parse(localStorage.getItem("isAuthenticated"))||false,
    user: JSON.parse(localStorage.getItem("user"))|| null,

};
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
    register(state, action) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload))

    },

    login: (state)=>{
        state.isAuthenticated= true
        localStorage.setItem("isAuthenticated", true)
        },
        
   
    logout: (state)=>{
        state.isAuthenticated = false,
        state.user = null,
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("user")
    },
   },
});

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer