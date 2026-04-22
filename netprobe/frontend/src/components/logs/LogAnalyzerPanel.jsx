import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Bot, Search, AlertTriangle, FileTerminal } from 'lucide-react';

export function LogAnalyzerPanel({ groqKey }) {
  const [logs, setLogs] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    if (!logs.trim()) return;
    setAnalyzing(true);

    // Placeholder para la lógica real de IA.
    setTimeout(() => {
      setResults({
        summary: "Análisis preliminar completado. Se detectaron 2 patrones sospechosos en los registros proporcionados que requieren atención.",
        threats: [
          { level: "High", message: "Múltiples intentos fallidos de autenticación (fuerza bruta posible) desde IP desconocida." },
          { level: "Medium", message: "Petición HTTP anómala con caracteres de escape, posible intento de inyección." }
        ]
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <ScrollText className="w-5 h-5" style={{ color: '#57cbde' }} />
        <h2 className="text-sm font-semibold text-white">Log Analyzer</h2>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(155,89,182,0.15)', color: '#9b59b6', border: '1px solid rgba(155,89,182,0.3)' }}>
          IA Powered
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Log Input Area */}
        <div className="flex-1 flex flex-col rounded-xl border border-[rgba(102,192,244,0.1)] bg-[rgba(23,26,33,0.5)] overflow-hidden">
          <div className="px-4 py-2 border-b border-[rgba(102,192,244,0.1)] flex justify-between items-center bg-[rgba(42,71,94,0.2)]">
            <span className="text-[9px] uppercase tracking-widest text-[rgba(198,212,223,0.7)] font-semibold flex items-center gap-2">
              <FileTerminal className="w-3 h-3" /> Pegar Logs / Eventos
            </span>
          </div>
          <textarea
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
            placeholder="Pega aquí los logs de Apache, Nginx, Syslog, auth.log o cualquier texto de eventos..."
            className="flex-1 bg-transparent resize-none outline-none p-4 text-xs font-mono text-[rgba(198,212,223,0.9)] placeholder-[rgba(143,152,160,0.4)]"
            spellCheck="false"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !logs.trim()}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(87,203,222,0.15) 0%, rgba(155,89,182,0.15) 100%)',
              border: '1px solid rgba(87,203,222,0.3)',
              color: '#fff'
            }}
          >
            {analyzing ? (
              <Bot className="w-3.5 h-3.5 animate-bounce" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            {analyzing ? 'Analizando con IA...' : 'Analizar Logs'}
          </button>
        </div>

        {/* Results Area */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col rounded-xl border border-[rgba(155,89,182,0.2)] bg-[rgba(23,26,33,0.8)] overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-[rgba(155,89,182,0.2)] bg-[rgba(155,89,182,0.05)]">
              <span className="text-[9px] uppercase tracking-widest text-[#9b59b6] font-semibold flex items-center gap-2">
                <Bot className="w-3 h-3" /> Resultados del Análisis
              </span>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-xs text-[rgba(198,212,223,0.9)] mb-4 leading-relaxed">{results.summary}</p>

              <div className="space-y-2">
                {results.threats.map((threat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-[rgba(201,64,64,0.2)] bg-[rgba(201,64,64,0.05)]">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#c94040] mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-[#c94040] mb-0.5">{threat.level} Risk</div>
                      <div className="text-xs text-[rgba(198,212,223,0.8)]">{threat.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
