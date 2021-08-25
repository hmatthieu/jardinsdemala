import { navigate } from "gatsby";
import { SyntheticEvent } from "react";

export function processHref(href: string | undefined) {
  const hostPosition = href ? href.search(window.document.location.host) : -1;

  if (hostPosition >= 0 && hostPosition < 10) {
    return href.slice(hostPosition + window.document.location.host.length);
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
