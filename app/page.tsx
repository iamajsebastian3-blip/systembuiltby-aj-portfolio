import { Hero } from "@/components/sections/hero";
import { Vault } from "@/components/sections/vault";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vault />
      <Philosophy />
      <Services />
    </>
  );
}
