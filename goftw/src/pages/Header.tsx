import { Flex, Button } from "@radix-ui/themes";
import { motion } from "framer-motion";
import RollingText from "./root/RollingText";

const Header = ({ show, title }: { show: boolean; title: string }) => {
  // Function to scroll parent or document smoothly
  const scrollToTop = () => {
    const parent = document.getElementById("scrollable-parent");
    if (parent) {
      parent.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      key={"header_should_show=" + show}
      initial={{ opacity: 0, y: -20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className={`${!show && "!hidden"} w-full bg-[#171918] shadow-md z-50 fixed top-0`}
    >
      <Flex className="!w-full !justify-between items-center px-4 py-4">
        {/* Title on the left */}
        <RollingText textContent={title} />
        {/* <h1 className="text-xl font-bold">{title}</h1> */}

        {/* Scroll up button on the right */}
        <Button onClick={scrollToTop}>
          Begin
        </Button>
      </Flex>
    </motion.div>
  );
};

export default Header;
