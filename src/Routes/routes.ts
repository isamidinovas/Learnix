import { FC } from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AskEducators from "../Pages/AskEducators";
import { SignUp } from "../Pages/SignUp";
import FlashCards from "../Pages/FlashCards";
import TextBooks from "../Pages/TextBooks";

export interface RouteData {
  permissions: ReadonlyArray<string>;
  page: FC;
}

export const routeMap = new Map<string, RouteData>()
  .set("/", {
    page: Home,
    permissions: [],
  })
  .set("/login", {
    page: Login,
    permissions: [],
  })
  .set("/ask-educators", {
    page: AskEducators,
    permissions: [],
  })
  .set("/signup", {
    page: SignUp,
    permissions: [],
  })
  .set("/flashcards", {
    page: FlashCards,
    permissions: [],
  })
  .set("/textbooks", {
    page: TextBooks,
    permissions: [],
  });

export const routeArray = Array.from(routeMap, ([path, r]) => ({ ...r, path }));
