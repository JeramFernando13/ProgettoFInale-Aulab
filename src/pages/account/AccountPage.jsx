"use client";

import React, { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import AvatarComponent from "../../components/Avatar";

import { Button } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false;
        const getProfile = async () => {
            setLoading(true);
            if (!session) return; 
            const {user} = session;

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name, avatar_url`)
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }
            setLoading(false);
        };

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault();
        
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            toast.error(error.message);
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false);
        toast.success('Updated Successfully')
    };

    return (
        <div className="flex h-full w-full flex-col items-center p-6">
            <form
                onSubmit={updateProfile}
                className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
                <p className="text-gray-600 mb-6">Update your profile and personal details here</p>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                    <AvatarComponent 
                        url= {avatar_url}
                        size={150}
                        onUpload={(event ,url ) => {
                            updateProfile(event, url);
                        }}
                    />
                </div>

                {/* First Name & Last Name */}
                <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={first_name || ""}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={last_name || ""}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Email (Disabled) */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={session?.user.email || ""}
                        disabled
                        className="w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Loading..." : "Update"}
                </Button>
            </form>
        </div>
    );
}
