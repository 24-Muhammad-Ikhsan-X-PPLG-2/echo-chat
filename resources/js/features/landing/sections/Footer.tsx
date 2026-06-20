import Github from '@/icons/Github';
import Linkedin from '@/icons/Linkedin';
import Twitter from '@/icons/Twitter';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-12 grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center border-2 border-white">
                                <MessageCircle
                                    size={15}
                                    className="text-white"
                                />
                            </div>
                            <span className="text-lg font-black">EchoChat</span>
                        </div>
                        <p className="font-['Inter'] text-sm leading-relaxed text-white/45">
                            Messages Fade.
                            <br />
                            Echoes Stay.
                        </p>
                    </div>

                    {/* Links */}
                    {[
                        {
                            title: 'Product',
                            links: [
                                'Features',
                                'Pricing',
                                'Changelog',
                                'Roadmap',
                            ],
                        },
                        {
                            title: 'Company',
                            links: ['About', 'Blog', 'Careers', 'Press'],
                        },
                        {
                            title: 'Legal',
                            links: [
                                'Privacy',
                                'Terms',
                                'Security',
                                'Cookie Policy',
                            ],
                        },
                    ].map((col) => (
                        <div key={col.title}>
                            <div className="mb-4 text-xs font-black tracking-widest text-white/40 uppercase">
                                {col.title}
                            </div>
                            <ul className="flex flex-col gap-2.5">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a
                                            href="#"
                                            className="font-['Inter'] text-sm text-white/60 transition-colors hover:text-white"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-white/10 pt-8 md:flex-row">
                    <p className="font-['Inter'] text-sm text-white/40">
                        © {new Date().getFullYear()} EchoChat. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Twitter, Github, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="group flex h-9 w-9 items-center justify-center border-2 border-white/20 transition-all hover:border-white hover:bg-white hover:text-black"
                                aria-label="Social link"
                            >
                                <Icon
                                    className="fill-white group-hover:fill-black"
                                    size={15}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
