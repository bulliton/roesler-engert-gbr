import { type ComponentProps } from "react";
import { Link } from "@/lib/navigation";

type ButtonVariant =
  | "primary"
  | "inverse"
  | "accent"
  | "outline"
  | "outline-contrast";
type ButtonShape = "rect" | "pill";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  href?: string;
  external?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark",
  inverse:
    "bg-white text-primary border-white hover:bg-transparent hover:text-white",
  accent:
    "bg-accent-gold text-primary border-accent-gold hover:bg-accent-gold-light hover:border-accent-gold-light",
  outline:
    "bg-transparent text-primary border-primary/30 hover:border-primary",
  "outline-contrast":
    "bg-transparent text-white/90 border-white/35 hover:border-white hover:text-white",
};

const shapes: Record<ButtonShape, string> = {
  rect: "rounded-sm",
  pill: "rounded-full",
};

const base =
  "inline-flex min-h-10 items-center justify-center border px-7 py-2 text-xs font-normal tracking-[0.14em] uppercase transition-[color,background-color,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Button({
  variant = "primary",
  shape = "rect",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${shapes[shape]} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href as "/"} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
