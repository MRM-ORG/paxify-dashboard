import { fetchUserStores } from "@/apiCalls/auth";
import { REELS_VERSION } from "@/constants";
import { getUser } from "@/utils/auth";

interface CustomWindow extends Window {
  ReelsInitializer?: any;
}

export const loadReels = async (id: string) => {
  const customizedWindow: CustomWindow = window;

  const user = getUser();
  if (!user) return;

  const stores = await fetchUserStores(user.uid);

  console.log("Using Reels Version:", REELS_VERSION);

  const loadReelsScript = () => {
    const reelsScript = document.createElement("script");
    reelsScript.id = "reels-script";
    reelsScript.src = `https://cdn.jsdelivr.net/gh/paxify-llc/builds@${REELS_VERSION}/reelife/paxify-reelife.min.js`;

    document.body.appendChild(reelsScript);

    reelsScript.onload = () => {
      if (typeof customizedWindow.ReelsInitializer === "function") {
        // @ts-ignore
        const reels = new ReelsInitializer({
          elementId: id,
          uid: user.uid,
          storeId: stores[0].id,
        });
        reels.render();
      }
    };
  };

  const loadReelsStylesheet = () => {
    const stylesheet = document.createElement("link");
    stylesheet.id = "reels-stylesheet";
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute(
      "href",
      `https://cdn.jsdelivr.net/gh/paxify-llc/builds@${REELS_VERSION}/reelife/paxify-reelife.min.css`
    );
    document.head.appendChild(stylesheet);
  };

  loadReelsStylesheet();
  loadReelsScript();
};
