import banner from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 px-4 lg:px-0 relative z-0">
      <img className="w-full h-full rounded-xl" src={banner} alt="..." />
      <div className="absolute rounded-xl flex items-center h-full  left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
        <div className=" space-y-4 pl-12 ">
          <h1 className="uppercase text-xl lg:text-5xl font-bold text-accent">
            WellCome To Blog Trekker
          </h1>
          <p className=" text-accentDark">
            Discover, Share, and Explore the World of Blogs on Our Platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
