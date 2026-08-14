import Navbar from '../components/layouts/Navbar';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedFoods from '../components/home/FeaturedFoods';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SpecialOffer from '../components/home/SpecialOffer';
import Testimonials from '../components/home/Testimonials';
import DownloadApp from '../components/home/DownloadApp';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layouts/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedFoods />
      <WhyChooseUs />
      <SpecialOffer />
      <Testimonials />
      <DownloadApp />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
