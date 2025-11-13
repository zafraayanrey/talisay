import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example async thunk
export const fetchCount = createAsyncThunk("counter/fetchCount", async () => {
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve(5), 500)
  );
  return response;
});

const counterSlice = createSlice({
  name: "countries",
  initialState: {
    value: "zaf",
  },
  reducers: {
    country: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value += action.payload;
      })
      .addCase(fetchCount.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { country } = counterSlice.actions;
export default counterSlice.reducer;
