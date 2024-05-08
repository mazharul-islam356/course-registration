import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { BiDollar } from "react-icons/bi";

const Card = () => {
  const [cardData, setCardData] = useState([]);
  const [singleCardData, setSingleCardData] = useState([]);
  const [hourCount, setHourCount] = useState(0);
  const [priceCount, setPriceCount] = useState(0);
  const [hourRemaining, setHourRemaining] = useState(20);

  // handle button
  const handleSelectbtn = (singleCard) => {
    const isExiest = singleCardData.find((item) => singleCard.id === item.id);

    let hourCount = singleCard.credit;

    if (isExiest) {
      return toast.error("Alredy select this course");
    } else {
      singleCardData.forEach((hour) => {
        hourCount += hour.credit;
      });
      setSingleCardData([...singleCardData, singleCard]);
    }

    let priceCount = singleCard.price;
    if (hourCount >= 20) {
      toast("Limited Hours");
    } else {
      setHourCount(hourCount);
      const hourRemaining = 20 - hourCount;
      setHourRemaining(hourRemaining);
      
      singleCardData.forEach((price) => {
        priceCount += price.price;
        setPriceCount(priceCount);
      });
      console.log(priceCount);
    }
  };

  useEffect(() => {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => setCardData(data));
  }, []);

  return (
    <div>
      <h1 className="font-bold  text-3xl text-center mt-4 mb-10 p-4 shadow-lg rounded-lg">
        Course Registration
      </h1>
<div className="flex justify-center items-center justify-items-center mb-10">
<Cart
          singleCardData={singleCardData}
          cardData={cardData}
          hourCount={hourCount}
          hourRemaining={hourRemaining}
          priceCount={priceCount}
        ></Cart>
</div>
      <div>
        <div>
          <div className="grid justify-center items-center justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {cardData.map((singleCard) => (
              <div
                key={singleCard.id}
                className="card w-[320px] h-[500px] pt-2 bg-base-100 shadow-xl"
              >
                <figure className="px-6 pt-8">
                  <img src={singleCard.image} alt="#" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title font-bold">{singleCard.title}</h2>

                  <h2>{singleCard.description}</h2>

                  <div className="flex gap-1 mt-6">
                    <p className="text-xl mt-[2px]">
                      <BiDollar></BiDollar>
                    </p>
                    <div>
                      <p>
                        <span className="font-bold">Price:</span>{" "}
                        {singleCard.price}{" "}
                      </p>
                    </div>
                    <p className="text-2xl ml-4">
                      <HiOutlineBookOpen></HiOutlineBookOpen>
                    </p>
                    <div>
                      <p>
                        <span className="font-bold">Credit:</span>{" "}
                        {singleCard.credit}hr
                      </p>
                    </div>
                  </div>
                  <div className="card-actions ">
                    <button
                      onClick={() => handleSelectbtn(singleCard)}
                      className="btn btn-outline btn-info mt-6 px-24"
                    >
                      Select
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Card;
