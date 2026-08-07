import TitleBar from "../components/TitleBar";
import UserList from "../components/UserList";
import SearchBar from "../../../components/SearchBar";
import { useState, useCallback, useEffect } from "react";
import api from "../../../api/axios";

export default function Users() {
    const [search, setSearch] = useState('');
    const [model, setModel] = useState({
        open: false,
        product: null,
    });
    const [users, setUsers] = useState([]);
    const loadUsers = useCallback(async () => {
        const response = await api.get("/users/");
        setUsers(response.data);
    }, []); // no dependencies, stable reference

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    return (
        <div className="w-full flex-1 h-full bg-neutral-50">
            <TitleBar title="Customers" />
            <div className="py-6 px-5 flex flex-col gap-4">
                <div className="flex justify-between">
                    <span className="font-bold text-2xl  ">Customers</span>
                    {/* <button
                        onClick={() => setModel({ open: true, product: null })}
                        className="flex bg-black hover:bg-neutral-800 cursor-pointer text-white rounded-xl px-4 py-2 text-sm items-center gap-2 font-medium">
                        <Plus className="size-4" />
                        Add Product
                    </button> */}
                </div>
                <SearchBar setSearch={setSearch} search={search} dark={false} item="Customers"/>

                <UserList setModel={setModel} users={users} setUsers={setUsers} search={search} />
            </div>
        </div>
    )
}
