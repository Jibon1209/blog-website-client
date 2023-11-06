import Testimonial from "./Testimonial";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Inc.",
      message:
        "I stumbled upon this blog website, and it's become my daily source of inspiration and information. The diverse range of topics and the quality of content is outstanding. I'm grateful for the valuable insights it provides.",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Corporation",
      message:
        "As a writer and avid reader, I appreciate a well-organized and informative blog platform. This website not only offers engaging content but also a user-friendly experience. It's my go-to place for staying informed and entertained.",
    },
  ];

  return (
    <div className="mt-20 ">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Testimonial
            key={testimonial.id}
            testimonial={testimonial}
          ></Testimonial>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
