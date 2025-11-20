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

export default function DriverCard({
  firstName,
  lastName,
  team,
  number,
  driverKey,
  flagImage,
  gradient,
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden p-5 text-white shadow-lg"
      style={{
        background: gradient,
        height: "220px",
        width: "100%",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 6px)",
        }}
      />

      {/* Text info (flush left, stacked vertically) */}
      <div className="absolute top-3 left-4 z-20 flex flex-col items-start text-left">
        <h2 className="text-2xl font-bold">
          {firstName} <strong>{lastName}</strong>
        </h2>
        <p className="text-sm mt-1">{team}</p>
        <p className="text-lg font-bold mt-1">{number}</p>
      </div>

      {/* Flag (very small) bottom-left */}
      {flagImage && (
        <div className="absolute bottom-4 left-5 w-6 h-6 rounded-full overflow-hidden border-2 border-white z-20">
          <img src={flagImage} alt="flag" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Driver image alone on right (waist to head) */}
      <img
        src={driverImages[driverKey]}
        alt={`${firstName} ${lastName}`}
        className="absolute right-20 z-10 pointer-events-none"
        style={{
          height: "450px", 
          top: "20px",     
          objectFit: "cover",
          objectPosition: "center bottom",
        }}
      />
    </div>
  );
}
