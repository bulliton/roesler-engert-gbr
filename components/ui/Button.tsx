import { type ComponentProps } from "react";
import { Link } from "@/lib/navigation";

type ButtonVariant = "primary" | "outline" | "outline-contrast";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-white border-secondary hover:bg-primary hover:border-primary",
  outline:
    "bg-transparent text-primary border-primary hover:bg-primary hover:text-white",
  "outline-contrast":
    "bg-transparent text-white border-white hover:bg-white hover:text-primary",
};

export function Button({
  variant = "outline",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${variants[variant]} ${className}`;

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
