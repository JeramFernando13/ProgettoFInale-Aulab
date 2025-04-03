
"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";

// import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";

import { SettingsMenu } from "@/ui/components/SettingsMenu";
import { FeatherLock } from "@subframe/core";
import { FeatherBellRing } from "@subframe/core";
import { FeatherCreditCard } from "@subframe/core";
import { FeatherShapes } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherUpload } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Alert } from "@/ui/components/Alert";
import errorMap from "zod/locales/en.js";
import { data } from "react-router";
import { use } from "react";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    // const [avatar_url, setAvatarUrl] = useState(null);

    useEffect (() => {
        let ignore = false
        const getProfile = async () => {
            setLoading(true)
            const {user} = await supabase
            .from('profiles')
            .select('username, first_name, last_name, avatar_url')
            .eq('id', user.id)
            .single()

            if (!ignore) {
                if (error){
                    console.warn(error);
                } else if (data){
                    setUsername(user.username)
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    // setAvatarUrl(user.avatar_url)
                }
            }
            setLoading(false)
        }
        getProfile()
        
        return () => {
            ignore = true
        }
    }, [session]);

    const updateProfile = async (event ,avatarUrl) => {
        event.preventDefault()

        setLoading(true)
        const {user} = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates)

        fi (error) {
            alert(error.message)
        } else {
            // setAvatarUrl(avatarUrl)
        }
        setLoading(false)

    }

  return (
    <div className="flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-0">
      
      <form onSubmit={updateProfile} className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-6 self-stretch bg-default-background py-12 shadow-sm">
            <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
                <div className="flex w-full flex-col items-start gap-1">
                    <span className="w-full text-heading-2 font-heading-2 text-default-font">
                    Account Settings
                    </span>
                    <span className="w-full text-body font-body text-subtext-color">
                    Update your profile and personal details here
                    </span>
                </div>

                {/* form inputs  */}
                <div className="flex w-full flex-col items-start gap-6">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                    Profile
                    </span>
                    {/* avatar  */}
                    <div className="flex w-full flex-col items-start gap-4">
                        <span className="text-body-bold font-body-bold text-default-font">
                            Avatar
                        </span>
                        <div className="flex items-center gap-4">
                            <img
                            className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                            src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                            />
                            <div className="flex flex-col items-start gap-2">
                            <Button
                                variant="neutral-secondary"
                                icon={<FeatherUpload />}
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                            >
                                Upload
                            </Button>
                            <span className="text-caption font-caption text-subtext-color">
                                For best results, upload an image 512x512 or larger.
                            </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* First Name  */}
                    <div className="flex w-full items-center gap-4">
                        <TextField
                            className="h-auto grow shrink-0 basis-0"
                            label="First name"
                            helpText="">
                            <TextField.Input
                            id="first_name"
                            type="text"
                            value={first_name || ""}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </TextField>

                        {/* Last Name  */}
                        <TextField
                            className="h-auto grow shrink-0 basis-0"
                            label="Last name"
                            helpText="">
                            <TextField.Input
                            id="last_name"
                            type="text"
                            value={last_name || ""}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </TextField>
                    </div>
                
                    {/* Username  */}
                    <div className="flex w-full items-center gap-4">
                        <TextField
                            className="h-auto grow shrink-0 basis-0"
                            label="Username"
                            helpText=""
                        >
                            <TextField.Input
                            id="username"
                            type="text"
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </TextField>
                    </div>

                    {/* Email  */}
                    <div className="flex w-full items-center gap-4">
                        <TextField
                            className="h-auto grow shrink-0 basis-0"
                            label="Email"
                            helpText=""
                        >
                            <TextField.Input
                            id="email"
                            type="email"
                            value={session.user.email}
                            disabled
                            />
                        </TextField>
                    </div>

                </div>
                
               <Button  type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Update"}
               </Button>
               
            </div>
        </form>
    </div>
  );
}
