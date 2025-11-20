import { useNavigate } from 'react-router-dom';
import verstappen from '../assets/drivers/verstappen.jpg';
import tsunoda from '../assets/drivers/tsunoda.jpg';
import russell from '../assets/drivers/russell.jpg';
import antonelli from '../assets/drivers/antonelli.jpg';
import leclerc from '../assets/drivers/leclerc.jpg';
import hamilton from '../assets/drivers/hamilton.jpg';
import norris from '../assets/drivers/norris.jpg';
import piastri from '../assets/drivers/piastri.jpg';
import alonso from '../assets/drivers/alonso.jpg';
import stroll from '../assets/drivers/stroll.jpg';
import gasly from '../assets/drivers/gasly.jpg';
import ocon from '../assets/drivers/ocon.jpg';
import albon from '../assets/drivers/albon.jpg';
import hadjar from '../assets/drivers/hadjar.jpg';
import colapinto from '../assets/drivers/colapinto.jpg';
import lawson from '../assets/drivers/lawson.jpg';
import bortoleto from '../assets/drivers/bortoleto.jpg';
import bearman from '../assets/drivers/bearman.jpg';
import hulkenberg from '../assets/drivers/hulkenberg.jpg';
import sainz from '../assets/drivers/sainz.jpg';

const driverImages = {
  verstappen,
  tsunoda,
  russell,
  antonelli,
  leclerc,
  hamilton,
  norris,
  piastri,
  alonso,
  stroll,
  gasly,
  ocon,
  albon,
  hadjar,
  colapinto,
  lawson,
  bortoleto,
  bearman,
  hulkenberg,
  sainz,
};

export default function TeamCard({
  name,
  color,
  gradient,
  drivers = [],
  carImage,
  logoImage
}) {
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-xl overflow-hidden p-5 text-white shadow-lg"
      style={{
        background: gradient || color,
        height: "220px",
        width: "100%",
        position: " content-box"
      }}
    >
      {/* Pattern background behind the car */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 6px)"
        }}
      />

      {/* Team name + drivers */}
      <div className="relative z-20">
        <h2 className="text-3xl font-extrabold tracking-tight">{name}</h2>

        <div className="flex gap-6 mt-3">
          {drivers.map((d, idx) => {
            const parts = d.split(" ");
            const last = parts.pop();
            const first = parts.join(" ");
            const key = last.toLowerCase();

            return (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={driverImages[key]}
                  className="w-12 h-12 object-cover rounded-full"
                  style={{ objectPosition: "top" }}
                  alt={d}
                />
                <button
                  onClick={() => navigate('/drivers', { state: { driverKey: key } })}
                  className="text-base font-semibold hover:underline cursor-pointer transition-all"
                >
                  {first} <strong>{last}</strong>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logo bubble */}
      {logoImage && (
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center p-2 z-20">
          <img src={logoImage} alt="logo" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Car image */}
      <img
        src={carImage}
        alt="car"
        className="absolute bottom-0 pointer-events-none z-10"
        style={{
          left: "0px",
          bottom: "0px",
          width: "auto",
          height: "40%",
          objectFit: "cover",
          objectPosition: "left bottom"
        }}
      />
    </div>
  );
}
