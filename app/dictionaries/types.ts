import { AdminDict } from "./dashboard/admin/types";
import { DashboardDict } from "./dashboard/user/types";
import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { LoginDict } from "./login/types";
import { PlansDict } from "./plans/types";
import { PilarsDict } from "./pilars/types";
import { PartnersDict } from "./partners/types";
import { ServicesDict } from "./services/types";

export type DictSection = "layout" | "home" | "login" | "plans" | "dashboard" | "admin" | "pilars" | "partners" | "services";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
  login: LoginDict;
  plans: PlansDict;
  dashboard: DashboardDict;
  admin: AdminDict;
  pilars: PilarsDict;
  partners: PartnersDict;
  services: ServicesDict;
}
