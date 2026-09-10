import type { ReactNode } from 'react';

function IconBase({
  className,
  strokeWidth = 1.75,
  children,
}: {
  className?: string;
  strokeWidth?: number;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export const IconEye = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);

export const IconEyeOff = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.4 0 2.6-.3 3.7-.8" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </IconBase>
);

export const IconArrowUpRight = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </IconBase>
);

export const IconArrowDownLeft = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="M17 7 7 17" />
    <path d="M17 17H7V7" />
  </IconBase>
);

export const IconShieldCheck = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

export const IconChevronRight = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="m9 6 6 6-6 6" />
  </IconBase>
);

export const IconLock = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </IconBase>
);

export const IconBadgeCheck = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M12 2l2.4 1.4 2.8-.2 1.2 2.5 2.5 1.2-.2 2.8L22 12l-1.4 2.4.2 2.8-2.5 1.2-1.2 2.5-2.8-.2L12 22l-2.4-1.4-2.8.2-1.2-2.5-2.5-1.2.2-2.8L2 12l1.4-2.4-.2-2.8 2.5-1.2 1.2-2.5 2.8.2Z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

export const IconClock = ({ className }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </IconBase>
);

export const IconCheck = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z" />
  </svg>
);

export const IconSearch = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </IconBase>
);

export const IconTool = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.65 2.65-2.3-2.3Z" />
  </IconBase>
);

export const IconHome = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.5}>
    <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6Z" />
    <path d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19Z" />
    <path d="M14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16Z" />
    <path d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z" />
  </IconBase>
);

export const IconUsers = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M2.75 19c.6-3 3-5 6.25-5s5.65 2 6.25 5" />
    <path d="M15.5 5.3a3.25 3.25 0 0 1 0 6.2" />
    <path d="M18 14.3c2.4.5 4 2.1 4.5 4.7" />
  </IconBase>
);

export const IconChevronLeft = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="m15 6-6 6 6 6" />
  </IconBase>
);

export const IconMenu = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </IconBase>
);

export const IconX = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="M18 6 6 18M6 6l12 12" />
  </IconBase>
);

export const IconBell = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
    <path d="M9.7 19a2.3 2.3 0 0 0 4.6 0" />
  </IconBase>
);

export const IconLogOut = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" />
    <path d="M15 16.5 20 12l-5-4.5" />
    <path d="M20 12H9" />
  </IconBase>
);

export const IconSun = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </IconBase>
);

export const IconMoon = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
  </IconBase>
);

export const IconMapPin = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <path d="M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.25" />
  </IconBase>
);

export const IconChevronDown = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </IconBase>
);

export const IconSettings = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.75}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </IconBase>
);

export const IconRocket = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.5}>
    <path d="M14.5 9.5c2-2 5-2.5 6.5-2.5.5 1.5 0 4.5-2 6.5m-4.5-4c-2.5.5-5.5 2.5-7.5 6.5 1.5.2 3 .8 4 1.8s1.6 2.5 1.8 4c4-2 6-5 6.5-7.5m-4.5-4 4.5 4M6 15c-1.5.5-2 3-2.5 5 2-.5 4.5-1 5-2.5" />
    <circle cx="15" cy="9" r="1.25" />
  </IconBase>
);

export const IconApprovals = ({ className }: { className?: string }) => (
  <IconBase className={className} strokeWidth={1.5}>
    <path d="M14 18.5C14 18.5 15 18.5 16 20.5C16 20.5 19.1765 15.5 22 14.5" />
    <path d="M5.49995 11.5H5.49097" strokeWidth={2} />
    <path d="M11 19.5H10.5C6.74142 19.5 4.86213 19.5 3.60746 18.5091C3.40678 18.3506 3.22119 18.176 3.0528 17.9871C2 16.8062 2 15.0375 2 11.5C2 7.96252 2 6.19377 3.0528 5.0129C3.22119 4.82403 3.40678 4.64935 3.60746 4.49087C4.86213 3.5 6.74142 3.5 10.5 3.5H13.5C17.2586 3.5 19.1379 3.5 20.3925 4.49087C20.5932 4.64935 20.7788 4.82403 20.9472 5.0129C21.8957 6.07684 21.9897 7.61799 21.999 10.5V11" />
    <path d="M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z" />
  </IconBase>
);
