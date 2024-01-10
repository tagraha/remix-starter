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
import { jsxDEV } from "react/jsx-dev-runtime";
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
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
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
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
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
var isProduction = !1, sessionStorage = createCookieSessionStorage({
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
var tailwind_default = "/build/_assets/tailwind-YTENSMYF.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
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
  return /* @__PURE__ */ jsxDEV2(ThemeProvider, { specifiedTheme: data.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsxDEV2(App, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
function App() {
  let data = useLoaderData(), [theme] = useTheme();
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", className: clsx(theme), children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(PreventFlashOnWrongTheme, { ssrTheme: Boolean(data.theme) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
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
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
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
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 46,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/dropdown-menu.tsx
import * as React2 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root, DropdownMenuTrigger = DropdownMenuPrimitive.Trigger, DropdownMenuGroup = DropdownMenuPrimitive.Group, DropdownMenuPortal = DropdownMenuPrimitive.Portal, DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuSubTrigger = React2.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
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
      /* @__PURE__ */ jsxDEV4(ChevronRight, { className: "ml-auto h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 35,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 25,
    columnNumber: 3
  },
  this
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 45,
    columnNumber: 3
  },
  this
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React2.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV4(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 62,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 61,
  columnNumber: 3
}, this));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 81,
    columnNumber: 3
  },
  this
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React2.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
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
      /* @__PURE__ */ jsxDEV4("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV4(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV4(Check, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 108,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 107,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 106,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 97,
    columnNumber: 3
  },
  this
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV4("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV4(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV4(Circle, { className: "h-2 w-2 fill-current" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 130,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 129,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 121,
    columnNumber: 3
  },
  this
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 145,
    columnNumber: 3
  },
  this
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 161,
    columnNumber: 3
  },
  this
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV4(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 174,
    columnNumber: 5
  },
  this
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
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  let [, setTheme] = useTheme2();
  return /* @__PURE__ */ jsxDEV5("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [
    /* @__PURE__ */ jsxDEV5("h1", { children: "Welcome to Remix" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Button, { className: "mx-20", onClick: () => setTheme(Theme.DARK), children: "Dark" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Button, { onClick: () => setTheme(Theme.LIGHT), children: "Light" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("ul", { children: [
      /* @__PURE__ */ jsxDEV5("li", { children: /* @__PURE__ */ jsxDEV5(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/blog",
          rel: "noreferrer",
          children: "15m Quickstart Blog Tutorial"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 54,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("li", { children: /* @__PURE__ */ jsxDEV5(
        "a",
        {
          target: "_blank",
          href: "https://remix.run/tutorials/jokes",
          rel: "noreferrer",
          children: "Deep Dive Jokes App Tutorial"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 63,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("li", { children: /* @__PURE__ */ jsxDEV5("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(DropdownMenu, { children: [
      /* @__PURE__ */ jsxDEV5(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV5(Button, { variant: "outline", children: "Open" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 78,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV5(DropdownMenuContent, { className: "w-56", children: [
        /* @__PURE__ */ jsxDEV5(DropdownMenuLabel, { children: "My Account" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 82,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuSeparator, {}, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 83,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(User, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 86,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "Profile" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 87,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u21E7\u2318P" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 88,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 85,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(CreditCard, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 91,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "Billing" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 92,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u2318B" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 93,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 90,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(Settings, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 96,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "Settings" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 97,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u2318S" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 98,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 95,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(Keyboard, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 101,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "Keyboard shortcuts" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 102,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u2318K" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 103,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 100,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 84,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuSeparator, {}, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 106,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(Users, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 109,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "Team" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 110,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 108,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuSub, { children: [
            /* @__PURE__ */ jsxDEV5(DropdownMenuSubTrigger, { children: [
              /* @__PURE__ */ jsxDEV5(UserPlus, { className: "mr-2 h-4 w-4" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 114,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV5("span", { children: "Invite users" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 115,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 113,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuPortal, { children: /* @__PURE__ */ jsxDEV5(DropdownMenuSubContent, { children: [
              /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsxDEV5(Mail, { className: "mr-2 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 120,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV5("span", { children: "Email" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 121,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 119,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsxDEV5(MessageSquare, { className: "mr-2 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 124,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV5("span", { children: "Message" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 125,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 123,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5(DropdownMenuSeparator, {}, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 127,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsxDEV5(PlusCircle, { className: "mr-2 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 129,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV5("span", { children: "More..." }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 130,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 128,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 118,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 117,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 112,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsxDEV5(Plus, { className: "mr-2 h-4 w-4" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 136,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5("span", { children: "New Team" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 137,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u2318+T" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 138,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 135,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 107,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuSeparator, {}, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 141,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxDEV5(Github, { className: "mr-2 h-4 w-4" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 143,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("span", { children: "GitHub" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 144,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 142,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxDEV5(LifeBuoy, { className: "mr-2 h-4 w-4" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 147,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("span", { children: "Support" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 148,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 146,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { disabled: !0, children: [
          /* @__PURE__ */ jsxDEV5(Cloud, { className: "mr-2 h-4 w-4" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 151,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("span", { children: "API" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 152,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 150,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuSeparator, {}, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 154,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsxDEV5(LogOut, { className: "mr-2 h-4 w-4" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 156,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("span", { children: "Log out" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 157,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5(DropdownMenuShortcut, { children: "\u21E7\u2318Q" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 158,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 155,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 81,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-OTDZ5OXY.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-LY53ASPY.js", "/build/_shared/chunk-CN2XOPTZ.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-2MYZG3I3.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-KZTFWNWZ.js", imports: ["/build/_shared/chunk-OIOWWOTV.js", "/build/_shared/chunk-NMZL6IDN.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-2A54NBYG.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/action.set-theme": { id: "routes/action.set-theme", parentId: "root", path: "action/set-theme", index: void 0, caseSensitive: void 0, module: "/build/routes/action.set-theme-JDBUG4AI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "ef8a0148", hmr: { runtime: "/build/_shared/chunk-2MYZG3I3.js", timestamp: 1704878422136 }, url: "/build/manifest-EF8A0148.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
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
//# sourceMappingURL=index.js.map
