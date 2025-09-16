import { Flex, Button, IconButton } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import RollingText from "./root/RollingText";
import useThemeContext from "../state/theme/useThemeContext";

const Header = ({ show, title }: { show: boolean; title: string }) => {
  const { theme, specifyTheme } = useThemeContext();

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
      initial={{ y: -20 }}
      animate={show ? { y: 0 } : { y: -20 }}
      transition={{ duration: 0.6 }}
      className={`${!show && "!hidden"} w-full ${
        theme === "dark" ? "bg-[#171918]" : "bg-blue-50"
      } shadow-md z-50 fixed top-0`}
    >
      <Flex className="!w-full !justify-between items-center px-4 py-4 gap-2">
        {/* Title on the left */}
        <RollingText textContent={title} />

        {/* Controls on the right */}
        <Flex gap="2" align="center">
          {/* Scroll up button */}
          <Button onClick={scrollToTop}>Begin</Button>

          {/* Theme toggle */}
          <IconButton
            variant="soft"
            onClick={() => specifyTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default Header;
