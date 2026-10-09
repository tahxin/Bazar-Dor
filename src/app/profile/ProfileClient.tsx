"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [signingOut, setSigningOut] = useState(false);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !signingOut && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন।", { id: "profile-auth-required" });
      router.push("/signin?callbackURL=/profile");
    }
  }, [isPending, session, signingOut, router]);

  if (isPending || !session) {
    return <ProfileSkeleton />;
  }

  const user = session.user;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন।");
    window.location.href = "/";
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#047F39] text-white flex items-center justify-center text-2xl font-bold shadow-sm">
              {initials}
            </div>
          )}
          <div className="text-center sm:text-left flex-1">
            <h1 id="profile-user-name" className="text-2xl font-extrabold text-gray-900">{user?.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#e0f2e9] text-[#047F39] text-xs font-semibold rounded-full">
              <span>✓</span> সক্রিয় অ্যাকাউন্ট
            </div>
          </div>
        </div>

        <div className="py-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              পুরো নাম
            </p>
            <p className="text-base font-medium text-gray-800 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
              {user?.name || "দেওয়া নেই"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              ইমেল ঠিকানা
            </p>
            <p className="text-base font-medium text-gray-800 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
              {user?.email || "দেওয়া নেই"}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
          <Link
            id="update-info-btn"
            href="/profile/update"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#047F39] hover:bg-[#036B30] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
          >
            <span>তথ্য আপডেট করুন</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
