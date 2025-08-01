import React from "react";

interface SideBarItemProps {
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  isActive: boolean;
  onClick: () => void;
  isCompact?: boolean;
}

export default function SideBarItem({
  IconComponent,
  text,
  isActive,
  onClick,
  isCompact = false,
}: SideBarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group/item flex w-full items-center gap-4 rounded-lg p-3 transition-all duration-200 ${
        isActive
          ? "bg-[var(--color-primary)] text-white"
          : "hover:bg-[var(--color-primary-hover)] hover:text-white"
      } ${isCompact ? "sm:justify-center sm:px-2" : ""} `}
    >
      <IconComponent
        className={`h-6 w-6 flex-shrink-0 stroke-current stroke-[1.5px] ${isActive ? "" : "opacity-70 group-hover/item:opacity-100"} ${isCompact ? "sm:h-7 sm:w-7" : ""} transition-all duration-200`}
      />
      <span
        className={`text-sm font-medium whitespace-nowrap ${isActive ? "" : "opacity-70 group-hover/item:opacity-100"} ${isCompact ? "sm:hidden" : ""} transition-opacity duration-200`}
      >
        {text}
      </span>
    </button>
  );
}
