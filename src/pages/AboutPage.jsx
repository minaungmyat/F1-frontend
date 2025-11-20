import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";

export const AboutPage = () => {
  return (
    <>
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About <span className="text-primary">ProjectF1</span>
          </h1>

          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-6 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                ##pageinformationlater
              </p>

              <div className="pt-4">
                <div className="inline-block animate-pulse">
                  <div className="h-2 w-32 bg-red-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
