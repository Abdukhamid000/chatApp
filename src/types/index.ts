export interface Message {
    action: string;
    payload: {
        chat_room_id: number;
        message: string;
        reply_message: {
            id: number;
            message_unique_id: number;
            message: string;
            sender_id: number;
        } | null;
    };
    query: {
        page_size: number
    } | null;
}

export interface PrivateMessage {
    sender_id: number;
    message: string;
}

