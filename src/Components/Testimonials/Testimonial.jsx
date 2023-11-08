import { Avatar, Blockquote } from "flowbite-react";
import avatarPic from "../../assets/avatar.jpg";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Testimonial = ({ testimonial }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const animation = useAnimation();

  const { name, company, message } = testimonial;

  useEffect(() => {
    console.log(inView);
    if (inView) {
      animation.start({
        rotate: 360,
        scale: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
          stiffness: 260,
          damping: 20,
        },
      });
    }
    if (!inView) {
      animation.start({ scale: 0 });
    }
  }, [inView]);

  return (
    <div ref={ref} className="mt-20 mx-4">
      <motion.div animate={animation}>
        <figure className="mx-auto max-w-screen-md text-center">
          <svg
            className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <Blockquote>
            <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
              {message}
            </p>
          </Blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-3">
            <Avatar rounded size="xs" img={avatarPic} alt="profile picture" />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                {name}
              </cite>
              <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                {company}
              </cite>
            </div>
          </figcaption>
        </figure>
      </motion.div>
    </div>
  );
};
Testimonial.propTypes = {
  testimonial: PropTypes.object.isRequired,
};
export default Testimonial;
