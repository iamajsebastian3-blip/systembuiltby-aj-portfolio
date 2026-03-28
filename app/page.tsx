import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Counter } from "@/components/motion/counter";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <ScrollReveal>
        <h1 className="text-4xl font-black text-white">System Built by AJ</h1>
      </ScrollReveal>
      <div className="text-5xl font-black text-persian">
        <Counter target={60} suffix="%" />
      </div>
    </main>
  );
}
