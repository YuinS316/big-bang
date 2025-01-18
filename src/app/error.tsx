"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">抱歉，出现了一些错误</h2>
        <p className="text-muted-foreground">
          {error.message || "发生了未知错误，请稍后再试。"}
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        重新加载页面
      </button>
    </div>
  );
}
