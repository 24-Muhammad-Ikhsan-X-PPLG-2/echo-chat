import { Mic, Play, Send } from 'lucide-react';

function MobileMockup() {
    return (
        <div
            className="overflow-hidden border-[3px] border-black bg-white shadow-[6px_6px_0px_#000]"
            style={{ width: 160 }}
        >
            <div className="flex h-7 items-center justify-center bg-black">
                <div className="h-1.5 w-14 rounded-full bg-white/20" />
            </div>
            <div className="flex items-center gap-1.5 border-b-2 border-black px-2 py-1.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[9px] font-black text-white">
                    M
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-black">Maria S.</div>
                    <div className="text-[7px] text-black/40">Online</div>
                </div>
                <Mic size={10} className="shrink-0 text-black/50" />
            </div>

            <div className="flex flex-col gap-1.5 p-2" style={{ height: 190 }}>
                {[
                    { from: 'them', text: 'Can you review the PR?' },
                    { from: 'me', text: 'On it now!' },
                ].map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] border-[1.5px] border-black px-1.5 py-1 text-[8px] ${
                                msg.from === 'me'
                                    ? 'bg-black text-white shadow-[1.5px_1.5px_0px_#555]'
                                    : 'bg-white shadow-[1.5px_1.5px_0px_#000]'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Voice message */}
                <div className="border-[1.5px] border-black bg-black/5 p-1.5 shadow-[1.5px_1.5px_0px_#000]">
                    <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-black">
                            <Play size={8} className="ml-0.5 text-white" />
                        </div>
                        <div className="flex flex-1 items-end gap-0.5">
                            {[2, 4, 3, 5, 3, 4, 2, 3, 5, 2, 4].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-0.5 bg-black"
                                    style={{ height: h * 2.5 }}
                                />
                            ))}
                        </div>
                        <span className="shrink-0 text-[7px] text-black/50">
                            0:14
                        </span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="max-w-[85%] border-[1.5px] border-black bg-black px-1.5 py-1 text-[8px] text-white shadow-[1.5px_1.5px_0px_#555]">
                        Looks great!
                    </div>
                </div>
            </div>

            <div className="flex gap-1 border-t-2 border-black p-1.5">
                <div className="flex-1 border-[1.5px] border-black px-1.5 py-1 text-[8px] text-black/30">
                    Message...
                </div>
                <div className="flex h-6 w-6 items-center justify-center bg-black">
                    <Send size={8} className="text-white" />
                </div>
            </div>
        </div>
    );
}

export default MobileMockup;
