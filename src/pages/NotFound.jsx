import car404 from "@/assets/404car.png";
export const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center relative">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        404 – Page Not Found
      </h1>

      {/* Car Animation */}
      <div className="relative w-[300px] h-16 overflow-hidden mb-1">
        <img
          src={car404}
          alt="F1 Car"
          className="absolute top-0 h-16 animate-trackMove select-none"
        />
      </div>

      {/* Red Bar Animation */}
      <div className="relative w-[300px] h-3 overflow-hidden">
        <div className="absolute h-full w-32 bg-red-500 animate-trackMove" />
      </div>

      <p className="text-foreground/70 mt-4">
        Looks like you drove off the track.
      </p>
    </div>

  );
};
