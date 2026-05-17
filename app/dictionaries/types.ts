import { AdminDict } from "./dashboard/admin/types";
import { DashboardDict } from "./dashboard/user/types";
import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { LoginDict } from "./login/types";
import { PlansDict } from "./plans/types";
import { PilarsDict } from "./pilars/types";
import { PartnersDict } from "./partners/types";
import { ServicesDict } from "./services/types";
import { CheckoutDict } from "./checkout/types";
import { CheckoutResultDict } from "./checkout-result/types";

export type DictSection = "layout" | "home" | "login" | "plans" | "dashboard" | "admin" | "pilars" | "partners" | "services" | "checkout" | "checkoutResult";

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
  checkout: CheckoutDict;
  checkoutResult: CheckoutResultDict;
}
