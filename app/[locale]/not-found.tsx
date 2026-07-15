import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("metadata");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl text-primary/20">404</p>
      <h1 className="mt-4 font-display text-3xl text-primary">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Button href="/">{t("siteName")}</Button>
      </div>
    </Container>
  );
}
