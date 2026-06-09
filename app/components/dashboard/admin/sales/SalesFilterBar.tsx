"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const inputClass =
  "px-3 py-2 text-[14px] border border-outline/30 rounded-lg bg-background text-foreground focus:outline-none focus:border-burgundy transition-colors";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export function SalesFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [orderId, setOrderId] = useState(searchParams.get("order_id") ?? "");
  const [userName, setUserName] = useState(searchParams.get("user_name") ?? "");
  const [userEmail, setUserEmail] = useState(searchParams.get("user_email") ?? "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("date_from") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("date_to") ?? "");
  const [amountMin, setAmountMin] = useState(searchParams.get("amount_min") ?? "");
  const [amountMax, setAmountMax] = useState(searchParams.get("amount_max") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (orderId.trim()) params.set("order_id", orderId.trim());
    if (userName.trim()) params.set("user_name", userName.trim());
    if (userEmail.trim()) params.set("user_email", userEmail.trim());
    if (dateFrom) params.set("date_from", dateFrom);
    if (dateTo) params.set("date_to", dateTo);
    if (amountMin.trim()) params.set("amount_min", amountMin.trim());
    if (amountMax.trim()) params.set("amount_max", amountMax.trim());

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  function clearFilters() {
    setOrderId("");
    setUserName("");
    setUserEmail("");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") applyFilters();
  }

  const hasFilters = orderId || userName || userEmail || dateFrom || dateTo || amountMin || amountMax;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">Order ID</label>
        <div className="relative">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by order ID..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">User name</label>
        <div className="relative">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by name..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">User email</label>
        <div className="relative">
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by email..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="min-w-[160px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">From date</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className={`${inputClass} w-full`}
        />
      </div>

      <div className="min-w-[160px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">To date</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className={`${inputClass} w-full`}
        />
      </div>

      <div className="min-w-[120px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">Min amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amountMin}
          onChange={(e) => setAmountMin(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0.00"
          className={`${inputClass} w-full`}
        />
      </div>

      <div className="min-w-[120px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">Max amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amountMax}
          onChange={(e) => setAmountMax(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0.00"
          className={`${inputClass} w-full`}
        />
      </div>

      <button
        onClick={applyFilters}
        disabled={isPending}
        className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
      >
        {isPending ? "Searching..." : "Search"}
      </button>

      {hasFilters && (
        <button
          onClick={clearFilters}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
