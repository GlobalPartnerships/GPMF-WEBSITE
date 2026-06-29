import { HomeDict } from "./home/types";
import { LayoutDict } from "./layout/types";
import { PlansDict } from "./plans/types";
import { PilarsDict } from "./pilars/types";
import { PartnersDict } from "./partners/types";
import { ServicesDict } from "./services/types";
import { DiagnosisDict } from "./diagnosis/types";

export type DictSection = "layout" | "home" | "plans" | "pilars" | "partners" | "services" | "diagnosis";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
  plans: PlansDict;
  pilars: PilarsDict;
  partners: PartnersDict;
  services: ServicesDict;
  diagnosis: DiagnosisDict;
}
