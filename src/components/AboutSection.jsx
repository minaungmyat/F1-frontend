import { Car, CardSimIcon, CarFront, CarFrontIcon, Code, Computer, Laptop, User } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutSection = () => {
    return (
    <section id="about" className="py-24 px-4 relative">

        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bol mb-12 text-center">
                About <span className="text-primary"> The Project</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">
                        Real data. Real drivers. Real strategy.
                    </h3>

                    <p className="text-muted-foreground">
                        F1 Simulator is a next-generation web platform that brings the thrill of Formula 1 directly to your screen.
                        Built with React + Vite, Django, and FastF1, the platform combines live racing data, team analytics, 
                        and driver performance statistics into one sleek, interactive dashboard.         
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <Link to="/results" className="cosmic-button">
                            {" "}
                            Race Results
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="gradient-border p-6 card hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary" />  
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">View live and historical race results from official F1 data</h4>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <CarFrontIcon className="h-6 w-6 text-primary" />    
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Compare team standings and performance insights</h4>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Laptop className="h-6 w-6 text-primary" />    
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Run your own race simulations</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};