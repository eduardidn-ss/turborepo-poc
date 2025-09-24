import { type JSX } from "react";
import { getVersionInfo } from "./version";

export function Card({
  className,
  title,
  children,
  href,
  showVersion = false,
}: {
  readonly className?: string;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly href: string;
  readonly showVersion?: boolean;
}): JSX.Element {
  const versionInfo = getVersionInfo();

  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
      style={{
        borderTop: showVersion ? `3px solid ${versionInfo.color}` : undefined,
      }}
    >
      <h2>
        {title} <span>-&gt;</span>
        {showVersion && (
          <span
            style={{
              fontSize: "12px",
              color: versionInfo.color,
              marginLeft: "8px",
              fontWeight: "normal",
            }}
          >
            (UI v{versionInfo.version})
          </span>
        )}
      </h2>
      <p>{children}</p>
    </a>
  );
}
