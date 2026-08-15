import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedFoods from '../components/home/FeaturedFoods';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SpecialOffer from '../components/home/SpecialOffer';
import Testimonials from '../components/home/Testimonials';
import DownloadApp from '../components/home/DownloadApp';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layouts/Footer';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>

      <Categories />

      <FeaturedFoods />

      <div id="about" className="scroll-mt-24">
        <WhyChooseUs />
      </div>

      <SpecialOffer />

      <Testimonials />

      <DownloadApp />

      <Newsletter />

      <Contact />
    </>
  );
};

export default Home;
