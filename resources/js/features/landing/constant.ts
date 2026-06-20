import { Mic, Paperclip, Shield, Smile, Users, Zap } from 'lucide-react';

/* ─── Data ─── */
export const features = [
    {
        icon: Zap,
        title: 'Real-Time Messaging',
        desc: 'Messages delivered in under 10ms. No delays, no buffering — just instant, fluid communication between people.',
    },
    {
        icon: Mic,
        title: 'Voice Messages',
        desc: 'Record and send voice notes with a single tap. Waveform visualizations bring audio to life in the chat.',
    },
    {
        icon: Users,
        title: 'Group Chats',
        desc: 'Create conversations for teams, friends, or communities. Scale to thousands of members with fine-grained permissions.',
    },
    {
        icon: Paperclip,
        title: 'File Sharing',
        desc: 'Share any file type up to 5GB. Preview documents, images, and videos right inside the conversation.',
    },
    {
        icon: Smile,
        title: 'Message Reactions',
        desc: 'React to messages with emoji or custom stickers. Express more without breaking the flow of conversation.',
    },
    {
        icon: Shield,
        title: 'Secure Encryption',
        desc: 'Military-grade end-to-end encryption on every message. Your keys, your conversations — invisible to everyone else.',
    },
];

export const stats = [
    { value: '100K+', label: 'Messages Daily' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: 'E2EE', label: 'Encryption' },
    { value: '180+', label: 'Countries' },
];

export const testimonials = [
    {
        quote: 'EchoChat replaced our entire communication stack. Faster, cleaner, and actually enjoyable to use every single day.',
        name: 'Sarah Chen',
        role: 'Head of Engineering, Prismatic',
    },
    {
        quote: 'The encryption and privacy features are unmatched. Finally a messaging app that genuinely respects its users.',
        name: 'Marcus Webb',
        role: 'Security Researcher',
    },
    {
        quote: 'Switched from Slack two months ago and never looked back. The UI is stunning and performance is effortless.',
        name: 'Priya Nair',
        role: 'Product Lead, Novaris',
    },
];

export const faqs = [
    {
        q: 'Is EchoChat free?',
        a: 'Yes — EchoChat is completely free for personal use with unlimited messages, group chats, and file sharing up to 2 GB. Pro plans unlock advanced features for power users and teams starting at $8/month.',
    },
    {
        q: 'Is my data secure?',
        a: 'Absolutely. Every message is end-to-end encrypted using AES-256 with keys only you hold. We have zero access to your message content, and neither does anyone else — by design.',
    },
    {
        q: 'Can I use it on mobile?',
        a: 'EchoChat is available on iOS and Android with native apps that sync seamlessly with the web version. Your messages, files, and history follow you everywhere, in real time.',
    },
    {
        q: 'Does it support groups?',
        a: 'Yes. Create group chats with up to 10,000 members, manage roles and permissions, pin announcements, and broadcast to entire communities — all within EchoChat.',
    },
];
