import Banner from "../Banner/Banner";
import LatestBlogs from "../LatestBlog/LatestBlogs";
import NewsLetter from "../NewsLetter/NewsLetter";
import Testimonials from "../Testimonials/Testimonials";
import Topwriters from "../TopWriter/Topwriters";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestBlogs />
      <NewsLetter />
      <Testimonials />
      <Topwriters />
    </div>
  );
};

export default Home;
