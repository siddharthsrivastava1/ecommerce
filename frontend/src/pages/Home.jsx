import { useContext } from "react";
import Dashboard from "../components/Dashboard";
import LatestCollection from "../components/LatestCollection";
import { ShopContext } from "../context/ShopContext";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import { useEffect } from "react";
// import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  const { getProductsData } = useContext(ShopContext);
  useEffect(() => {
    getProductsData(1);
  }, []);

  return (
    <div>
      <Dashboard />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default Home;
