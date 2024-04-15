import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStore } from "@aws-amplify/datastore";
import { LazyUser, User } from "../../src/models";

interface UserInitialState {
  loggedIn: boolean;
  user: User | undefined;
}

const initialState: UserInitialState = {
  loggedIn: true,
  user: undefined,
};

export const postUserSignInData = createAsyncThunk(
  "user/postSignInData",
  async (userData: {
    username: string;
    email: string | undefined;
    birthdate: string | undefined;
    id: string;
  }) => {
    try {
      const user = await DataStore.query(User, (c) => c.id.eq(userData.id));
      if (user.length === 0) {
        user[0] = await DataStore.save(
          new User({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            birthdate: userData.birthdate,
          })
        );
      }
      // return user[0];
    } catch (error) {
      console.log("there was an error saving post\n", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUserSignInData.fulfilled, (state, action) => {});
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
