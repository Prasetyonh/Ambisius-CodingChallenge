/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

const dapur = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storeOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storeOrders);
  }, []);
  return (
    <div className="container m-5 bg-slate-100 w-[75vh] min-h-[50vh] max-h-full rounded-md">
      <div className="grid grid-cols-3 gap-3 pt-5 text-center">
        <div className="meja1">
          <p className="text-xl font-bold">Meja 1</p>
          <div>
            {orders.map((order, idx) => {
              if (order.nomorMeja === "1") {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="pt-5 text-slate-500 text-start ms-3"
                    key={idx}
                  >
                    <p>
                      {order.kuantitas}x {order.menu}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="meja2">
          <p className="text-xl font-bold">Meja 2</p>
          <div>
            {orders.map((order, idx) => {
              if (order.nomorMeja === "2") {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="pt-5 text-slate-500 text-start ms-3"
                    key={idx}
                  >
                    <p>
                      {order.kuantitas}x {order.menu}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="meja3">
          <p className="text-xl font-bold">Meja 3</p>
          <div>
            {orders.map((order, idx) => {
              if (order.nomorMeja === "3") {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="pt-5 text-slate-500 text-start ms-3"
                    key={idx}
                  >
                    <p>
                      {order.kuantitas}x {order.menu}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dapur;
