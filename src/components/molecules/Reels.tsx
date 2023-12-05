"use client";

import { useEffect } from "react";
import { loadReels } from "./reelsLoader";

const TARGET_ID = "paxify-app-preview";

const Reels: React.FC = () => {
  useEffect(() => {
    const helper = async () => {
      loadReels(TARGET_ID);
    };

    helper();
  }, []);

  return (
    <section id={TARGET_ID}>
      <div>Loading...</div>
    </section>
  );
};

export default Reels;
