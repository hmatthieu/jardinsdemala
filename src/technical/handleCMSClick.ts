import { navigate } from "gatsby";
import { SyntheticEvent } from "react";

const host = "jardinsdemala.fr";

export function processHref(href: string | undefined) {
  const hostPosition = href ? href.search(host) : -1;

  if (hostPosition >= 0 && hostPosition < 10) {
    return href.slice(hostPosition + host.length);
  }
  return href;
}

export function handleCMSClick(e: SyntheticEvent<HTMLElement>) {
  const target = e.target as HTMLElement;
  const link = target.closest("a");
  if (link) {
    const processedHref = processHref(link.href);
    if (processedHref.startsWith("/")) {
      e.preventDefault();
      return navigate(processedHref);
    }
  }
}
