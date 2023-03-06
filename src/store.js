import authSlice from "./components/auth/authSlice";
import formImcSlice from "./components/formImc/formImcSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        auth: authSlice,
        formImc : formImcSlice
    }
})

export default store;