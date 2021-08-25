import * as React from "react";
import { HTMLProps, PropsWithChildren } from "react";
import { Link } from "gatsby";
import { processHref } from "../technical/handleCMSClick";

interface Props {
  href: string;
  className?: HTMLProps<HTMLAnchorElement>["className"];
  style?: HTMLProps<HTMLAnchorElement>["style"];
}

export const AnyLink = ({
  href,
  children,
  className,
  style,
}: PropsWithChildren<Props>) => {
  const processedHref = processHref(href);
  const isExternal = !processedHref.startsWith("/");
  if (isExternal) {
    return (
      <a
        style={style}
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        style={style}
        className={className}
        activeClassName="active"
        to={href}
      >
        {children}
      </Link>
    );
  }
};
