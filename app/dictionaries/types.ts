import { AdminDict } from "./dashboard/admin/types";
import { DashboardDict } from "./dashboard/user/types";
import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { LoginDict } from "./login/types";
import { PlansDict } from "./plans/types";

export type DictSection = "layout" | "home" | "login" | "plans" | "dashboard" | "admin";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
  login: LoginDict;
  plans: PlansDict;
  dashboard: DashboardDict;
  admin: AdminDict;
}
