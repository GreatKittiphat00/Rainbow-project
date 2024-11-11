import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
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
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
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
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
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
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  const [language, setLanguage] = useState("TH");
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => prevLanguage === "TH" ? "EN" : "TH");
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "min-h-screen bg-white flex items-center justify-center",
      style: { fontFamily: "Kanit, sans-serif" },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat rounded-[45px] shadow-lg shadow-inner",
          style: {
            width: "1891px",
            height: "888px",
            backgroundImage: "url('/background-home.png')",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1), inset 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.3)",
            marginTop: "59px"
          },
          children: [
            /* @__PURE__ */ jsx(
              "link",
              {
                href: "https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap",
                rel: "stylesheet"
              }
            ),
            /* @__PURE__ */ jsx(
              "link",
              {
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
                rel: "stylesheet"
              }
            ),
            /* @__PURE__ */ jsxs("header", { className: "w-full bg-opacity-80 flex justify-between items-center fixed top-0 z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("img", { src: "/logo-rainbow.png", alt: "Rainbow Logo", className: "w-20 h-20 ml-[54px]" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 ml-1", children: "BETA" })
              ] }),
              /* @__PURE__ */ jsxs("nav", { className: "space-x-6 text-gray-700", children: [
                /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-900", children: "คำถามที่พบบ่อย" }),
                /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-900", children: "ที่ตั้งร้าน" }),
                /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-900", children: "ติดต่อเรา" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: toggleLanguage,
                    "aria-label": "Toggle Language",
                    className: "hover:text-gray-900 font-semibold text-blue-500",
                    children: language
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("main", { className: "flex flex-col items-center mt-[-130px] text-center px-4 bg-opacity-80 p-8 rounded-lg", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/logo-rainbow.png",
                  alt: "Rainbow Logo",
                  className: "w-[200px] h-[200px] drop-shadow-[20px_20px_40px_rgba(0,0,0,0.25)]"
                }
              ),
              /* @__PURE__ */ jsxs(
                "h1",
                {
                  className: "text-[110px] font-bold text-gray-800",
                  style: {
                    letterSpacing: "0.05em",
                    fontFamily: "Inter, sans-serif"
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "R" }),
                    /* @__PURE__ */ jsx("span", { className: "text-orange-500", children: "a" }),
                    /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "i" }),
                    /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "n" }),
                    /* @__PURE__ */ jsx("span", { className: "text-blue-500", children: "b" }),
                    /* @__PURE__ */ jsx("span", { className: "text-indigo-500", children: "o" }),
                    /* @__PURE__ */ jsx("span", { className: "text-purple-500", children: "w" }),
                    /* @__PURE__ */ jsx("span", { style: { color: "#212121", fontSize: "45px", letterSpacing: "0.02em" }, children: "Digital Photo." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "mt-4 text-[78px]",
                  style: {
                    color: "#9E9E9E",
                    letterSpacing: "0.2em",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    fontWeight: "400",
                    transform: "scaleY(1.2)",
                    marginTop: "-35px"
                  },
                  children: language === "TH" ? "ร้านถ่ายรูปครบวงจร" : "Full-Service Photo Shop"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[22px] mt-2 text-gray-600", style: { color: "#212121", transform: "scaleY(1.1)", letterSpacing: "0.05em", marginTop: "45px" }, children: language === "TH" ? "รับงานสื่อดิจิตอล ถ่ายรูปด่วนรอรับได้ ถ่ายตัดต่อใส่สูท บริการออนไลน์." : "Digital media services, quick photo shoots, suit photos, online services." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "mt-16 bg-red-500 text-white py-4 px-12 rounded-[15px] text-lg font-light hover:bg-red-600 transition duration-300",
                  style: { transform: "scaleY(1.1)", letterSpacing: "0.05em" },
                  children: language === "TH" ? "เริ่มต้นใช้งาน" : "Get Started"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DJjRLgg0.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-f-aVmGCt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-ByWssv11.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-f-aVmGCt.js"], "css": ["/assets/root-dBEV0nYO.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-B1rbed-n.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-db681f68.js", "version": "db681f68" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false, "unstable_routeConfig": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
