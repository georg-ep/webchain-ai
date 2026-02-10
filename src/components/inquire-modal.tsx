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
      
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Transmission failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background-light dark:bg-[#0a0a0a] border-white/10 dark:text-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-light italic">
            Initiate Protocol
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-light text-xs">
            Submit your parameters for review. We engineer certainty.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-500">
              Name
            </Label>
            <Input
              id="name"
              placeholder="J. Oppenheimer"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="bg-white/5 border-white/10 text-xs font-mono focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-slate-700 dark:placeholder:text-slate-700"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-slate-500">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="director@losalamos.gov"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="bg-white/5 border-white/10 text-xs font-mono focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-slate-700 dark:placeholder:text-slate-700"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-500">
              Directives
            </Label>
            <Textarea
              id="message"
              placeholder="Brief on project scope and limitations..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "loading" || status === "success"}
              className="bg-white/5 border-white/10 text-xs font-mono text-slate-300 min-h-[100px] focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-slate-700 dark:placeholder:text-slate-700"
            />
          </div>

          {status === "error" && (
            <div className="text-red-500 text-[10px] font-mono border border-red-500/20 bg-red-500/10 p-2 rounded">
              ERROR: {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="text-emerald-500 text-[10px] font-mono border border-emerald-500/20 bg-emerald-500/10 p-2 rounded flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              SIGNAL RECEIVED AND ACKNOWLEDGED
            </div>
          )}

          <Button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="mt-4 bg-white text-black hover:bg-slate-200 text-xs font-bold uppercase tracking-[0.2em] rounded-sm h-10 transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Transmitting..." : status === "success" ? "Sent" : "Transmit Signal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
