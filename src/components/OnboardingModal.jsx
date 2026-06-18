    import { useState } from "react";

    export default function OnboardingModal({ onGeneric }) {
        const [name, setName] = useState("");
        const [hours, setHours] = useState("");
        const [focusTime, setFocusTime] = useState(25);
        const [breakTime, setBreakTime] = useState(5);



        const handleGenric = () => {
            if(!name.trim()) return alert("Name is mandatory");
            onGeneric({ name, focusTime, breakTime});
        };

        return(
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-green-900 p-8 rounded-2xl w-[90%] max-w-md text-white shadow2xl border border-white/10">
                    <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Welcome to Pomodor</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/70 mb-1">Your Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)}
                             className="w-full bg-black/50 rounded px-4 py-2 border border-white/20 text-white outline-none focus:border-[#D4AF37]"
                             placeholder="e.g., Zoro" required/>
                        </div>
                        {/* <div>
                            <label className="block text-sm text-white/70 mb-1">How many hours?</label>
                            <input type="number" value={hours} onChange={e => setHours(e.target.value)}
                             className="w-full bg-black/50 rounded px-4 py-2 border border-white/20 text-white outline-none focus:border-[#D4AF37]"
                             placeholder="e.g., 5"/>

                        </div> */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-white/70 mb-1">Focus(min)</label>
                                <input type="number" value={focusTime} onChange={e => setFocusTime(Number(e.target.value))}
                                 className="w-full bg-black/50 rounded px-4 py-2 border border-white/20 text-white outline-none"/>


                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-white/70 mb-1">Break(min)</label>
                                <input type="number" value={breakTime} onChange={e => setBreakTime(Number(e.target.value))}
                                 className="w-full bg-black/50 rounded px-4 py-2 border border-white/20 text-white outline-none"/>

                            </div>

                        </div>

                    </div>
                    <div className="mt-8 flex flex-col gap-3">

                        <button onClick={handleGenric} className="w-full py-3 bg-transparent border border-white/30 text-white/70 font-bold rounded hover:bg-white/10 transition-colors">
                            Use Genric Pomodoro

                        </button>


                    </div>

                </div>

            </div>
          
        );

    }