"use client";

import { useState, useEffect } from "react";
import type { BillingType } from "../types";
import type { CloudinaryImage } from "../svg-upload/types";
import {
  getBillingTypesAction,
  getPlanSvgsAction,
} from "@/app/[lang]/(dashboard)/admin/plans/actions";

export function usePlanData(onBillingLoaded?: (defaultId: string) => void) {
  const [billingTypes, setBillingTypes] = useState<BillingType[]>([]);
  const [loadingBilling, setLoadingBilling] = useState(true);
  const [svgAssets, setSvgAssets] = useState<CloudinaryImage[]>([]);
  const [svgAssetsLoading, setSvgAssetsLoading] = useState(true);

  useEffect(() => {
    setLoadingBilling(true);
    getBillingTypesAction().then((res) => {
      if (res.success && res.data) {
        setBillingTypes(res.data);
        if (res.data[0]) onBillingLoaded?.(res.data[0].id);
      }
      setLoadingBilling(false);
    });

    setSvgAssetsLoading(true);
    getPlanSvgsAction().then((res) => {
      if (res.success && res.data) setSvgAssets(res.data);
      setSvgAssetsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { billingTypes, loadingBilling, svgAssets, svgAssetsLoading };
}
