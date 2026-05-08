import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

interface RegisteredUsersCardProps {
  dict: Pick<AdminDict, "registeredUsers" | "quarterlyGoal">;
  count: string;
  goalPercent: number;
}

function GroupIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

export function RegisteredUsersCard({ dict, count, goalPercent }: RegisteredUsersCardProps) {
  return (
    <div className="bg-burgundy text-white p-6 rounded-sm flex-1" style={{ border: "1px solid rgba(122,15,50,0.3)" }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-rose-dim text-[11px] tracking-[0.12em] uppercase font-semibold">
            {dict.registeredUsers}
          </span>
          <h2 className="font-serif text-[40px] font-bold leading-tight mt-1">{count}</h2>
        </div>
        <div className="p-2.5 bg-white/10 rounded-sm">
          <GroupIcon />
        </div>
      </div>
      <div className="h-2 bg-white/15 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full rounded-full"
          style={{ width: `${goalPercent}%`, backgroundColor: "rgb(148, 255, 209)" }}
        />
      </div>
      <p className="text-rose-dim text-[13px]">
        {goalPercent}% {dict.quarterlyGoal}
      </p>
    </div>
  );
}
