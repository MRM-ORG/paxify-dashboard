import { css } from "styled-components";

const breakpoints: any = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
  mdpiScreen: 1279,
  largeLaptop: 1439,
  fourK: 2160,
  tallPhone: "(max-width: 360px) and (min-height: 740px)",
};

export const mq: any = Object.keys(breakpoints).reduce(
  (accumulator: any, label) => {
    let prefix = typeof breakpoints[label] === "string" ? "" : "min-width:";
    let suffix = typeof breakpoints[label] === "string" ? "" : "px";
    accumulator[label] = (cls: any) =>
      css`
        @media (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `;
    return accumulator;
  },
  {}
);

export function isMobileDevice() {
  if (typeof window != "undefined") {
    let mq = window.matchMedia("(max-width: 768px)");
    return mq.matches;
  } else return null;
}
