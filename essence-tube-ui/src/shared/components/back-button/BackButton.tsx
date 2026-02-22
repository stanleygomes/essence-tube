'use client';



import { useRouter } from "next/navigation";
import Typography from "@shared/ui/typography/Typography";
import Button from "@shared/ui/button/Button";

export interface IBackButton {
  showBackButton: boolean;
  backButtonText?: string;
  backRoute?: string;
}

export default function BackButton({
  showBackButton,
  backButtonText,
  backRoute,
}: IBackButton) {
  const router = useRouter();

  if (!showBackButton) return null;

  return (
    <Button
      type="button"
      color="transparent"
      onClick={() => {
        if (backRoute) {
          router.push(backRoute);
        } else {
          router.back();
        }
      }}
      className="mr-2 flex items-center gap-2 justify-center"
      aria-label="Voltar"
      icon="arrow-left"
    >
      {backButtonText && (
        <Typography variant="span">{backButtonText}</Typography>
      )}
    </Button>
  );
}
