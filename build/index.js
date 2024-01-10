var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  App: () => App,
  default: () => AppWithProviders,
  links: () => links,
  loader: () => loader
});
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";

// app/sessions.server.tsx
import { createThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage } from "@remix-run/node";
var isProduction = !0, sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: !0,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...isProduction ? { domain: "your-production-domain.com", secure: !0 } : {}
  }
}), themeSessionResolver = createThemeSessionResolver(sessionStorage);

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-USGCE3XG.css";

// app/root.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
async function loader({ request }) {
  let { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
}
function AppWithProviders() {
  let data = useLoaderData();
  return /* @__PURE__ */ jsx2(ThemeProvider, { specifiedTheme: data.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsx2(App, {}) });
}
function App() {
  let data = useLoaderData(), [theme] = useTheme();
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: clsx(theme), children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(PreventFlashOnWrongTheme, { ssrTheme: Boolean(data.theme) }),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/action.set-theme.ts
var action_set_theme_exports = {};
__export(action_set_theme_exports, {
  action: () => action
});
import { createThemeAction } from "remix-themes";
var action = createThemeAction(themeSessionResolver);

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
import { Theme, useTheme as useTheme2 } from "remix-themes";

// app/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// app/lib/utils.ts
import { clsx as clsx2 } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx2(inputs));
}

// app/components/ui/button.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsx3(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    }
  )
);
Button.displayName = "Button";

// app/components/ui/dropdown-menu.tsx
import * as React2 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root, DropdownMenuTrigger = DropdownMenuPrimitive.Trigger, DropdownMenuGroup = DropdownMenuPrimitive.Group, DropdownMenuPortal = DropdownMenuPrimitive.Portal, DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuSubTrigger = React2.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs2(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx4(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React2.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx4(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx4(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx4(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React2.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs2(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx4("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx4(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx4(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs2(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx4("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx4(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx4(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx4(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx4(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// app/routes/_index.tsx
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users
} from "lucide-react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  let [, setTheme] = useTheme2();
  return /* @__PURE__ */ jsxs3("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [
    /* @__PURE__ */ jsx5("h1", { children: "Welcome to Remix" }),
    /* @__PURE__ */ jsx5(Button, { className: "mx-20", onClick: () => setTheme(Theme.DARK), children: "Dark" }),
    /* @__PURE__ */ jsx5(Button, { onClick: () => setTheme(Theme.LIGHT), children: "Light" }),
    /* @__PURE__ */ jsxs3("ul", { children: [
      /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/blog",
          rel: "noreferrer",
          children: "15m Quickstart Blog Tutorial"
        }
      ) }),
      /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/jokes",
          rel: "noreferrer",
          children: "Deep Dive Jokes App Tutorial"
        }
      ) }),
      /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })
    ] }),
    /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
      /* @__PURE__ */ jsx5(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsx5(Button, { variant: "outline", children: "Open" }) }),
      /* @__PURE__ */ jsxs3(DropdownMenuContent, { className: "w-56", children: [
        /* @__PURE__ */ jsx5(DropdownMenuLabel, { children: "My Account" }),
        /* @__PURE__ */ jsx5(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs3(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(User, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "Profile" }),
            /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u21E7\u2318P" })
          ] }),
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(CreditCard, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "Billing" }),
            /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u2318B" })
          ] }),
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(Settings, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "Settings" }),
            /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u2318S" })
          ] }),
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(Keyboard, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "Keyboard shortcuts" }),
            /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u2318K" })
          ] })
        ] }),
        /* @__PURE__ */ jsx5(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs3(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(Users, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "Team" })
          ] }),
          /* @__PURE__ */ jsxs3(DropdownMenuSub, { children: [
            /* @__PURE__ */ jsxs3(DropdownMenuSubTrigger, { children: [
              /* @__PURE__ */ jsx5(UserPlus, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx5("span", { children: "Invite users" })
            ] }),
            /* @__PURE__ */ jsx5(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs3(DropdownMenuSubContent, { children: [
              /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsx5(Mail, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx5("span", { children: "Email" })
              ] }),
              /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsx5(MessageSquare, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx5("span", { children: "Message" })
              ] }),
              /* @__PURE__ */ jsx5(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsx5(PlusCircle, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx5("span", { children: "More..." })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx5(Plus, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx5("span", { children: "New Team" }),
            /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u2318+T" })
          ] })
        ] }),
        /* @__PURE__ */ jsx5(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx5(Github, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx5("span", { children: "GitHub" })
        ] }),
        /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx5(LifeBuoy, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx5("span", { children: "Support" })
        ] }),
        /* @__PURE__ */ jsxs3(DropdownMenuItem, { disabled: !0, children: [
          /* @__PURE__ */ jsx5(Cloud, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx5("span", { children: "API" })
        ] }),
        /* @__PURE__ */ jsx5(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs3(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx5(LogOut, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx5("span", { children: "Log out" }),
          /* @__PURE__ */ jsx5(DropdownMenuShortcut, { children: "\u21E7\u2318Q" })
        ] })
      ] })
    ] })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-K6KTUZWZ.js", imports: ["/build/_shared/chunk-ERRTZJHL.js", "/build/_shared/chunk-OQN3TCYU.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-3KC5R7O6.js", imports: ["/build/_shared/chunk-DLBZCQ64.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-QE7QRHP6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/action.set-theme": { id: "routes/action.set-theme", parentId: "root", path: "action/set-theme", index: void 0, caseSensitive: void 0, module: "/build/routes/action.set-theme-JSIJNEPO.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "ba6e1294", hmr: void 0, url: "/build/manifest-BA6E1294.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/action.set-theme": {
    id: "routes/action.set-theme",
    parentId: "root",
    path: "action/set-theme",
    index: void 0,
    caseSensitive: void 0,
    module: action_set_theme_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
