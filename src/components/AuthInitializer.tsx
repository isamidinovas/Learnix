import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUser } from "../store/thunks/authThunk";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [dispatch, token, isAuthenticated, user]);

  return null;
};

export default AuthInitializer;
