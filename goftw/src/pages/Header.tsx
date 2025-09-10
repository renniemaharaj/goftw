import { Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useInView } from "../state/useInView";

const Header = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10 }}
      animate={isInView ? { opacity: 1, y: 0} : {}}
      transition={{ duration: 0.6 }}
    >
      <Flex className="!w-full !justify-end p-2">
        {/* <Button>Login</Button> */}
      </Flex>
    </motion.div>
  );
};

export default Header;
