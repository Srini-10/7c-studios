import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  const classes = cx("text-link group", className);
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </>
  );

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
