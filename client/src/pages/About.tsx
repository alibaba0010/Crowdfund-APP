import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomButton, ParticleBackground } from "../components";
import { useSelector } from "react-redux";

const About = ({ hasAccess }: { hasAccess?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { isWalletConnectOpen } = useSelector((state: any) => state.wallet);
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const description = ` A blockchain-based crowdfunding solution utilizing Electroneum's cryptocurrency (ETN) to connect project creators with backers worldwide. The platform leverages Electroneum's mobile-friendly infrastructure to enable micro-investments and transparent fund distribution through smart contracts, with lower transaction fees than traditional crowdfunding services. Creators can showcase projects, set funding goals, and offer ETN-based rewards, while backers benefit from secure transactions and potentially increased value of their ETN investments.`;

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsComplete(false);

    const typingInterval = setInterval(() => {
      if (index < description.length) {
        setDisplayedText((prev) => prev + description.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, []);

  const handleButtonClick = (path: string) => {
    if (descriptionRef.current) {
      descriptionRef.current.style.transition = "transform 0.5s ease-out";
      descriptionRef.current.style.transform = "translateY(-100vh)";
    }
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <>
      {!isWalletConnectOpen && (
        <div className="relative min-h-screen overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center px-4 py-12 md:py-16"
            ref={descriptionRef}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-6xl mx-auto"
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Welcome to The Electroneum CrowdFunding Platform!
              </motion.h1>

              <motion.div
                className="max-w-4xl mx-auto text-gray-300 rounded-lg p-8 backdrop-blur-lg  shadow-2xl mb-10 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {displayedText}
              </motion.div>

              <AnimatePresence>
                {hasAccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-full max-w-3xl mx-auto"
                  >
                    <motion.h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                      Check out Creators campaigns
                    </motion.h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CustomButton
                          btnType="button"
                          title="Available Campaigns"
                          styles="bg-gradient-to-r from-[#4acd8d] to-[#3ab97c] hover:from-[#3ab97c] hover:to-[#4acd8d] w-full sm:w-auto shadow-lg"
                          handleClick={() =>
                            handleButtonClick("/available-campaigns")
                          }
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CustomButton
                          btnType="button"
                          title="Past Campaigns"
                          styles="bg-gradient-to-r from-[#8c6dfd] to-[#7a5df0] hover:from-[#7a5df0] hover:to-[#8c6dfd] w-full sm:w-auto shadow-lg"
                          handleClick={() =>
                            handleButtonClick("/past-campaigns")
                          }
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-full max-w-3xl mx-auto"
                  >
                    {!address ? (
                      <motion.p className="text-center text-xl font-medium text-gray-300 backdrop-blur-lg bg-black/30 rounded-lg p-6 shadow-2xl mt-8">
                        Connect Wallet and set network to Electroneum Mainnet to
                        access this application
                      </motion.p>
                    ) : (
                      <motion.p className="text-center text-xl font-medium text-gray-300 backdrop-blur-lg bg-black/30 rounded-lg p-6 shadow-2xl mt-8">
                        You are connected to {address}. To access this
                        application, set network to Electroneum Mainnet.
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default About;
