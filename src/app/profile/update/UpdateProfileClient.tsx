"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

export default function UpdateProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("প্রোফাইল আপডেট করতে সাইন ইন করুন।", { id: "profile-update-auth-required" });
      router.push("/signin?callbackURL=/profile/update");
    }
  }, [isPending, session, router]);

  const currentName = name !== "" ? name : session?.user?.name || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = currentName.trim();
    if (!finalName) {
      toast.error("নামের ঘরটি খালি রাখা যাবে না।");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: finalName,
      });

      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        window.location.href = "/profile";
      }
    } catch {
      toast.error("তথ্য আপডেট করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="max-w-lg w-full mx-auto px-4 py-12 animate-pulse">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28" />
            <div className="h-7 bg-gray-200 rounded w-44" />
            <div className="h-4 bg-gray-100 rounded w-60" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-11 bg-gray-100 rounded-xl w-full" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-11 bg-gray-200 rounded-xl flex-1" />
            <div className="h-11 bg-gray-100 rounded-xl w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-full mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors mb-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            প্রোফাইলে ফিরে যান
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">তথ্য আপডেট</h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              আপনার নাম (Name)
            </label>
            <input
              id="update-name-input"
              type="text"
              required
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="নতুন নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#047F39] focus:border-transparent"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              id="update-info-submit"
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-[#047F39] hover:bg-[#036B30] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "আপডেট করা হচ্ছে..." : "তথ্য আপডেট করুন (Update Information)"}
            </button>
            <Link
              href="/profile"
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
