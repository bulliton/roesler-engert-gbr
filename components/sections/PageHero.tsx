import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <Section className="bg-primary-light diamond-pattern !py-20 md:!py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-secondary uppercase">
            {eyebrow}
          </p>
          <Headline as="h1">{title}</Headline>
          <p className="mt-6 text-lg text-muted leading-relaxed">{subtitle}</p>
          {children}
        </div>
      </Container>
    </Section>
  );
}
