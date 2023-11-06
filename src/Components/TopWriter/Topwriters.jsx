import Writer from "./Writer";
import Marquee from "react-fast-marquee";

const Topwriters = () => {
  const writers = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Mike Johnson" },
    { name: "Emily Wilson" },
    { name: "David Brown" },
    { name: "Lisa Davis" },
  ];
  return (
    <div className="mt-20">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        Top Writers
      </h1>
      <div className="flex mt-10">
        <Marquee pauseOnHover={true} speed={90}>
          {writers.map((writer) => (
            <Writer key={writer.name} writer={writer}></Writer>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Topwriters;
