import React, { useState, useEffect, useCallback } from 'react';
import AttendanceGauge from './components/AttendanceGauge';
import MemeCard from './components/MemeCard';
import { generateMemeContent } from './services/gemini';
import { MemeResponse } from './types';
import { GraduationCap, Calculator, Plus, X } from 'lucide-react';

const App: React.FC = () => {
  // State for raw counts - Default values
  const [attended, setAttended] = useState<number>(24);
  const [total, setTotal] = useState<number>(30);
  
  // Text inputs for direct editing (synced with state)
  const [inputAttended, setInputAttended] = useState("24");
  const [inputTotal, setInputTotal] = useState("30");

  const [memeData, setMemeData] = useState<MemeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

  // Derived percentage
  const percentage = total > 0 ? (attended / total) * 100 : 0;
  const isSafe = percentage > 75;

  // --- PREDICTION LOGIC ---
  const getPrediction = () => {
    if (total === 0) return { text: "Enter data", type: "neutral" };

    if (isSafe) {
      // Logic: How many more can I bunk and still stay > 75%?
      const maxBunks = Math.floor((attended - 0.75 * total) / 0.75 - 0.0001); 
      
      if (maxBunks <= 0) return { text: "On the edge! Don't miss.", type: "warning" };
      return { text: `You can bunk ${maxBunks} class${maxBunks === 1 ? '' : 'es'}`, type: "safe" };
    } else {
      // Logic: How many must I attend to get > 75%?
      const needed = Math.floor((3 * total - 4 * attended)) + 1;
      
      if (needed <= 0) return { text: "Safe for now.", type: "safe" }; 
      return { text: `Attend ${needed} more class${needed === 1 ? '' : 'es'}`, type: "danger" };
    }
  };

  const prediction = getPrediction();

  // Handlers for inputs with BLOCKER LOGIC
  const handleAttendedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Allow empty input for better UX while typing
    if (val === '') {
      setInputAttended('');
      setAttended(0);
      return;
    }

    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      // BLOCKER: Cannot attend more than total
      if (num > total) {
        // Clamp to total immediately
        setAttended(total);
        setInputAttended(total.toString());
      } else {
        setAttended(num);
        setInputAttended(val);
      }
    }
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (val === '') {
        setInputTotal('');
        setTotal(0);
        // Also reset attended to 0 to keep consistency
        setAttended(0);
        setInputAttended('0');
        return;
    }

    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      setTotal(num);
      setInputTotal(val);
      
      // BLOCKER: If total drops below attended, attended must drop too
      if (num < attended) {
        setAttended(num);
        setInputAttended(num.toString());
      }
    }
  };

  // Handlers for Buttons (Simulation)
  const handleSimulateAttend = () => {
    const newAttended = attended + 1;
    const newTotal = total + 1;
    setAttended(newAttended);
    setTotal(newTotal);
    setInputAttended(newAttended.toString());
    setInputTotal(newTotal.toString());
  };

  const handleSimulateBunk = () => {
    const newTotal = total + 1;
    // Attended stays same
    setTotal(newTotal);
    setInputTotal(newTotal.toString());
  };

  // AI Meme Generation
  const fetchMeme = useCallback(async () => {
    setLoading(true);
    const data = await generateMemeContent(attended, total);
    setMemeData(data);
    setLoading(false);
  }, [attended, total]);

  // Initial Fetch
  useEffect(() => {
    if (!hasFetchedInitial) {
      fetchMeme();
      setHasFetchedInitial(true);
    }
  }, [fetchMeme, hasFetchedInitial]);

  // Debounced fetch on change
  useEffect(() => {
    if (!hasFetchedInitial) return;
    const timer = setTimeout(() => {
      fetchMeme();
    }, 1200); 
    return () => clearTimeout(timer);
  }, [attended, total, hasFetchedInitial]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md flex flex-col gap-4">
        
        {/* Header - Compact */}
        <div className="flex items-center gap-3 text-slate-700 pl-1">
          <div className="p-1.5 bg-sky-100 rounded-lg">
            <GraduationCap className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">Debarred-Saver</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Save yourself from detention</p>
          </div>
        </div>

        {/* Main Stats Card - Reduced padding */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-5 shadow-sm">
          
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: Gauge */}
            <div className="flex-shrink-0">
               <AttendanceGauge percentage={percentage} />
            </div>

            {/* RIGHT: Inputs */}
            <div className="flex flex-col flex-grow gap-3">
              <div className="flex gap-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1 pl-1">Attended</label>
                  <input 
                    type="number" 
                    value={inputAttended}
                    onChange={handleAttendedChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition-all text-center placeholder-slate-300"
                    placeholder="0"
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1 pl-1">Total</label>
                  <input 
                    type="number" 
                    value={inputTotal}
                    onChange={handleTotalChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition-all text-center placeholder-slate-300"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Prediction Badge */}
              <div className={`
                rounded-lg px-3 py-2 text-center text-xs font-bold border
                ${prediction.type === 'safe' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  prediction.type === 'danger' ? 'bg-red-50 text-red-600 border-red-100' :
                  prediction.type === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-slate-50 text-slate-400 border-slate-100'}
              `}>
                <div className="flex items-center justify-center gap-1.5">
                  <Calculator className="w-3 h-3 opacity-70" />
                  {prediction.text}
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Buttons - Compact */}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
             <button 
               onClick={handleSimulateBunk}
               className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-lg transition-colors text-xs uppercase tracking-wide"
             >
               <X className="w-3.5 h-3.5" />
               Bunk +1
             </button>
             <button 
               onClick={handleSimulateAttend}
               className="flex-1 flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 rounded-lg transition-colors text-xs uppercase tracking-wide"
             >
               <Plus className="w-3.5 h-3.5" />
               Attend +1
             </button>
          </div>

        </div>

        {/* Bottom: Meme Card - Adjusted for no scrolling */}
        <div className="w-full">
           <MemeCard data={memeData} loading={loading} percentage={percentage} />
        </div>

      </div>
    </div>
  );
};

export default App;