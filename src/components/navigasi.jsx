import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { toast } from "react-toastify";

const Navigasi = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resetLocalStorage = () => {
    // Hapus data yang ingin di-reset dari localStorage.
    localStorage.clear();

    // Memperbarui tampilan halaman ke halaman saat ini (tanpa refresh).
    navigate("");
    toast.success("Data berhasil direset", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="container mx-5 w-[75vh] flex justify-between">
      <div className="flex justify-center mt-5 py-2 bg-slate-100 text-slate-500 rounded-md w-[50vh]">
        <Link
          to="/menu"
          className={`py-3 px-6 ${
            location.pathname === "/menu"
              ? "bg-white rounded-md text-slate-700"
              : ""
          }`}
        >
          <button>Menu</button>
        </Link>
        <Link
          to="/order"
          className={`py-3 px-6 ${
            location.pathname === "/order"
              ? "bg-white rounded-md text-slate-700"
              : ""
          }`}
        >
          <button>Order</button>
        </Link>
        <Link
          to="/dapur"
          className={`py-3 px-6 ${
            location.pathname === "/dapur"
              ? "bg-white rounded-md text-slate-700"
              : ""
          }`}
        >
          <button>Dapur</button>
        </Link>
        <Link
          to="/kasir"
          className={`py-3 px-6 ${
            location.pathname === "/kasir"
              ? "bg-white rounded-md text-slate-700"
              : ""
          }`}
        >
          <button>Kasir</button>
        </Link>
      </div>

      <button
        type="button"
        className=" mt-5 px-3 border ring-[0.5] ring-black rounded-lg hover:bg-slate-200"
        onClick={resetLocalStorage}
      >
        <BiRefresh className="inline-flex text-2xl pe-1" />
        Reset
      </button>
    </div>
  );
};

export default Navigasi;
