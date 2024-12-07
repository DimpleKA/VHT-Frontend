import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: 'allUser',
  initialState: {
    usersList: [], // Initial state is an empty array
  },
  reducers: {
    // Replaces the entire user list
    setUserList: (state, action) => {
      state.usersList = action.payload; // Replace current usersList with the new array
    },

    // Appends an array of users to the existing list
    addUserList: (state, action) => {
      state.usersList.push(...action.payload); // Spread the new array into the existing list
    },

    // Deletes all users (clears the list)
    deleteUserList: (state) => {
      state.usersList = []; // Resets the user list to an empty array
    },
  },
});

export const { setUserList, addUserList, deleteUserList } = allUserSlice.actions;
export default allUserSlice.reducer;
