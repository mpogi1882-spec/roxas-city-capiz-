import React, { useState, useEffect } from 'react';
import { Menu, X, Anchor, MapPin, Utensils, MessageCircle, ChevronRight, MessageSquare, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTravelAdvise } from './services/geminiService';

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className={isScrolled ? 'text-ocean-900' : 'text-white'} size={24} />
          <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-ocean-900' : 'text-white'}`}>
            Roxas <span className="text-sand-500 italic">Capiz</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {['Discover', 'Eat', 'Stay', 'Guide'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium hover:text-sand-500 transition-colors ${isScrolled ? 'text-ocean-900' : 'text-white'}`}>
              {item}
            </a>
          ))}
          <button className="bg-sand-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-ocean-900 transition-all shadow-lg hover:shadow-xl">
            Book Experience
          </button>
        </div>
        <Menu className="md:hidden text-white" size={24} />
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1544123089-18214df9b3aa?auto=format&fit=crop&q=80&w=2070" 
        alt="Roxas City Coast" 
        className="w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 via-ocean-900/40 to-transparent" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-6xl md:text-8xl text-white font-serif leading-[1.1] mb-6">
          Savor the <span className="text-sand-500 italic">Seafood</span> Capital.
        </h1>
        <p className="text-lg text-white/80 mb-8 font-sans leading-relaxed max-w-lg">
          From the historic bells of Panay to the freshest catch on the shores of Baybay, 
          discover the soul of the Philippines in Roxas City.
        </p>
        <div className="flex gap-4">
          <button className="bg-sand-500 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-ocean-900 transition-all flex items-center gap-2 group">
            Start Your Journey <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
            View Map
          </button>
        </div>
      </motion.div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
      <div className="w-1 h-12 rounded-full bg-white/30 flex justify-center pt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </div>
  </section>
);

const Attractions = () => {
  const list = [
    { title: "Panay Church & Big Bell", desc: "Home to the largest bell in Asia, cast from 70 sacks of gold coins.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000" },
    { title: "Baybay Beach", desc: "A 7km stretch of gray sand beach perfect for watching sunsets and eating seafood.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" },
    { title: "Santa Monica Ruins", desc: "Walk through the echoes of history in these beautifully preserved stone structures.", img: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000" },
  ];

  return (
    <section id="discover" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl text-ocean-900 mb-4">Timeless Heritage</h2>
            <p className="text-gray-500 max-w-md">Discover the rich history and natural beauty that makes Roxas City the soul of Panay Island.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[450px] overflow-hidden rounded-2xl mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SeafoodSection = () => (
  <section id="eat" className="py-24 bg-ocean-900 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
      <img src="https://images.unsplash.com/photo-1559739511-255013098ced?auto=format&fit=crop&q=80&w=1000" alt="Texture" className="w-full h-full object-cover" />
    </div>
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="aspect-square rounded-full border-2 border-sand-500/30 absolute -top-10 -left-10 w-full animate-spin-slow" />
        <img 
          src="https://images.unsplash.com/photo-1625944111352-7848f9518342?auto=format&fit=crop&q=80&w=1000" 
          alt="Fresh Seafood" 
          className="relative z-10 w-full aspect-square object-cover rounded-2xl shadow-2xl"
        />
      </div>
      <div className="relative z-10">
        <span className="text-sand-500 font-bold uppercase tracking-widest text-sm mb-4 block">Gastronomic Capital</span>
        <h2 className="text-5xl text-white mb-6 leading-tight italic">Fresh from the Mangroves to your Plate.</h2>
        <p className="text-white/70 mb-8 leading-relaxed text-lg">
          Roxas City isn't called the Seafood Capital by accident. Indulge in the rarest 'Diwal' (Angel Wings Shell), 
          succulent oysters, and giant mud crabs harvested fresh daily from our rich coastal waters.
        </p>
        <ul className="space-y-4 mb-10">
          {['Authentic Talabahan Experience', 'Sustainably Farmed Shellfish', 'Riverside Dining Atmosphere'].map((point, i) => (
            <li key={i} className="flex items-center gap-3 text-white/90">
              <div className="w-5 h-5 rounded-full bg-sand-500 flex items-center justify-center">
                <ChevronRight className="text-white" size={12} />
              </div>
              {point}
            </li>
          ))}
        </ul>
        <button className="bg-white text-ocean-900 px-10 py-4 rounded-full font-bold hover:bg-sand-500 hover:text-white transition-all">
          Explore Best Eats
        </button>
      </div>
    </div>
  </section>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Halin bala! Welcome to Roxas City. I'm your Capiz Concierge. Ask me anything about our city!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const response = await getTravelAdvise(userMsg);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-[350px] h-[500px] shadow-2xl rounded-3xl overflow-hidden flex flex-col mb-6"
          >
            <div className="bg-ocean-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sand-500 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Capiz Concierge</h4>
                  <span className="text-xs text-sand-500 font-medium">Online • Local Expert</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-sand-500 text-white rounded-br-none' : 'bg-pearl-50 text-ocean-900 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-pearl-50 p-3 rounded-2xl animate-pulse text-xs text-gray-500">
                    Concierge is thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-pearl-50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..." 
                  className="flex-1 bg-pearl-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-sand-500 outline-none"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-ocean-900 rounded-full flex items-center justify-center text-white hover:bg-sand-500 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-sand-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Attractions />
      <SeafoodSection />
      
      {/* Footer */}
      <footer className="bg-pearl-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
            <Anchor className="text-ocean-900" size={32} />
            <span className="text-3xl font-serif font-bold italic text-ocean-900">Roxas Capiz</span>
          </div>
          <p className="text-gray-500 mb-8">Visit the Heart of the Philippines. Experience nature and nourishment.</p>
          <div className="flex justify-center gap-6 mb-12">
            {['Instagram', 'Facebook', 'Twitter'].map(social => (
              <a key={social} href="#" className="text-sm font-bold text-ocean-900 hover:text-sand-500 uppercase tracking-widest">{social}</a>
            ))}
          </div>
          <p className="text-xs text-gray-400">© 2026 Visit Roxas City. All rights reserved.</p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
