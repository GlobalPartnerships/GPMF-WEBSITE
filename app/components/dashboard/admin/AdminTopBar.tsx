import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

interface AdminTopBarProps {
  dict: Pick<AdminDict, "dashboard" | "searchPlaceholder" | "downloadReports">;
}

function SearchIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
    </svg>
  );
}

export function AdminTopBar({ dict }: AdminTopBarProps) {
  return (
    <header className="flex items-center justify-between pb-8 border-b border-outline/15">
      <div className="flex items-center gap-5">
        <h1 className="font-serif text-[22px] font-semibold text-burgundy tracking-wide">
          {dict.dashboard}
        </h1>
        <div className="relative ml-3 hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant/50">
            <SearchIcon />
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-warmgray border border-outline/15 rounded-sm text-[13px] w-64 focus:ring-1 focus:ring-burgundy/40 focus:border-burgundy/40 focus:outline-none transition-all placeholder:text-surface-variant/40"
            placeholder={dict.searchPlaceholder}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn-sweep bg-burgundy text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] rounded-sm flex items-center gap-2 font-medium">
          <span className="flex items-center gap-2">
            <DownloadIcon />
            {dict.downloadReports}
          </span>
        </button>
        <button className="p-2 text-surface-variant hover:text-burgundy hover:bg-burgundy/5 rounded-sm transition-all">
          <BellIcon />
        </button>
        <button className="p-2 text-surface-variant hover:text-burgundy hover:bg-burgundy/5 rounded-sm transition-all">
          <GridIcon />
        </button>
        <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-outline/20 ml-1 flex items-center justify-center bg-burgundy text-white text-[12px] font-semibold">
          AR
        </div>
      </div>
    </header>
  );
}
