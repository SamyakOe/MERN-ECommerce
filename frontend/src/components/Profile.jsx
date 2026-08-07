import useLogout from "../utils/useLogout.js";
import { useState, useEffect, useCallback } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const logout = useLogout();
    const [profile, setProfile] = useState(null);

    const loadProfile = useCallback(async () => {
        const response = await api.get("/users/get");
        setProfile(response.data);
    }, []);

    useEffect(() => {
        loadProfile()
    }, []);

    return (
        <>
            {profile && (<div className="relative">
                <div onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center font-semibold uppercase size-10 hover:cursor-pointer hover:border-2">
                    {profile.name.charAt(0)}{profile.name.split(' ').pop().charAt(0)}
                </div>
                <div className={`absolute top-16 right-0 bg-white w-xs px-4 py-2 shadow-xl  overflow-hidden flex-col ${isOpen ? "flex" : "hidden"}`}>
                    {!profile.isAdmin && (
                        <Link to="/my-orders">
                            <div onClick={() => setIsOpen(!isOpen)}
                                className="py-2 px-4 text-center cursor-pointer  border-b hover:font-medium  border-neutral-200 whitespace-nowrap">
                                My Orders
                            </div>
                        </Link>)}
                    <div onClick={() => setIsOpen(!isOpen)} className="py-2 px-4 text-center cursor-pointer  border-b hover:font-medium  border-neutral-200 whitespace-nowrap">Profile</div>
                    <div
                        onClick={() => { logout(); setIsOpen(!isOpen) }}
                        className="py-2 px-4 text-center cursor-pointer  hover:font-medium  whitespace-nowrap">Logout</div>
                </div>
            </div>)
            }
        </>
    )
}