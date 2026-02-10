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

export function InquireModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
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
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-500">
              Name
            </Label>
            <Input
              id="name"
              placeholder="J. Oppenheimer"
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
              className="bg-white/5 border-white/10 text-xs font-mono text-slate-300 min-h-[100px] focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-slate-700 dark:placeholder:text-slate-700"
            />
          </div>
          <Button type="submit" className="mt-4 bg-white text-black hover:bg-slate-200 text-xs font-bold uppercase tracking-[0.2em] rounded-sm h-10 transition-all">
            Transmit Signal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
