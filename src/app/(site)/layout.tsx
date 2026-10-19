import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";

/**
 * Marketing pages: full header with off-canvas menu, pre-footer and footer, and
 * Lenis smooth scrolling. The booking engine uses native scroll.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
