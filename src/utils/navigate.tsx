import Router from "next/router";

export const navigateNewPage = (href: any, params = {}) => {
  Router.push({
    pathname: href,
    query: params,
  });
};
