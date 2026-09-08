import React, { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, Loader2, Mic, MicOff, Send, Trash2, Volume2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

type ChatLanguage = 'en' | 'hi' | 'mr';
type Message = { id: number; role: 'user' | 'assistant'; text: string };
type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

const languageOptions: { value: ChatLanguage; label: string; speech: string }[] = [
  { value: 'en', label: 'English', speech: 'en-IN' },
  { value: 'hi', label: 'Hindi', speech: 'hi-IN' },
  { value: 'mr', label: 'Marathi', speech: 'mr-IN' },
];

const welcome: Record<ChatLanguage, string> = {
  en: 'Namaste! I can help with crop prices, mandi information, market comparison, selling produce, farming guidance, and navigating AgriLink.',
  hi: 'नमस्ते! मैं फसल भाव, मंडी की जानकारी, बाजार तुलना, उपज बेचने, खेती की सलाह और AgriLink में मार्गदर्शन में मदद कर सकता हूं।',
  mr: 'नमस्कार! मी पीकभाव, मंडीची माहिती, बाजार तुलना, उत्पादन विक्री, शेती मार्गदर्शन आणि AgriLink वापरण्यात मदत करू शकतो.',
};

const fallback: Record<ChatLanguage, string> = {
  en: 'I can help with crop prices, mandi information, market comparison, selling produce, farming guidance, or finding a page on AgriLink.',
  hi: 'मैं फसल भाव, मंडी की जानकारी, बाजार तुलना, उपज बेचने, खेती की सलाह या AgriLink का पेज खोजने में मदद कर सकता हूं।',
  mr: 'मी पीकभाव, मंडीची माहिती, बाजार तुलना, उत्पादन विक्री, शेती मार्गदर्शन किंवा AgriLink वरील पेज शोधण्यात मदत करू शकतो.',
};

function getReply(message: string, language: ChatLanguage): string {
  const query = message.toLowerCase();
  if (language === 'hi') {
    if (query.includes('भाव') || query.includes('price')) return 'आज के फसल भाव देखने के लिए Market Prices पेज खोलें। आप फसल, राज्य, जिला और बाजार के अनुसार फिल्टर कर सकते हैं।';
    if (query.includes('मंडी') || query.includes('market')) return 'Market Prices पेज पर अलग-अलग मंडियों के भाव और दूरी देखें। Compare Markets पेज परिवहन लागत के बाद अनुमानित कमाई भी दिखाता है।';
    if (query.includes('बेच') || query.includes('sell')) return 'Sell Produce पेज पर अपनी फसल, मात्रा, भाव, स्थान और गुणवत्ता की जानकारी भरकर लिस्टिंग प्रकाशित करें।';
    if (query.includes('खेती') || query.includes('crop') || query.includes('फसल')) return 'फसल की गुणवत्ता बनाए रखें, कटाई की तारीख दर्ज करें और बेचने से पहले नजदीकी मंडियों के भाव व परिवहन लागत की तुलना करें।';
    if (query.includes('page') || query.includes('पेज') || query.includes('help')) return 'Market Prices भावों के लिए, Compare Markets तुलना के लिए, Marketplace खरीद-बिक्री के लिए और Price Alerts भाव सूचना के लिए उपयोग करें।';
    return fallback.hi;
  }
  if (language === 'mr') {
    if (query.includes('भाव') || query.includes('price')) return 'आजचे पीकभाव पाहण्यासाठी Market Prices पेज उघडा. तुम्ही पीक, राज्य, जिल्हा आणि बाजारानुसार फिल्टर करू शकता.';
    if (query.includes('मंडी') || query.includes('market')) return 'Market Prices पेजवर वेगवेगळ्या मंडींचे भाव आणि अंतर पहा. Compare Markets पेज वाहतूक खर्चानंतरची अंदाजे कमाई दाखवते.';
    if (query.includes('विक') || query.includes('sell')) return 'Sell Produce पेजवर पीक, प्रमाण, भाव, ठिकाण आणि गुणवत्ता भरून लिस्टिंग प्रकाशित करा.';
    if (query.includes('शेती') || query.includes('crop') || query.includes('पीक')) return 'पिकाची गुणवत्ता जपा, कापणीची तारीख नोंदवा आणि विक्रीपूर्वी जवळच्या बाजारांचे भाव व वाहतूक खर्चाची तुलना करा.';
    if (query.includes('page') || query.includes('पेज') || query.includes('help')) return 'भावांसाठी Market Prices, तुलनेसाठी Compare Markets, खरेदी-विक्रीसाठी Marketplace आणि सूचनांसाठी Price Alerts वापरा.';
    return fallback.mr;
  }
  if (query.includes('price') || query.includes('crop')) return 'Open Market Prices to compare current crop prices. You can filter by crop, state, district, and market.';
  if (query.includes('mandi') || query.includes('market')) return 'Market Prices shows mandi prices and distances. Compare Markets estimates your net earnings after transportation costs.';
  if (query.includes('sell') || query.includes('produce')) return 'Open Sell Produce to add your crop, quantity, expected price, location, quality grade, and publish a listing.';
  if (query.includes('farm') || query.includes('crop')) return 'Keep crop quality consistent, record the harvest date, and compare nearby prices and transport costs before selling.';
  if (query.includes('page') || query.includes('help') || query.includes('navigate')) return 'Use Market Prices for rates, Compare Markets for earnings, Marketplace for listings, and Price Alerts for notifications.';
  return fallback.en;
}

export function AgriChatbot() {
  const { language: siteLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage>(siteLanguage);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: 'assistant', text: welcome[siteLanguage] }]);
  const nextId = useRef(2);

  useEffect(() => {
    setLanguage(siteLanguage);
  }, [siteLanguage]);

  useEffect(() => () => {
    recognitionRef.current?.stop();
  }, []);

  const clearChat = () => {
    setMessages([{ id: nextId.current++, role: 'assistant', text: welcome[language] }]);
    window.speechSynthesis?.cancel();
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const selected = languageOptions.find((option) => option.value === language)!;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selected.speech;
    const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(selected.speech.slice(0, 2)));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    const selected = languageOptions.find((option) => option.value === language)!;
    recognition.lang = selected.speech;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) setInput((current) => `${current}${current ? ' ' : ''}${transcript}`);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((current) => [...current, { id: nextId.current++, role: 'user', text }]);
    setLoading(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: nextId.current++, role: 'assistant', text: getReply(text, language) }]);
      setLoading(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-5 sm:right-5">
      {open && (
        <section className="absolute bottom-14 right-0 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-card border border-soil-100 bg-white shadow-card" aria-label="AgriLink AI assistant">
          <div className="flex items-center justify-between border-b border-soil-100 bg-field-50 px-4 py-3">
            <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-field-700 text-white"><Bot size={16} /></span><div><h2 className="text-sm font-semibold text-soil-900">AgriLink Assistant</h2><span className="text-xs text-soil-900/50">AI demo assistant</span></div></div>
            <div className="flex items-center gap-1"><button type="button" onClick={clearChat} className="rounded p-1.5 text-soil-900/50 hover:bg-white" aria-label="Clear chat" title="Clear chat"><Trash2 size={15} /></button><button type="button" onClick={() => setOpen(false)} className="rounded p-1.5 text-soil-900/50 hover:bg-white" aria-label="Close chatbot" title="Close chatbot"><X size={16} /></button></div>
          </div>
          <div className="border-b border-soil-100 px-3 py-2"><label className="sr-only" htmlFor="chat-language">Chat language</label><div className="relative"><select id="chat-language" value={language} onChange={(event) => setLanguage(event.target.value as ChatLanguage)} className="w-full appearance-none rounded-card border border-soil-100 bg-white px-3 py-2 text-sm text-soil-900"><option value="en">English</option><option value="hi">Hindi</option><option value="mr">Marathi</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soil-900/50" /></div></div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3" aria-live="polite">
            {messages.map((message) => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-card px-3 py-2 text-sm ${message.role === 'user' ? 'bg-field-700 text-white' : 'bg-soil-50 text-soil-900/80'}`}><p className="leading-relaxed">{message.text}</p>{message.role === 'assistant' && <button type="button" onClick={() => speak(message.text)} className="mt-1.5 inline-flex items-center gap-1 text-xs text-field-700 hover:underline" aria-label="Read reply aloud"><Volume2 size={14} /> Listen</button>}</div></div>)}
            {loading && <div className="flex items-center gap-2 text-xs text-soil-900/50"><Loader2 size={15} className="animate-spin" /> Thinking...</div>}
          </div>
          <div className="border-t border-soil-100 p-3"><div className="flex items-end gap-2"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Ask about AgriLink..." rows={1} className="min-h-10 flex-1 resize-none rounded-card border border-soil-100 px-3 py-2.5 text-sm text-soil-900 placeholder:text-soil-900/40 focus:border-field-500" /><button type="button" onClick={toggleListening} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-card border ${listening ? 'border-field-500 bg-field-50 text-field-700' : 'border-soil-100 bg-white text-soil-900/60 hover:bg-soil-50'}`} aria-label={listening ? 'Stop listening' : 'Start voice input'} title={listening ? 'Stop listening' : 'Start voice input'}>{listening ? <MicOff size={16} /> : <Mic size={16} />}</button><button type="button" onClick={sendMessage} disabled={!input.trim() || loading} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-field-700 text-white hover:bg-field-800 disabled:cursor-not-allowed disabled:bg-field-300" aria-label="Send message"><Send size={16} /></button></div>{listening && <div className="mt-1.5 text-xs text-field-700">Listening...</div>}</div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((current) => !current)} className="flex h-12 w-12 items-center justify-center rounded-full bg-field-700 text-white shadow-card hover:bg-field-800" aria-label={open ? 'Close chatbot' : 'Open chatbot'} title="AgriLink Assistant"><Bot size={21} /></button>
    </div>
  );
}
