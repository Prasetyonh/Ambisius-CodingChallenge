/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const kasir = () => {
  const [selectedMeja, setSelectedMeja] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const storedOrders = localStorage.getItem("orders");
  const parsedOrders = JSON.parse(storedOrders) || [];

  function formatNumber(number) {
    return new Intl.NumberFormat("id-ID").format(number);
  }

  const uniqueMejaOptions = [
    ...new Set(parsedOrders.map((order) => order.nomorMeja)),
  ];

  // Urutkan uniqueMejaOptions
  uniqueMejaOptions.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  const mejaOptions = uniqueMejaOptions.map((nomorMeja) => ({
    value: nomorMeja,
    label: nomorMeja,
  }));

  const handlePrintStruk = () => {
    if (selectedMeja) {
      const filteredOrders = parsedOrders.filter(
        (order) => order.nomorMeja === selectedMeja.value
      );
      setSelectedOrders(filteredOrders);
      setShowTable(true);
    }
  };

  const handleMeja = (selectedOption) => {
    setSelectedMeja(selectedOption);
    if (!selectedOption) {
      // Jika form dikosongkan, maka sembunyikan tabel
      setShowTable(false);
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  };

  const hapusPesananByNomorMeja = (nomorMeja) => {
    // Mendapatkan pesanan yang ada di localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Menghapus pesanan yang memiliki nomor meja sesuai dengan yang dipilih
    const updatedOrders = existingOrders.filter(
      (order) => order.nomorMeja !== nomorMeja
    );

    // Menyimpan kembali pesanan yang telah dihapus ke localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    toast.success("berhasil mengosongkan meja");
  };

  return (
    <div className="container m-5 bg-slate-100 w-[75vh] min-h-[50vh] max-h-full rounded-md">
      <div className="m-3 pt-3 ps-3 text-slate-700">
        <p className="pb-2">Meja</p>
        <div className="flex">
          <Select
            className="basic-single w-[40%]"
            classNamePrefix="select"
            name="menu"
            isClearable="true"
            options={mejaOptions}
            placeholder="Nomor meja"
            onChange={handleMeja}
          />

          <button
            className="px-3 mx-3 bg-slate-500 text-white rounded-md"
            onClick={handlePrintStruk}
          >
            Print struk
          </button>

          {showBtn && (
            <button
              className="px-3  bg-red-400 text-white rounded-md"
              onClick={() => {
                if (selectedMeja) {
                  hapusPesananByNomorMeja(selectedMeja.value);
                  setSelectedMeja(null); // Mengosongkan pemilihan nomor meja
                  setShowTable(false); // Menyembunyikan tabel
                  setShowBtn(false); // Mengatur kembali status isMejaSelected menjadi false
                }
              }}
            >
              Kosongkan meja
            </button>
          )}
        </div>
      </div>
      {showTable && (
        <div className="mt-3 mx-3">
          <table className=" w-[100%] text-sm text-left table-fixed border-separate">
            <thead className="text-xs uppercase ">
              <tr>
                <th className="px-6 py-3 text-end ">Jumlah</th>
                <th className="px-6 py-3">Menu</th>
                <th className="px-6 py-3">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-3 text-end ">{order.kuantitas}</td>
                  <td className="px-6 py-3">{order.menu}</td>
                  <td className="px-6 py-3">
                    Rp. {formatNumber(order.totalHarga)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default kasir;
