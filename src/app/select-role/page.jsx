"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const roles = [
  {
    key: "user",
    label: "Customer",
    desc: "Browse books, place orders, track deliveries",
    icon: <FiShoppingCart size={20} />,
    iconBg: "rgba(99,153,34,0.15)",
    iconColor: "#639922",
  },
  {
    key: "librarian",
    label: "Librarian",
    desc: "Manage books, inventory, and process orders",
    icon: <FiShoppingBag size={20} />,
    iconBg: "rgba(249,115,22,0.12)",
    iconColor: "#f97316",
  },
];

export default function SelectRolePage() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);

    try {
      const res = await fetch("/api/user/set-role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selected }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(`Welcome!`);
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-[#121212]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212]/80 p-8 shadow-2xl">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            Choose your <span className="text-orange-500">Role</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">How will you use our platform?</p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelected(role.key)}
              className={`w-full flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200
                ${selected === role.key
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-white/10 bg-white/3 hover:border-orange-500/40"
                }`}
            >
              <div
                className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: role.iconBg, color: role.iconColor }}
              >
                {role.icon}
              </div>
              <div className="flex-1">
                <span className="font-medium text-white">{role.label}</span>
                <p className="mt-0.5 text-xs text-zinc-500">{role.desc}</p>
              </div>
              <div className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border transition-all
                ${selected === role.key ? "border-orange-500 bg-orange-500" : "border-white/20"}`}
              />
            </button>
          ))}
        </div>

        <Button
          onPress={handleContinue}
          isLoading={loading}
          disabled={!selected}
          className={`mt-5 h-11 w-full rounded-xl font-semibold transition-all
            ${selected ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
        >
          Continue
        </Button>
      </div>
    </section>
  );
}