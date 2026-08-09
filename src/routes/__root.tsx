import type { ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  Link as RouterLink,
} from "@tanstack/react-router";

import "../styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "tao3k xiuxian-artisan-workshop commercial site for governed AI agent infrastructure.",
      },
      { title: "tao3k xiuxian | Governed AI agent infrastructure" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return (
    <main className="not-found-shell">
      <p className="eyebrow">route not found</p>
      <h1>Unknown surface.</h1>
      <p>
        This path is not part of the xiuxian commercial runtime map. Return to the platform surface
        and continue from a governed route.
      </p>
      <RouterLink className="primary-action" to="/">
        Back to runtime
      </RouterLink>
    </main>
  );
}
