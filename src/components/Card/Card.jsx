/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Card = () => {
    const [cardData,setCardData] = useState([])
    const [singleCardData,setSingleCardData] = useState([])
    const [hourCount,setHourCount] = useState([])
    const [hourRemaining,setHourRemaining] = useState(20)
 



    // handle button
    const handleSelectbtn = (singleCard) => {
        const isExiest = singleCardData.find((item)=>
        singleCard.id === item.id
        ) 

        let hourCount = singleCard.credit
        if(isExiest){
          return toast('Alredy booked')
        }else{
         
          singleCardData.forEach((hour)=>{
            hourCount += hour.credit
          })
          setSingleCardData([...singleCardData,  singleCard])
        }

        setHourCount(hourCount)
        console.log(hourCount)
        if(hourCount >= 20){
          const hourRemaining = hourCount - 20
          setHourRemaining(hourRemaining)
          console.log(hourRemaining)
           toast('Limited Hours')
        }
       

        
    
    }


    useEffect(()=>{
        fetch('../data.json')
        .then(res=>res.json())
        .then(data=>setCardData(data))
    },[])

  return (
    <div>

    <h1 className="font-bold  text-3xl text-center mt-4 mb-10">Course Registration</h1>

    <div className="flex justify-between">

    <div className="w-[1082px] mr-4 flex items-center justify-center">

    <div className="flex flex-wrap gap-4">
  {
  cardData.map((singleCard)=>(
          
                
<div key={singleCard.id} className="card w-[340px] bg-base-100 shadow-xl">
<figure className="px-6 pt-8">
  <img
    src={singleCard.image}
    alt=""
    className="rounded-xl"
  />
</figure>
<div className="card-body items-center text-center">
  <h2 className="card-title font-bold">{singleCard.title}</h2>
  <p>{singleCard.description}</p>

 
  <div className="flex gap-16 mt-4">
    <div>
      <p><span className="font-bold">Price:</span> {singleCard.price} $</p>
    </div>
    <div>
      <p><span className="font-bold">Credit:</span> {singleCard.credit}hr</p>
    </div>
  </div>
  <div className="card-actions">
    <button onClick={()=>handleSelectbtn(singleCard)} className="btn btn-outline btn-info mt-2">Select</button>
    <ToastContainer />
  </div>
</div>
</div>

  ))}
        
</div>
    </div>

    <Cart singleCardData={singleCardData} hourCount={hourCount} hourRemaining={hourRemaining}></Cart>

    </div>
    
    </div>
  );
};


export default Card;
