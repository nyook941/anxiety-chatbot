import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "@aws-amplify/auth";

interface AuthInitialState {
  loggedIn: boolean;
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const initialState: AuthInitialState = {
  loggedIn: false,
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
};

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      console.log("thunk dispatched");
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log({ isSignedIn, nextStep });
      return { isSignedIn, nextStep };
    } catch (error) {
      console.log("error signing in", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {})
      .addCase(signInUser.fulfilled, (state, action) => {})
      .addCase(signInUser.rejected, (state, action) => {});
  },
});

export const { setUsername, setPassword, setConfirmPassword, setEmail } =
  authSlice.actions;

export default authSlice.reducer;
