import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Bitcoin, Loader2, ArrowRightLeft } from "lucide-react";

export default function CryptoWidget() {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                // Fetch BTC, ETH, SOL prices
                const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur&include_24hr_change=true");
                const data = await res.json();
                
                if (data.bitcoin) {
                    setCryptoData([
                        { name: "Bitcoin", symbol: "BTC", price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change, color: "text-amber-500" },
                        { name: "Ethereum", symbol: "ETH", price: data.ethereum.usd, change: data.ethereum.usd_24h_change, color: "text-blue-500" },
                        { name: "Solana", symbol: "SOL", price: data.solana.usd, change: data.solana.usd_24h_change, color: "text-purple-500" },
                    ]);
                }
            } catch (err) {
                console.error("Crypto API error:", err);
            }
            setLoading(false);
        };

        fetchCrypto();
        const interval = setInterval(fetchCrypto, 60000); // refresh every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="h-full p-6 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-amber-500/20 rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-between"
        >
            <div className="flex justify-between items-center mb-4 border-b border-cyber-100 dark:border-cyber-900 pb-3">
                <h2 className="text-lg font-bold text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
                    <Bitcoin className="text-amber-500" size={20} /> Crypto Markets
                </h2>
                <div className="text-xs text-cyber-400 flex items-center gap-1 font-medium bg-cyber-100 dark:bg-cyber-900 px-2 py-1 rounded">
                    <ArrowRightLeft size={12} /> USD
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center min-h-[140px]">
                {loading && cryptoData.length === 0 ? (
                    <div className="flex justify-center text-amber-500 py-6">
                        <Loader2 className="animate-spin" size={24} />
                    </div>
                ) : cryptoData.length > 0 ? (
                    <div className="space-y-4">
                        {cryptoData.map(coin => (
                            <div key={coin.symbol} className="flex justify-between items-center group">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full bg-cyber-100 dark:bg-cyber-900 flex items-center justify-center font-bold text-xs ${coin.color}`}>
                                        {coin.symbol}
                                    </div>
                                    <span className="font-semibold text-cyber-700 dark:text-cyber-100 group-hover:text-cyber-950 dark:group-hover:text-cyber-100 transition-colors">
                                        {coin.name}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-cyber-950 dark:text-cyber-100 font-mono tracking-tight">
                                        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className={`text-xs flex items-center justify-end gap-1 font-medium ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {coin.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {Math.abs(coin.change).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-center text-cyber-500 dark:text-cyber-400">
                        Données indisponibles.
                    </p>
                )}
            </div>
        </motion.div>
    );
}
