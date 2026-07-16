import { type ComponentProps } from "react";
import { Link } from "@/lib/navigation";

type ButtonVariant =
  | "primary"
  | "teal"
  | "inverse"
  | "inverse-contrast"
  | "accent"
  | "outline"
  | "outline-contrast";
type ButtonShape = "rect" | "pill";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  href?: string;
  external?: boolean;
  hash?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-gold text-primary border-accent-gold hover:bg-accent-gold-light hover:border-accent-gold-light",
  teal:
    "bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark hover:text-white",
  inverse:
    "bg-white text-primary border-white hover:bg-primary hover:text-white hover:border-primary",
  "inverse-contrast":
    "bg-white text-primary border-white hover:bg-transparent hover:text-white hover:border-white",
  accent:
    "bg-accent-gold text-primary border-accent-gold hover:bg-accent-gold-light hover:border-accent-gold-light",
  outline:
    "bg-transparent text-primary border-primary/25 hover:border-primary",
  "outline-contrast":
    "bg-transparent text-white/90 border-white/35 hover:border-white hover:text-white",
};

const shapes: Record<ButtonShape, string> = {
  rect: "rounded-sm",
  pill: "rounded-full",
};

const base =
  "inline-flex min-h-10 items-center justify-center border px-7 py-2 text-sm font-normal tracking-[0.02em] transition-[color,background-color,border-color] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Button({
  variant = "primary",
  shape = "rect",
  href,
  external,
  hash,
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
    if (hash) {
      return (
        <Link href={{ pathname: href as "/", hash }} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <Link href={href as "/"} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
