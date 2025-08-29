// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [banner, setBanner] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:1337/api/banners?sort=order:asc&populate=image")
//       .then((res) => {
//         const item = res.data.data[0]; // first banner
//         setBanner({
//           ...item,
//           imageUrl: item.image?.url, // direct URL from image
//         });
//       })
//       .catch((err) => {
//         console.error("Failed to fetch banner:", err);
//       });
//   }, []);

//   if (!banner) return null;

//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-400">
//       {/* Dashboard left */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div className="text-[#414141]">
//           <div className="flex items-center gap-2">
//             <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
//             <p className="font-medium text-sm md:text-base">
//               {banner.subtitle}
//             </p>
//           </div>
//           <h1 className="prata-regular sm:py-3 lg:text-5xl leading-relaxed">
//             {banner.title}
//           </h1>
//           <div className="flex items-center gap-2">
//             <a
//               href={banner.ctaLabel}
//               className="font-semibold text-sm md:text-base hover:underline"
//             >
//               {banner.ctaLink}
//             </a>
//             <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard right */}
//       <img
//         className="w-full sm:w-1/2 object-cover"
//         src={`http://localhost:1337${banner.imageUrl}`}
//         alt={banner.title}
//       />
//     </div>
//   );
// };

// export default Dashboard;

import { assets } from "../assets/assets";

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Dashboard;
