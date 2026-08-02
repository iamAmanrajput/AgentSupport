import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doc } from "@workspace/backend/_generated/dataModel";

export type StatusFilter = Doc<"conversations">["status"] | "all";

export interface StatusFilterState {
  value: StatusFilter;
}

const initialState: StatusFilterState = {
  value: "all",
};

const statusFilterSlice = createSlice({
  name: "statusFilter",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.value = action.payload;
    },

    resetStatusFilter: (state) => {
      state.value = "all";
    },
  },
});

export const { setStatusFilter, resetStatusFilter } = statusFilterSlice.actions;

export default statusFilterSlice.reducer;
