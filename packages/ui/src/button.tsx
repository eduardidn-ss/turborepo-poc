"use client";

import { ReactNode } from "react";
import { getVersionInfo } from "./version";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  showVersion?: boolean;
}

export const Button = ({
  children,
  className,
  appName,
  showVersion = false,
}: ButtonProps) => {
  const versionInfo = getVersionInfo();

  return (
    <button
      className={className}
      onClick={() =>
        alert(
          `Hello from your ${appName} app! Using ${versionInfo.displayName}`
        )
      }
      style={{
        borderLeft: showVersion ? `4px solid ${versionInfo.color}` : undefined,
        position: "relative",
      }}
    >
      {children}
      {showVersion && (
        <span
          style={{
            fontSize: "10px",
            color: versionInfo.color,
            marginLeft: "8px",
            fontWeight: "bold",
          }}
        >
          v{versionInfo.version}
        </span>
      )}
    </button>
  );
};
