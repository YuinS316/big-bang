import { cn } from "~/lib/utils";

export default function Loading() {
  return (
    <div className={cn("flex h-[100dvh] items-center justify-center")}>
      <div className={cn("flex items-center gap-1 font-pacifico text-3xl")}>
        <span className={cn("animate-bounce animate-delay-0")}>L</span>
        <span className={cn("animate-bounce animate-delay-100")}>o</span>
        <span className={cn("animate-bounce animate-delay-200")}>a</span>
        <span className={cn("animate-bounce animate-delay-300")}>d</span>
        <span className={cn("animate-delay-400 animate-bounce")}>i</span>
        <span className={cn("animate-bounce animate-delay-500")}>n</span>
        <span className={cn("animate-delay-600 animate-bounce")}>g</span>
        <span className={cn("animate-bounce animate-delay-700")}>.</span>
        <span className={cn("animate-delay-800 animate-bounce")}>.</span>
        <span className={cn("animate-delay-900 animate-bounce")}>.</span>
      </div>
    </div>
  );
}
