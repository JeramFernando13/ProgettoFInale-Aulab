import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import { Button } from "@material-tailwind/react";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
    const {session } = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === 'string' && message.trim().length !== 0) {
            const {error} = await supabase
            .from('messages')
            .insert([
                {
                    profile_id: session?.user.id, 
                    profile_username: session?.user.user_metadata.username, 
                    game_id: data.id,
                    content: message,
                },
            ])
            .select();
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        };
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h4 className="text-xl font-semibold mb-4">Gamers chat</h4>
            <div>
                <RealtimeChat data= {data && data} />
            </div>
            <div className=" max-h-96">
                <form onSubmit={handleMessageSubmit}>
                    <fieldset role="group">
                        <input type="text" name="message" placeholder="Chat..." />
                        <Button type="submit" className="rounded-full">Send</Button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}