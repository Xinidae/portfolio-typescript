// assets
import homePageImg from "../assets/home-page.svg";
import phone from "../assets/phone.png";
import downloadIcon from "../assets/download-btn-icon.svg";
import XoaesisLogo from '../assets/XoaesisLogo.png'; // Import XoaesisLogo.png

// components
import { Button } from "../components";

// react-simple-typewriter
import { Typewriter } from "react-simple-typewriter";

// framer-motion
import { motion } from "framer-motion";

// utils
import { transition } from "../utils/transition";
import { fadeIn, scale } from "../utils/variants";



const Hero = () => {
  const scaleVariant = {
    visible: { scale: 1.25 }, // Make the image 25% bigger
  };

  return (
    <div
      id="home"
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: `url(${homePageImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="max-w-screen-2xl flex flex-col xl:flex-row xl:justify-between items-center xl:items-start gap-12 w-full py-16 px-12"
      >
        <div className="w-full xl:w-fit">
          <motion.h1
            variants={fadeIn("down")}
            transition={transition()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="w-full xl:w-fit text-center xl:text-start text-4xl sm:text-6xl lg:text-8xl font-bolt text-textPrimary uppercase"
          >
            <motion.img
              variants={fadeIn("down")}
              transition={transition()}
              initial="initial"
              animate="visible"
              src={XoaesisLogo}
              alt=""
              className="max-w-full flex items-center justify-center xl:justify-start"
            ></motion.img>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-textPrimary">
              Control Your Content
            </h1>
          </motion.h1>
          <motion.div
            variants={fadeIn("up")}
            transition={transition()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="my-12 flex flex-col sm:flex-row items-center gap-6 justify-center xl:justify-start"
          >
            <Button secondary>Learn More</Button>
          </motion.div>
        </div>

        <motion.img
          variants={scaleVariant} // Use the scale variant
          animate="visible" // Start the animation immediately
          transition={transition()}
          initial="hidden"
          whileHover="visible" // Add bobbing animation on hover
          whileTap="visible" // Add bobbing animation on tap (optional)
          whileFocus="visible" // Add bobbing animation on focus (optional)
          whileInView="visible"
          viewport={{ once: false }}
          src={phone}
          alt=""
          className="max-w-full"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-divider" />
    </div>
  );
};

export default Hero;
