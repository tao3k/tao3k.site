type TaoLogoProps = {
  readonly className?: string;
  readonly compact?: boolean;
};

export function TaoLogo({ className = "", compact = false }: TaoLogoProps) {
  const classes = ["tao-logo", compact ? "tao-logo-compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <svg className="tao-logo-symbol" viewBox="0 0 96 72" aria-hidden="true" focusable="false">
        <rect className="tao-logo-symbol-bg" x="2" y="2" width="92" height="68" rx="8" />
        <path className="tao-logo-symbol-aura" d="M8 57C25 43 39 46 53 35C68 23 78 18 89 14" />
        <path
          className="tao-logo-three-mark"
          d="M18 17H45C55 17 60 22 60 29C60 34 56 38 49 39H34M34 39H50C59 39 64 44 64 52C64 59 58 63 47 63H18"
        />
        <path className="tao-logo-k-mark" d="M72 18V63M74 40L89 18M74 40L90 63" />
      </svg>
      <span className="tao-logo-lockup">
        <span className="tao-logo-wordline" aria-label="tao3k">
          <span className="tao-logo-tao">tao</span>
          <span className="tao-logo-three">3</span>
          <span className="tao-logo-k">k</span>
        </span>
        {!compact && (
          <span className="tao-logo-subtitle">tao 3000 / infinite agent infrastructure</span>
        )}
      </span>
    </span>
  );
}
