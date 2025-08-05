import { useNavigate } from "react-router-dom";

const VendorAccount = () => {
  const navigate = useNavigate();
  return (
    <div className=" mt-9.5 mr-5 ml-auto flex justify-end w-max">
        <p className="gray-text-500">I have a Providers Acccount. <button type="button" className="text-primary-500 font-bold cursor-pointer" onClick={() => navigate("/login")}>Login</button></p>
    </div>
  )
}

export default VendorAccount