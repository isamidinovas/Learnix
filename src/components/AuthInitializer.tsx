import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUser } from "../store/thunks/authThunk";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, user]);

  return null;
};

export default AuthInitializer;
