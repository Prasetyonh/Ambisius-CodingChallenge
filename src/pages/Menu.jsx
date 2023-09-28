import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [menu, setMenu] = useState("");
  const [harga, setHarga] = useState("");

  function formatNumber(number) {
    return new Intl.NumberFormat("id-ID").format(number);
  }

  useEffect(() => {
    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems"));

    // Simpan menu default di localStorage jika tidak ada data sebelumnya.
    if (!storedMenuItems) {
      localStorage.setItem("menuItems", JSON.stringify(defaultMenuItems));
    }

    // Gabungkan menu default dan data dari localStorage.
    setItems([...(storedMenuItems || [])]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultMenuItems = [
    { id: 1, menu: "Ayam Goreng", harga: "15000" },
    { id: 2, menu: "Nasi Goreng", harga: "12000" },
    { id: 3, menu: "Mie Goreng", harga: "10000" },
  ];

  const tambahData = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      menu: menu,
      harga: harga,
    };

    const updateMenuItems = [...items, newItem];
    setItems(updateMenuItems);

    localStorage.setItem("menuItems", JSON.stringify(updateMenuItems));
    setMenu("");
    setHarga("");
  };

  const hapusData = (index) => {
    const updatedMenuItems = [...items];
    updatedMenuItems.splice(index, 1);
    setItems(updatedMenuItems);
    // Simpan data di localStorage
    localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));
  };

  return (
    <div className="container m-5 bg-slate-100 w-[75vh] min-h-[50vh] max-h-full rounded-md">
      <p className="m-3 pt-3 ps-3 text-slate-700">Menu Makanan</p>
      <form onSubmit={tambahData}>
        <div className="flex m-3 px-3 w-[95%] space-x-2">
          <input
            type="text"
            id="menu"
            autoComplete="off"
            className="block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 bg-white border-0"
            placeholder="Tambahkan Menu"
            value={menu}
            onChange={(e) => {
              setMenu(e.target.value);
            }}
          />
          <input
            type="number"
            id="harga"
            className="block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 bg-white border-0"
            placeholder="Masukkan Harga"
            value={harga}
            onChange={(e) => {
              setHarga(e.target.value);
            }}
          />

          <button
            className="ms-5 px-3 justify-end bg-slate-500 text-white rounded-md"
            type="submit"
          >
            Tambah
          </button>
        </div>
      </form>

      <table className=" w-[90%] text-sm text-left  ">
        <thead className="text-xs uppercase ">
          <tr>
            <th className="px-6 py-3">No</th>
            <th className="px-6 py-3">Menu</th>
            <th className="px-6 py-3">Harga</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <th className="px-6 py-4">{index + 1}</th>
              <td className="px-6 py-4">{item.menu}</td>
              <td className="px-6 py-4">Rp. {formatNumber(item.harga)}</td>
              <td className="px-6 py-4">
                <button onClick={() => hapusData(index)}>
                  <BiTrash className="text-red-400 text-xl text-center" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
