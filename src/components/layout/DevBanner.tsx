const SHOW_DEV_BANNER = true; // Set to false to hide the banner

export function DevBanner() {
  if (!SHOW_DEV_BANNER) return null;

  return (
    <div className="bg-primary text-primary-foreground text-xs font-medium overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block py-1.5">
        🚧 This website is currently under development. Some features may not be fully functional. Thank you for your patience! 🚧
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🚧 This website is currently under development. Some features may not be fully functional. Thank you for your patience! 🚧
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        🚧 This website is currently under development. Some features may not be fully functional. Thank you for your patience! 🚧
      </div>
    </div>
  );
}
