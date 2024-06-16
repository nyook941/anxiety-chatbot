import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStore } from "@aws-amplify/datastore";
import { LazyUser, User } from "../../src/models";

interface UserInitialState {
  loggedIn: boolean;
  user: User | undefined;
  name: string;
  dob: string;
  generalInfo: string;
}

const initialState: UserInitialState = {
  loggedIn: true,
  user: undefined,
  name: "",
  dob: "",
  generalInfo: ""
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
      const userResponse = user[0];
      return {
        id: userResponse.id,
        username: userResponse.username,
        email: userResponse.email,
        birthdate: userResponse.birthdate,
        gender: userResponse.gender,
        createdAt: userResponse.createdAt,
        updatedAt: userResponse.updatedAt,
      } as User;
    } catch (error) {
      console.log("there was an error saving post\n", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) =>{
      state.name= action.payload;
    },
    setDob: (state, action: PayloadAction<string>) =>{
      state.dob = action.payload;
    },
    setGeneralInfo: (state, action: PayloadAction<string>) => {
      state.generalInfo = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postUserSignInData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.name = action.payload?.username || '';
      state.dob = action.payload?.birthdate || '';
    });
  },
});

export const {setName, setDob, setGeneralInfo, updateUser} = userSlice.actions;

export default userSlice.reducer;
