"use client";

import Image from "next/image";
import Link from "next/link";
import type { AppUser } from "@/app/context/UserContext";

interface MenuUserInfoProps {
  user: AppUser;
  lang: string;
  onClose: () => void;
}

export function MenuUserInfo({ user, lang, onClose }: MenuUserInfoProps) {
  const href =
    user.role === "admin" || user.role === "moderator"
      ? `/${lang}/admin`
      : `/${lang}/user`;

  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex items-center gap-4 pb-6 border-b border-gray-200/60 hover:border-gray-600/70 transition-colors duration-300"
    >
      <div className="ring-1 ring-black/10 group-hover:ring-burgundy transition-all duration-300 rounded-full shrink-0">
        {user.profile_image_url ? (
          <Image
            src={user.profile_image_url}
            alt={user.name}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy text-lg font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col transition-transform duration-200 group-hover:translate-x-1.5">
        <span className="font-semibold text-foreground text-base">{user.name}</span>
        <span className="text-xs text-foreground/50">{user.email}</span>
      </div>
    </Link>
  );
}
