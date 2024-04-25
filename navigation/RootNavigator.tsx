import React from "react";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigation from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { checkSignIn } from "../redux/slices/auth-slice";

export default function RootNavigator() {
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  dispatch(checkSignIn());

  return <>{loggedIn ? <DrawerNavigation /> : <AuthNavigator />}</>;
}
