import React from "react";

const HeroPreview = () => {
  return (
    <div className="relative mx-auto mt-20 w-full max-w-6xl transition-all duration-500 hover:-translate-y-1 hover:cursor-pointer">
      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <div className="size-2.5 rounded-full bg-primary/30" />
          <div className="size-2.5 rounded-full bg-primary/30" />
          <div className="size-2.5 rounded-full bg-primary/30" />

          <div className="ml-4 h-7 w-40 rounded-lg bg-secondary sm:w-56" />
        </div>

        {/* Content */}
        <div className="grid min-h-90 md:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border bg-secondary/30 p-5 md:block">
            {/* <LumaLogo compact /> */}

            <nav className="mt-10 flex flex-col gap-4 text-xs">
              <span className="rounded-lg border border-border bg-background px-3 py-2 font-medium text-foreground shadow-sm">
                Conversations
              </span>

              <span className="text-muted-foreground transition-colors hover:text-foreground">
                Knowledge Base
              </span>

              <span className="text-muted-foreground transition-colors hover:text-foreground">
                Integrations
              </span>

              <span className="text-muted-foreground transition-colors hover:text-foreground">
                Settings
              </span>
            </nav>
          </aside>

          {/* Main */}
          <div className="p-6 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Tuesday, October 15
                </p>

                <h3 className="mt-2 font-heading text-2xl">
                  Customer Conversations
                </h3>
              </div>

              <div className="hidden rounded-xl border border-border bg-secondary px-3 py-2 text-xs text-primary sm:block">
                AI Agent Online
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Open Conversations", "42"],
                ["AI Resolution", "91%"],
                ["Avg Response", "18 sec"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>

                  <p className="mt-3 font-heading text-2xl">{value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="mt-5 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
              <div className="min-h-35 rounded-2xl bg-secondary/70 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span>Conversation Volume</span>

                  <span className="text-primary">+18%</span>
                </div>

                <div className="mt-7 flex items-end gap-2">
                  {[32, 45, 38, 62, 54, 76, 88, 72, 94].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-primary/80 transition-all duration-300 hover:bg-primary"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="min-h-35 rounded-2xl border border-border p-4">
                <p className="text-xs text-muted-foreground">Recent Activity</p>

                <p className="mt-3 text-sm font-medium">
                  AI resolved 12 conversations
                </p>

                <p className="mt-2 text-xs text-primary">Today · 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;
