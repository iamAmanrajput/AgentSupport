import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, role: "", isAuthenticated: false },
  reducers: {
    setUserLogin: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.role = user.role;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user_profile", JSON.stringify(user));
      }
    },
    setUserLogout: (state) => {
      state.user = null;
      state.role = "";
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_profile");
      }
    },
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user_profile");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          state.user = user;
          state.role = user.role;
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { setUserLogin, setUserLogout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
