import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Hero, TerminalComponent, QuickStats, FeaturedProjects, CTASection } from '@/components/Home';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <Hero />
        <TerminalComponent />
        <QuickStats />
        <FeaturedProjects />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}