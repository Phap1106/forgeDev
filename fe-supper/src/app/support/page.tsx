"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AccountShell } from "@/components/account/AccountShell";

const MOCK_TICKETS = [
  {
    id: "#SUP-101",
    subject: "Question about billing",
    status: "Resolved",
    updatedAt: "02 Dec 2025",
  },
  {
    id: "#SUP-100",
    subject: "Tool activation issue",
    status: "Open",
    updatedAt: "30 Nov 2025",
  },
];

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Please fill in both subject and message.");
      return;
    }
    // TODO: call API create ticket
    toast.success("Support request submitted (demo only).");
    setSubject("");
    setMessage("");
  };

  return (
    <AccountShell
      activeKey="support"
      title="Support"
      subtitle="Create and track support requests for your ForgeVault account."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-sm font-semibold mb-1">New support request</h2>
          <p className="text-xs text-white/65 mb-3">
            Provide as much detail as possible so our team can assist you
            quickly.
          </p>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-sm"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition rounded-sm"
            >
              Submit request
            </button>
          </div>
        </form>

        <div className="border border-white/15 bg-white/5 rounded-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-semibold">Recent tickets</span>
            <span className="text-xs text-white/60">
              {MOCK_TICKETS.length} records (demo)
            </span>
          </div>

          <div className="divide-y divide-white/10 text-sm">
            {MOCK_TICKETS.map((t) => (
              <div key={t.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.subject}</div>
                  <div className="text-xs text-white/60 mt-0.5">
                    {t.id} · Updated {t.updatedAt}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-sm ${
                    t.status === "Open"
                      ? "bg-amber-400/20 text-amber-200"
                      : "bg-emerald-500/15 text-emerald-200"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}

            {MOCK_TICKETS.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-white/65">
                You do not have any support tickets yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
