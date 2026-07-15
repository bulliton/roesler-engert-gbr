import Image from "next/image";
import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  imageSrc,
  imageAlt = "",
  imageClassName = "object-cover object-center",
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc);

  if (!hasImage) {
    return (
      <section className="border-b border-primary/10 py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline as="h1" bar={false}>
              {title}
            </Headline>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {subtitle}
            </p>
            {children}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative -mt-[var(--header-offset)] min-h-[min(72vh,40rem)] overflow-hidden border-b border-primary/10">
      <div className="absolute inset-0">
        <Image
          src={imageSrc!}
          alt={imageAlt}
          fill
          priority
          className={imageClassName}
          sizes="100vw"
          quality={90}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(102deg, rgba(23,23,23,0.88) 0%, rgba(23,23,23,0.72) 34%, rgba(23,23,23,0.28) 58%, rgba(23,23,23,0.08) 78%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(23,23,23,0.92) 0%, rgba(23,23,23,0.62) 48%, rgba(23,23,23,0.22) 72%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 18%)",
          }}
          aria-hidden
        />
        <div className="hero-grain absolute inset-0" aria-hidden />
      </div>

      <Container className="relative z-10 flex min-h-[min(72vh,40rem)] items-end pb-12 pt-[calc(var(--header-offset)+2.5rem)] md:items-center md:pb-16 md:pt-[calc(var(--header-offset)+3rem)]">
        <div className="max-w-2xl">
          <Eyebrow contrast className="!text-accent-gold">
            {eyebrow}
          </Eyebrow>
          <Headline as="h1" bar={false} contrast className="hero-text-shadow">
            {title}
          </Headline>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {subtitle}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
