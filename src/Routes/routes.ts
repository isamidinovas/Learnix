import { FC } from "react";
import Home from "../Pages/Home";

export interface RouteData {
  permissions: ReadonlyArray<string>;
  page: FC;
}

export const routeMap = new Map<string, RouteData>().set("/", {
  page: Home,
  permissions: [],
});
//   .set("/forgot-password-email", {
//     page: pages.ForgotPasswordByEmail,
//     permissions: [],
//   })
//   .set("/password/reset/confirm/:uid/:token", {
//     page: pages.ResetPassword,
//     permissions: [],
//   })
//   .set("/first_auth/:uid/:token", {
//     page: pages.FirstAuth,
//     permissions: [],
//   })
//   .set("/register", {
//     page: pages.Register,
//     permissions: [],
//   });

export const routeArray = Array.from(routeMap, ([path, r]) => ({ ...r, path }));
