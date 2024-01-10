import {
  require_jsx_runtime
} from "/build/_shared/chunk-NMZL6IDN.js";
import {
  esm_exports,
  init_esm
} from "/build/_shared/chunk-CN2XOPTZ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toCommonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/remix-themes/build/useBroadcastChannel.js
var require_useBroadcastChannel = __commonJS({
  "node_modules/remix-themes/build/useBroadcastChannel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useBroadcastChannel = void 0;
    var react_1 = require_react();
    function useBroadcastChannel(channelName, handleMessage, handleMessageError) {
      const channelRef = (0, react_1.useRef)(typeof window !== "undefined" && "BroadcastChannel" in window ? new BroadcastChannel(channelName + "-channel") : null);
      useChannelEventListener(channelRef, "message", handleMessage);
      useChannelEventListener(channelRef, "messageerror", handleMessageError);
      return (0, react_1.useCallback)((data) => {
        var _a;
        (_a = channelRef === null || channelRef === void 0 ? void 0 : channelRef.current) === null || _a === void 0 ? void 0 : _a.postMessage(data);
      }, [channelRef]);
    }
    exports.useBroadcastChannel = useBroadcastChannel;
    function useChannelEventListener(channelRef, event, handler = () => {
    }) {
      (0, react_1.useEffect)(() => {
        const channel = channelRef.current;
        if (channel) {
          channel.addEventListener(event, handler);
          return () => channel.removeEventListener(event, handler);
        }
      }, [channelRef, event, handler]);
    }
  }
});

// node_modules/remix-themes/build/theme-provider.js
var require_theme_provider = __commonJS({
  "node_modules/remix-themes/build/theme-provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTheme = exports.useTheme = exports.PreventFlashOnWrongTheme = exports.ThemeProvider = exports.mediaQuery = exports.themes = exports.Theme = void 0;
    var jsx_runtime_1 = require_jsx_runtime();
    var react_1 = require_react();
    var useBroadcastChannel_1 = require_useBroadcastChannel();
    var Theme;
    (function(Theme2) {
      Theme2["DARK"] = "dark";
      Theme2["LIGHT"] = "light";
    })(Theme = exports.Theme || (exports.Theme = {}));
    exports.themes = Object.values(Theme);
    var ThemeContext = (0, react_1.createContext)(void 0);
    ThemeContext.displayName = "ThemeContext";
    var prefersLightMQ = "(prefers-color-scheme: light)";
    var getPreferredTheme = () => window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;
    exports.mediaQuery = typeof window !== "undefined" ? window.matchMedia(prefersLightMQ) : null;
    function ThemeProvider({ children, specifiedTheme, themeAction }) {
      const [theme, setTheme] = (0, react_1.useState)(() => {
        if (specifiedTheme) {
          return exports.themes.includes(specifiedTheme) ? specifiedTheme : null;
        }
        if (typeof window !== "object")
          return null;
        return getPreferredTheme();
      });
      const mountRun = (0, react_1.useRef)(false);
      const broadcastThemeChange = (0, useBroadcastChannel_1.useBroadcastChannel)("remix-themes", (e) => setTheme(e.data));
      (0, react_1.useEffect)(() => {
        if (!mountRun.current) {
          mountRun.current = true;
          return;
        }
        if (!theme)
          return;
        fetch(`${themeAction}`, {
          method: "POST",
          body: JSON.stringify({ theme })
        });
        broadcastThemeChange(theme);
      }, [broadcastThemeChange, theme, themeAction]);
      (0, react_1.useEffect)(() => {
        const handleChange = (ev) => {
          setTheme(ev.matches ? Theme.LIGHT : Theme.DARK);
        };
        exports.mediaQuery === null || exports.mediaQuery === void 0 ? void 0 : exports.mediaQuery.addEventListener("change", handleChange);
        return () => exports.mediaQuery === null || exports.mediaQuery === void 0 ? void 0 : exports.mediaQuery.removeEventListener("change", handleChange);
      }, []);
      return (0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: [theme, setTheme], children });
    }
    exports.ThemeProvider = ThemeProvider;
    var clientThemeCode = `
(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'light'
    : 'dark';
  
  const cl = document.documentElement.classList;
  const dataAttr = document.documentElement.dataset.theme;

  if (dataAttr != null) {
    const themeAlreadyApplied = dataAttr === 'light' || dataAttr === 'dark';
    if (!themeAlreadyApplied) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  }
  
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;
    function PreventFlashOnWrongTheme({ ssrTheme }) {
      const [theme] = useTheme();
      return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("meta", { name: "color-scheme", content: theme === "light" ? "light dark" : "dark light" }), ssrTheme ? null : (0, jsx_runtime_1.jsx)("script", {
        // NOTE: we cannot use type="module" because that automatically makes
        // the script "defer". That doesn't work for us because we need
        // this script to run synchronously before the rest of the document
        // is finished loading.
        dangerouslySetInnerHTML: { __html: clientThemeCode }
      })] });
    }
    exports.PreventFlashOnWrongTheme = PreventFlashOnWrongTheme;
    function useTheme() {
      const context = (0, react_1.useContext)(ThemeContext);
      if (context === void 0) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
      return context;
    }
    exports.useTheme = useTheme;
    function isTheme(value) {
      return typeof value === "string" && exports.themes.includes(value);
    }
    exports.isTheme = isTheme;
  }
});

// node_modules/remix-themes/build/theme-server.js
var require_theme_server = __commonJS({
  "node_modules/remix-themes/build/theme-server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createThemeSessionResolver = void 0;
    var theme_provider_1 = require_theme_provider();
    var createThemeSessionResolver = (cookieThemeSession) => {
      const resolver = async (request) => {
        const session = await cookieThemeSession.getSession(request.headers.get("Cookie"));
        return {
          getTheme: () => {
            const themeValue = session.get("theme");
            return (0, theme_provider_1.isTheme)(themeValue) ? themeValue : null;
          },
          setTheme: (theme) => session.set("theme", theme),
          commit: () => cookieThemeSession.commitSession(session)
        };
      };
      return resolver;
    };
    exports.createThemeSessionResolver = createThemeSessionResolver;
  }
});

// node_modules/remix-themes/build/create-theme-action.js
var require_create_theme_action = __commonJS({
  "node_modules/remix-themes/build/create-theme-action.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createThemeAction = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports));
    var theme_provider_1 = require_theme_provider();
    var createThemeAction = (themeSessionResolver) => {
      const action = async ({ request }) => {
        const session = await themeSessionResolver(request);
        const { theme } = await request.json();
        if (!(0, theme_provider_1.isTheme)(theme)) {
          let message = theme ? `theme value of ${theme} is not a valid theme.` : `empty theme provided`;
          return (0, server_runtime_1.json)({
            success: false,
            message
          });
        }
        session.setTheme(theme);
        return (0, server_runtime_1.json)({ success: true }, {
          headers: { "Set-Cookie": await session.commit() }
        });
      };
      return action;
    };
    exports.createThemeAction = createThemeAction;
  }
});

// node_modules/remix-themes/build/index.js
var require_build = __commonJS({
  "node_modules/remix-themes/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createThemeAction = exports.PreventFlashOnWrongTheme = exports.isTheme = exports.Theme = exports.themes = exports.useTheme = exports.ThemeProvider = exports.createThemeSessionResolver = void 0;
    var theme_server_1 = require_theme_server();
    Object.defineProperty(exports, "createThemeSessionResolver", { enumerable: true, get: function() {
      return theme_server_1.createThemeSessionResolver;
    } });
    var theme_provider_1 = require_theme_provider();
    Object.defineProperty(exports, "ThemeProvider", { enumerable: true, get: function() {
      return theme_provider_1.ThemeProvider;
    } });
    Object.defineProperty(exports, "useTheme", { enumerable: true, get: function() {
      return theme_provider_1.useTheme;
    } });
    Object.defineProperty(exports, "themes", { enumerable: true, get: function() {
      return theme_provider_1.themes;
    } });
    Object.defineProperty(exports, "Theme", { enumerable: true, get: function() {
      return theme_provider_1.Theme;
    } });
    Object.defineProperty(exports, "isTheme", { enumerable: true, get: function() {
      return theme_provider_1.isTheme;
    } });
    Object.defineProperty(exports, "PreventFlashOnWrongTheme", { enumerable: true, get: function() {
      return theme_provider_1.PreventFlashOnWrongTheme;
    } });
    var create_theme_action_1 = require_create_theme_action();
    Object.defineProperty(exports, "createThemeAction", { enumerable: true, get: function() {
      return create_theme_action_1.createThemeAction;
    } });
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

export {
  clsx,
  clsx_default,
  require_build
};
//# sourceMappingURL=/build/_shared/chunk-OIOWWOTV.js.map
