import { GTM_HEAD_SCRIPT, GTM_BODY_IFRAME } from "@/constants";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const addGTMScriptToHead = () => {
      if (document.getElementById("gtm-dashboard-script")) return;
      const gtmScript = document.createElement("script");
      gtmScript.id = "gtm-dashboard-script";
      gtmScript.src = GTM_HEAD_SCRIPT;
      gtmScript.async = true;

      const head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(gtmScript);
    };

    const addGTMIFrameToBody = () => {
      if (document.getElementById("gtm-dashboard-frame")) return;
      const noscript = document.createElement("noscript");
      const iframe = document.createElement("iframe");
      iframe.id = "gtm-dashboard-frame";
      iframe.src = GTM_BODY_IFRAME;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";

      noscript.appendChild(iframe);

      const body = document.body || document.getElementsByTagName("body")[0];
      body.insertBefore(noscript, body.firstChild);
    };

    addGTMScriptToHead();
    addGTMIFrameToBody();
  }, []);

  return <Component {...pageProps} />;
}
