import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_DB_URL } from "../../firebaseConfig";

export const fetchImc = createAsyncThunk("formImc/fetchImc", 
async ( ) => {
    const response = await fetch(`${BASE_DB_URL}imc.json`);
    
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des albums !");
    }

    const data = await response.json();

    const tmpArray = [];

    
    for (const key in data) {

        tmpArray.push({ id: key, ...data[key] });
    }

    return tmpArray;
  }
);

export const addImc = createAsyncThunk(
  "formImc/addImc",
  async (imc, { getState }) => {
    const token = getState().auth.user.localId;
    if (token) {
      const response = await fetch(`${BASE_DB_URL}imc.json?auth=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imc),
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de nouvelles informations");
      }
      
      const data = await response.json();
      return { id: data.id, ...imc };
    }
  }
);

const formImcSlice = createSlice({
  name: "formImc",
  initialState: {
    imc: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImc.pending, (state) => {
        state.imc = []
        state.isLoading = true
        state.error = null
    })
  
    builder.addCase(fetchImc.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
  
    builder.addCase(fetchImc.fulfilled, (state, action) => {
        state.isLoading = false
        state.imc = action.payload
    })

    builder.addCase(addImc.fulfilled, (state, action) => {
      state.imc.push(action.payload);
      state.isLoading = false;
    });

    builder.addCase(addImc.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default formImcSlice.reducer;
