import { DashboardDict } from "./dashboard/types";
import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { LoginDict } from "./login/types";
import { PlansDict } from "./plans/types";

export type DictSection = "layout" | "home" | "login" | "plans" | "dashboard";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
  login: LoginDict;
  plans: PlansDict;
  dashboard: DashboardDict;
}
