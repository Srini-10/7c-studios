import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  theme = "light",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <header
      className={cx(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cx("max-w-3xl", align === "center" && "mx-auto")}>
        <p className={cx("eyebrow", theme === "dark" ? "text-bone/60" : "text-oxblood")}>
          {eyebrow}
        </p>
        <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1.02]">
          {title}
          {accent ? (
            <>
              {" "}
              <em className="display-italic text-oxblood">{accent}</em>
            </>
          ) : null}
        </h2>
        {description ? (
          <p
            className={cx(
              "mt-6 max-w-xl text-[0.95rem] leading-[1.85]",
              theme === "dark" ? "text-bone/58" : "text-taupe",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
