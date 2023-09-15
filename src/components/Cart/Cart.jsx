/* eslint-disable react/prop-types */
const Cart = ({singleCardData,hourCount,hourRemaining}) => {


  return (  
       
    <div>     
        
      <div className="card w-[340px] h-auto py-4 bg-base-100 shadow-xl">
      

       <div className="w-4/5 mx-auto">

        <h2 className="text-xl text-center font-bold text-blue-700 mt-4">Credit Hour Remaining:{hourRemaining}hr
        <hr /></h2> <br />
        <hr /><br />

        <h2 className="text-xl font-bold">Course Name</h2>
        <ol>
            
        {
          singleCardData.map(courseName=>(
          <li key={courseName.id}>{courseName.title}</li>
            ))
            }
            
        </ol>
        <br />
        <hr />
        
       
        <h3>Total Credit Hour:{hourCount} </h3>
          
        <hr />
        <h3>Total Price:{} </h3>


       </div>
       
      </div>

    </div>
  );
};

export default Cart;
