"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import type { AdminUser } from "@/types";
import { logoutRequested } from "@/store/auth/reducer";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";

export function UserAccountControl({ user }: { user: AdminUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const signOut = () => {
    setConfirmingSignOut(false);
    dispatch(logoutRequested());
  };

  const openSignOutConfirmation = () => {
    setMenuOpen(false);
    setConfirmingSignOut(true);
  };

  return <div ref={containerRef} className="relative">
    <button ref={triggerRef} type="button" onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-1 rounded-full border border-slate-200 p-1.5 transition hover:border-brand-green hover:bg-slate-50" aria-label={`Open account menu for ${displayName}`} aria-haspopup="menu" aria-expanded={menuOpen}>
      <ProfileAvatar user={user} displayName={displayName} size={36} />
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 text-slate-500 transition ${menuOpen ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
    </button>
    {menuOpen && <div role="menu" className="absolute right-0 top-full z-40 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
      <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
        <ProfileAvatar user={user} displayName={displayName} size={44} />
        <div className="min-w-0"><p className="truncate font-semibold text-brand-navy">{displayName}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div>
      </div>
      <Link role="menuitem" href="/settings" onClick={() => setMenuOpen(false)} className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
        <SettingsIcon /> Settings
      </Link>
      <Link role="menuitem" href="/bookings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
        <CalendarIcon /> My bookings
      </Link>
      <button role="menuitem" type="button" onClick={openSignOutConfirmation} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50">
        <LogoutIcon /> Log out
      </button>
    </div>}
    <ConfirmationDialog
      isOpen={confirmingSignOut}
      onClose={() => setConfirmingSignOut(false)}
      onConfirm={signOut}
      title="Sign out?"
      description={`Are you sure you want to sign out of ${displayName}'s account?`}
      confirmText="Sign out"
      confirmVariant="destructive"
    />
  </div>;
}

function ProfileAvatar({ user, displayName, size }: { user: AdminUser; displayName: string; size: number }) {
  return <span className="relative shrink-0 overflow-hidden rounded-full bg-slate-200" style={{ width: size, height: size }}>
    <Image src={user.profile_picture || "/images/profile-placeholder.png"} alt={`${displayName}'s profile picture`} fill sizes={`${size}px`} className="object-cover" />
  </span>;
}

function SettingsIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.12.4.34.75.66 1 .31.25.7.39 1.1.4H21v4h-.1a1.7 1.7 0 0 0-1.5.6Z" /></svg>;
}

function LogoutIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5M15 12H3M14 3h4a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-4" /></svg>;
}

function CalendarIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><rect x="3" y="5" width="18" height="16" rx="2"/><path strokeLinecap="round" d="M8 3v4m8-4v4M3 10h18"/></svg>;
}
