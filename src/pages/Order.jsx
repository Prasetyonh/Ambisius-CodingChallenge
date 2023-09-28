/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const order = () => {
  const [activeButton, setActiveButton] = useState(null);

  const [nomorMeja, setNomorMeja] = useState(""); // State untuk nomor meja
  const [selectedMenu, setSelectedMenu] = useState(null); // State untuk menu yang dipilih
  const [selectedKuantitas, setSelectedKuantitas] = useState(null); // State untuk kuantitas yang dipilih

  const storedItems = localStorage.getItem("menuItems");
  const parsedItems = JSON.parse(storedItems) || [];

  function formatNumber(number) {
    return new Intl.NumberFormat("id-ID").format(number);
  }

  const kuantitas = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const handleMejaClick = (mejaNomor) => {
    // Ketika tombol meja diklik, set nomor meja sesuai dengan nomor meja yang diklik
    setNomorMeja(mejaNomor);
  };

  const handleTambahClick = () => {
    // Validasi data sebelum menambahkannya ke localStorage
    if (!nomorMeja || !selectedMenu || !selectedKuantitas) {
      toast.error("Mohon isi semua data pesanan", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const selectedMenuItem = parsedItems.find(
      (item) => item.menu === selectedMenu.value
    );

    // Mengambil data pesanan yang sudah ada di localStorage atau membuat array kosong jika belum ada
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const totalHargaPesanan = selectedMenuItem.harga * selectedKuantitas.value;

    // Menambah pesanan baru ke array pesanan
    const newOrder = {
      nomorMeja,
      menu: selectedMenu.value,
      kuantitas: selectedKuantitas.value,
      totalHarga: totalHargaPesanan,
    };

    existingOrders.push(newOrder);

    // Menyimpan array pesanan yang telah diperbarui ke localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Mengosongkan form setelah pesanan ditambahkan
    setNomorMeja("");
    setActiveButton(null);
    setSelectedMenu(null);
    setSelectedKuantitas(null);

    toast.success("Pesanan berhasil ditambahkan!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Menutup otomatis setelah 3 detik
    });
  };

  return (
    <div className="container m-5 bg-slate-100 w-[75vh] min-h-[50vh] max-h-full rounded-md">
      <div className="flex flex-nowrap space-x-0.5 justify-center mt-5 py-5 mx-5 text-slate-500 ">
        <button
          className={`py-3 px-14 ${
            activeButton === "meja1"
              ? "bg-black text-white rounded-md"
              : "bg-white text-slate-700 rounded-md hover:bg-slate-200"
          }`}
          onClick={() => {
            setActiveButton("meja1");
            handleMejaClick("1");
          }}
        >
          MEJA 1
        </button>
        <button
          className={`py-3 px-14  ${
            activeButton === "meja2"
              ? "bg-black text-white rounded-md"
              : "bg-white text-slate-700 rounded-md hover:bg-slate-200"
          }`}
          onClick={() => {
            setActiveButton("meja2");
            handleMejaClick("2");
          }}
        >
          MEJA 2
        </button>
        <button
          className={`py-3 px-14 ${
            activeButton === "meja3"
              ? "bg-black text-white rounded-md"
              : "bg-white text-slate-700 rounded-md hover:bg-slate-200"
          }`}
          onClick={() => {
            setActiveButton("meja3");
            handleMejaClick("3");
          }}
        >
          {" "}
          MEJA 3
        </button>
      </div>

      <form className="flex mx-3 w-full">
        <div className="w-[60%]">
          <label>Menu</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="menu"
            isClearable="true"
            options={parsedItems.map((item) => ({
              value: item.menu,
              label: (
                <>
                  <span>{item.menu}</span>
                  <span className="float-right text-slate-500">
                    Rp. {formatNumber(item.harga)}
                  </span>
                </>
              ),
            }))}
            value={selectedMenu}
            onChange={(value) => setSelectedMenu(value)}
            placeholder="Pilih menu"
          />
        </div>

        <div className="w-[40%] ml-3 mr-5">
          <label>Jumlah</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="menu"
            isClearable="true"
            value={selectedKuantitas}
            onChange={(value) => setSelectedKuantitas(value)}
            placeholder="Kuantitas"
            options={kuantitas}
          />
        </div>
      </form>
      <div className="flex justify-end mt-3 mx-3">
        <button
          className="px-3 bg-slate-500 text-white rounded-md"
          type="button"
          onClick={handleTambahClick}
        >
          Tambah
        </button>
      </div>
    </div>
  );
};

export default order;
