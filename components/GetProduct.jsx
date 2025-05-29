import { useState } from "react";

export default ({ getModel, setGetModel, getProd }) => {
  const [index, setIndex] = useState(0);
  const [singleProdData, setSingleProdData] = useState();

  const getprodData = async () => {
    const getData = await getProd(index);
    setSingleProdData(getData);
    console.log(getData);
  };
  console.log(singleProdData);

  return getModel ? (
    <div className = "fixed inset-0 z-10 overflow-y-auto">
      <div className = "fixed inset-0 w-full h-full bg-black opacity-40" 
      onClick = {() => setGetModel(false)}></div>

      <div className = "flex items-center min-h-screen px-4 py-8">
        <div className = "relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className = "flex justify-end">
            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick = {() => setGetModal(false)}></button>
          </div>

          <div className = "max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className = "text-lg font-medium text-gray-800">
              Product Tracking Details
            </h4>
            <form onSubmit = {(e) => e.preventDefault()}>
              <div className = "relative mt-3">
                <input type = "number" 
                placeholder = "ID" 
                className = "w-full pl-5 pr-3 py-2 text-gray-50 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange = {(e) => setIndex(e.target.value)}/>
              </div>

              <button
              onClick={() => getprodData()}
              className = "block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
                Get Details
              </button>
            </form>

            {singleProdData == undefined ? (
              ""
            ) : (
                  <div className = "text-left">
                    <p>Item ID: {singleProdData.itemId}</p>
                    <p>Sender: {singleProdData.sender.slice(0, 25)}...</p>
                    <p>Receiver: {singleProdData.receiver.slice(0, 25)}...</p>
                    <p>Quantity: {singleProdData.quantity}</p>
                    <p>Quality: {" "}
                    {singleProdData.isTested ? "Tested" : "Not tested"}
                    </p>
                    <p>Test certificate: {singleProdData.test}</p>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};