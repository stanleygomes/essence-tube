import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
} from "@logos/ui";

type Testimonial = {
  name: string;
  occupation: string;
  comment: string;
  avatar: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="flex flex-col">
    <CardHeader className="flex items-center space-x-4">
      <Avatar className="w-12 h-12">
        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {testimonial.occupation}
        </p>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{testimonial.comment}</p>
    </CardContent>
  </Card>
);

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "João Silva",
      occupation: "Desenvolvedor de Software",
      comment:
        "O YouTube me bombardeia com anúncios irritantes e algoritmos que me fazem perder tempo precioso. Odeio isso!",
      avatar: "JS",
    },
    {
      name: "Maria Santos",
      occupation: "Designer Gráfica",
      comment:
        "As recomendações do YouTube são uma bagunça. Sempre me sugestionam vídeos que não me interessam. Frustrante!",
      avatar: "MS",
    },
    {
      name: "Pedro Oliveira",
      occupation: "Professor",
      comment:
        "YouTube está cheio de distrações. Não consigo focar no que realmente importa com tantas notificações e sugestões.",
      avatar: "PO",
    },
    {
      name: "Ana Costa",
      occupation: "Empresária",
      comment:
        "Os anúncios no YouTube são invasivos e interrompem meu fluxo de trabalho. Uma experiência terrível.",
      avatar: "AC",
    },
    {
      name: "Carlos Ferreira",
      occupation: "Estudante",
      comment:
        "YouTube me viciou com seu algoritmo manipulador. Perco horas assistindo coisas que não queria ver.",
      avatar: "CF",
    },
    {
      name: "Carlos Ferreira",
      occupation: "Estudante",
      comment:
        "YouTube me viciou com seu algoritmo manipulador. Perco horas assistindo coisas que não queria ver.",
      avatar: "CF",
    },
  ];

  return (
    <div className="inset-0 flex relative overflow-hidden w-full px-5 flex-col items-center justify-center bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] z-0">
      <div className="mx-auto w-container max-w-full py-16 lg:py-[100px]">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Amado pelos nossos usuários
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
