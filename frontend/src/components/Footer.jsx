function Footer() {
  return (
    <div className="bg-black text-white px-8 py-6">
      <div className="grid grid-cols-4 py-6 ">
        <div className="flex flex-col gap-2 ">
          <span className="font-semibold">LOGO</span>
          <span className=" text-gray-400 text-sm">Step into the future of fashion</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-semibold">Shop</span>
          <span className=" text-gray-400 text-sm">Hoodies</span>
          <span className=" text-gray-400 text-sm">T-Shirts</span>
          <span className=" text-gray-400 text-sm">Accessories</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-semibold">Support</span>
          <span className=" text-gray-400 text-sm">Contact</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-semibold">Company</span>
          <span className=" text-gray-400 text-sm">About</span>
        </div>
      </div>
      <hr className="border-gray-700" />
      <span className="flex justify-center text-gray-500 mt-4 p-6 text-sm">© LOGO. All rights reserved.</span>
    </div>
  );
}

export default Footer;
