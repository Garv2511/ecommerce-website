import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import DealsSection from "../components/home/DealsSection";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <DealsSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;