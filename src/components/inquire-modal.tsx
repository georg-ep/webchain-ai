"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function InquireModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transmit signal");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
      
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="panel overflow-hidden rounded-2xl text-ink sm:max-w-[440px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(52,211,153,0.10),transparent_70%)]"
        />
        <DialogHeader className="relative">
          <DialogTitle className="font-display text-2xl text-ink">
            Book a Call
          </DialogTitle>
          <DialogDescription className="font-mono text-[11px] font-light leading-relaxed text-ink-3">
            Tell us what you&apos;re building. We reply within 24 hours to schedule a free
            30-minute architecture call.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="relative grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="h-11 rounded-lg border-line bg-white/[0.03] font-mono text-xs text-ink transition-colors placeholder:text-ink-4 focus-visible:border-signal/40 focus-visible:ring-2 focus-visible:ring-signal/15"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
              Work Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="h-11 rounded-lg border-line bg-white/[0.03] font-mono text-xs text-ink transition-colors placeholder:text-ink-4 focus-visible:border-signal/40 focus-visible:ring-2 focus-visible:ring-signal/15"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
              What are you building?
            </Label>
            <Textarea
              id="message"
              placeholder="The workflow you want to automate, the decisions that stall, the scale you operate at..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="min-h-[110px] rounded-lg border-line bg-white/[0.03] font-mono text-xs text-ink transition-colors placeholder:text-ink-4 focus-visible:border-signal/40 focus-visible:ring-2 focus-visible:ring-signal/15"
            />
          </div>

          {status === "error" && (
            <div className="rounded-lg border border-fault/25 bg-fault-soft p-2.5 font-mono text-[10px] text-fault">
              ERROR: {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-signal/25 bg-signal-soft p-2.5 font-mono text-[10px] text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse"/>
              RECEIVED — WE&apos;LL BE IN TOUCH WITHIN 24 HOURS
            </div>
          )}

          <Button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="btn-cta btn-sweep mt-4 h-12 rounded-full bg-white font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Sent" : "Request the Call"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
