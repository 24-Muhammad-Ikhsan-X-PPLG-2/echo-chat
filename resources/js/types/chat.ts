export interface Chat {
    data: ChatData[];
    links: Links;
    meta: Meta;
}

export interface ChatData {
    id: string;
    content: string;
    type: string;
    sender: Sender;
    attachments: any[];
    reply_to: any;
    pending: boolean;
    iv: string;
    created_at: string;
}

export interface Sender {
    id: string;
    username: string;
    avatar_url: any;
    public_key: string;
}

export interface Links {
    first: string;
    last: string;
    prev: any;
    next: string;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Link {
    url?: string;
    label: string;
    page?: number;
    active: boolean;
}
