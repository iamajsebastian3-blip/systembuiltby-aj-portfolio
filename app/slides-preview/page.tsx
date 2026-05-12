import { ShowcaseSlider } from "@/components/sections/showcase-slider";

export const metadata = {
  title: "Showcase Slider Preview",
};

export default function SlidesPreviewPage() {
  return (
    <main className="min-h-screen">
      <div className="px-6 pt-10 pb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow mb-2">
          Preview only — not on home page yet
        </p>
        <p className="text-sm text-white/45">
          Click the side cards or arrows to navigate. Click the center card to open that page.
        </p>
      </div>
      <ShowcaseSlider />
    </main>
  );
}
