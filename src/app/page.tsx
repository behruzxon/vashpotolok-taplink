import { PremiumBackground } from '@/components/premium-background'
import { HeroSection } from '@/components/hero-section'
import { MainCTAButtons } from '@/components/main-cta-buttons'
import { PriceEstimateCard } from '@/components/price-estimate-card'
import { ServicesGrid } from '@/components/services-grid'
import { TrustBadges } from '@/components/trust-badges'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { ProcessSteps } from '@/components/process-steps'
import { StickyBottomCTA } from '@/components/sticky-bottom-cta'
import { FooterCTA } from '@/components/footer-cta'
import { RevealOnScroll } from '@/components/primitives/reveal-on-scroll'
import { links } from '@/data/links'
import { services } from '@/data/services'
import { portfolio } from '@/data/portfolio'
import { trust } from '@/data/trust'

export default function Page() {
  return (
    <>
      <PremiumBackground />

      <main className="relative mx-auto flex w-full max-w-[480px] flex-col gap-7 px-5 pb-32 pt-2">
        <HeroSection />

        <RevealOnScroll>
          <MainCTAButtons links={links} />
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <PriceEstimateCard />
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <ServicesGrid items={services} />
        </RevealOnScroll>

        <RevealOnScroll delay={240}>
          <TrustBadges items={trust} />
        </RevealOnScroll>

        <RevealOnScroll delay={320}>
          <PortfolioPreview items={portfolio} portfolioLink={links.instagram} />
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <ProcessSteps />
        </RevealOnScroll>

        <RevealOnScroll delay={480}>
          <FooterCTA phone={links.phone} phoneDisplay={links.phoneDisplay} />
        </RevealOnScroll>
      </main>

      <StickyBottomCTA phone={links.phone} />
    </>
  )
}
