import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { LoginDict } from "./login/types";

export type DictSection = "layout" | "home" | "login";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
  login: LoginDict;
}
