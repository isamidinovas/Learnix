import { FC } from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AskEducators from "../Pages/AskEducators";
import { SignUp } from "../Pages/Register";
import FlashCards from "../Pages/FlashCards";
import TextBooks from "../Pages/TextBooks";
import AIChat from "../Pages/AIChat";
import Profile from "../Pages/Profile";
import Scribe from "../Pages/Scribe";

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
  })
  .set("/ai-chat", {
    page: AIChat,
    permissions: [],
  })
  .set("/profile", {
    page: Profile,
    permissions: [],
  })
  .set("/scribe", {
    page: Scribe,
    permissions: [],
  });

export const routeArray = Array.from(routeMap, ([path, r]) => ({ ...r, path }));
