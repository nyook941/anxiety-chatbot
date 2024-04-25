import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConfirmResetPasswordInput,
  resetPassword,
  ResetPasswordOutput,
  signIn,
  signUp,
  confirmResetPassword,
  getCurrentUser,
} from "@aws-amplify/auth";

interface AuthInitialState {
  loggedIn: boolean;
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  code: string;
}

const initialState: AuthInitialState = {
  loggedIn: false,
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
  code: "",
};

export const checkSignIn = createAsyncThunk("auth/checkSignIn", async () => {
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
});

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log({ isSignedIn, nextStep });
      return { isSignedIn, nextStep };
    } catch (error) {
      console.log("error signing in", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    {
      username,
      password,
      email,
    }: { username: string; password: string; email: string },
    thunkAPI
  ) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      console.log(userId);
      return { isSignUpComplete, userId, nextStep };
    } catch (error) {
      console.log("error signing up:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async (
    {
      username,
      navigateCallback,
    }: { username: string; navigateCallback: () => void },
    thunkAPI
  ) => {
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output, navigateCallback);
    } catch (error) {
      console.log("error resetting password:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
function handleResetPasswordNextSteps(
  output: ResetPasswordOutput,
  navigateCallback: () => void
) {
  const { nextStep } = output;
  switch (nextStep.resetPasswordStep) {
    case "CONFIRM_RESET_PASSWORD_WITH_CODE":
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
      );
      navigateCallback();
      break;
    case "DONE":
      console.log("Successfully reset password.");
      break;
  }
}

export const handleConfirmResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async (
    {
      input,
      navigateCallback,
    }: {
      input: ConfirmResetPasswordInput;
      navigateCallback: () => void;
    },
    thunkAPI
  ) => {
    try {
      const { username, confirmationCode, newPassword } = input;
      await confirmResetPassword({
        username,
        confirmationCode,
        newPassword,
      });
      navigateCallback();
    } catch (error) {
      console.log("error resetting password:", error);
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
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSignIn.fulfilled, (state, action) => {
        state.loggedIn = action.payload;
      })

      .addCase(signInUser.pending, (state) => {})
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loggedIn = true;
      })
      .addCase(signInUser.rejected, (state, action) => {})

      .addCase(signUpUser.pending, (state) => {})
      .addCase(signUpUser.fulfilled, (state, action) => {})
      .addCase(signUpUser.rejected, (state, action) => {})

      .addCase(handleResetPassword.pending, (state) => {})
      .addCase(handleResetPassword.fulfilled, (state, action) => {})
      .addCase(handleResetPassword.rejected, (state, action) => {})

      .addCase(handleConfirmResetPassword.pending, (state) => {})
      .addCase(handleConfirmResetPassword.fulfilled, (state, action) => {})
      .addCase(handleConfirmResetPassword.rejected, (state, action) => {});
  },
});

export const {
  setUsername,
  setPassword,
  setConfirmPassword,
  setEmail,
  setCode,
} = authSlice.actions;

export default authSlice.reducer;
