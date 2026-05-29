import { PremiumBackground } from '@/components/premium-background'
import { HeroSection } from '@/components/hero-section'
import { MainCTAButtons } from '@/components/main-cta-buttons'
import { PriceEstimateCard } from '@/components/price-estimate-card'
import { ServicesGrid } from '@/components/services-grid'
import { TrustBadges } from '@/components/trust-badges'
import { VideoShowcase } from '@/components/video-showcase'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { TestimonialsSection } from '@/components/testimonials-section'
import { FAQSection } from '@/components/faq-section'
import { ProcessSteps } from '@/components/process-steps'
import { StickyBottomCTA } from '@/components/sticky-bottom-cta'
import { FooterCTA } from '@/components/footer-cta'
import { RevealOnScroll } from '@/components/primitives/reveal-on-scroll'
import { links } from '@/data/links'
import { services } from '@/data/services'
import { portfolio, hasRealPortfolioImages } from '@/data/portfolio'
import { trust } from '@/data/trust'
import { videos, hasRealVideoContent } from '@/data/videos'
import { testimonials, hasRealTestimonials } from '@/data/testimonials'
import { faq } from '@/data/faq'

export default function Page() {
  // Phase Bio-Ready: Video/Portfolio/Testimonials sectionlari faqat real
  // kontent bo'lganida ko'rinadi. Aks holda "demo" taassurot oldi olinadi.
  const showVideos = hasRealVideoContent(videos)
  const showPortfolio = hasRealPortfolioImages(portfolio)
  const showTestimonials = hasRealTestimonials(testimonials)

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

        {showVideos ? (
          <RevealOnScroll delay={320}>
            <VideoShowcase items={videos} instagramLink={links.instagram} />
          </RevealOnScroll>
        ) : null}

        {showPortfolio ? (
          <RevealOnScroll delay={380}>
            <PortfolioPreview items={portfolio} portfolioLink={links.instagram} />
          </RevealOnScroll>
        ) : null}

        <RevealOnScroll delay={440}>
          <FAQSection items={faq} />
        </RevealOnScroll>

        {showTestimonials ? (
          <RevealOnScroll delay={500}>
            <TestimonialsSection items={testimonials} />
          </RevealOnScroll>
        ) : null}

        <RevealOnScroll delay={560}>
          <ProcessSteps />
        </RevealOnScroll>

        <RevealOnScroll delay={620}>
          <FooterCTA phone={links.phone} phoneDisplay={links.phoneDisplay} />
        </RevealOnScroll>
      </main>

      <StickyBottomCTA phone={links.phone} />
    </>
  )
}
