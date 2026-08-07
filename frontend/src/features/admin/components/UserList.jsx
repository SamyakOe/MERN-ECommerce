import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import NoItemFound from "./NoItemFound";

export default function UserList({ setModel, users, setUsers, search }) {
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(
            users.filter((item) => {
                return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, users])


    return (
        <div className="bg-white border border-neutral-200 rounded-xl">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-neutral-100 text-sm font-semibold text-left text-neutral-500 uppercase">
                        <th className="py-4 px-6  ">
                            Username
                        </th>

                        <th className="py-4 px-6  ">
                            Email
                        </th>

                        <th className="py-4 px-6  ">
                            Role
                        </th>
                        {/* <th className="py-4 px-6  ">
                            Actions
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 && (
                        <tr>
                            <td colSpan={3}>
                                <NoItemFound item="User" />
                            </td>
                        </tr>
                    )}
                    {filteredUsers.map((user) => (
                        <tr
                            key={user._id}
                            className="border-b border-neutral-100 text-neutral-800 "
                        >
                            <td className="py-4 px-6 text-sm font-semibold text-left">

                                <span className="font-medium">{user.name}</span>

                            </td>
                            <td className="py-4 px-6 text-sm font-semibold text-left">

                                <span className="font-medium">{user.email}</span>

                            </td>

                            <td className="py-4 px-6 text-sm font-semibold text-left ">
                                <span className=" rounded-full font-medium bg-neutral-100 py-1 px-2 text-neutral-700">
                                    {user.isAdmin ? "Admin" : "Customer"}
                                </span>
                            </td>

                            
                            {/* <td className="py-4 px-6 text-sm font-semibold text-left flex w-full justify-around text-neutral-400">
                                <div
                                    onClick={() =>
                                        setuserModel({
                                            open: true,
                                            user: { ...user },
                                        })
                                    }
                                    className="rounded-lg hover:bg-neutral-100 hover:text-black p-2 cursor-pointer"
                                >
                                    <Pencil className="size-4" />
                                </div>
                                <div
                                    onClick={() => deleteuser(user._id)}
                                    className="rounded-lg hover:bg-red-50 hover:text-red-600 p-2 cursor-pointer"
                                >
                                    <Trash2 className="size-4" />
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
