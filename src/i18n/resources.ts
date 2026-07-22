// Central i18n resources. English is the source of truth; other languages
// provide translations for high-visibility UI. Missing keys fall back to English.

const en = {
  common: {
    language: "Language",
    signIn: "Sign in",
    signOut: "Sign out",
    analyzeProfile: "Analyze Profile",
    getStarted: "Get Started",
    save: "Save changes",
    saving: "Saving…",
    cancel: "Cancel",
    ok: "OK",
    close: "Close",
    loading: "Loading…",
    upgrade: "Upgrade to Pro",
    freePlan: "Free plan",
    perDay: "1 analysis / day",
    newReport: "New report",
    open: "Open",
    view: "View",
    comingSoon: "Coming soon",
    connect: "Connect Instagram",
    disconnect: "Disconnect",
    search: "Search",
  },
  nav: {
    features: "Features",
    pricing: "Pricing",
    testimonials: "Testimonials",
    faq: "FAQ",
  },
  sidebar: {
    dashboard: "Dashboard",
    analyze: "Analyze Profile",
    reports: "Reports",
    history: "History",
    billing: "Billing",
    settings: "Settings",
  },
  pages: {
    history: {
      title: "Analysis history",
      subtitle: "Every profile you've analyzed.",
      compare: "Compare reports",
      searchPh: "Search history",
      empty: "No matches found",
    },
    reports: {
      title: "Your reports",
      subtitle: "Full growth playbooks you've generated.",
      emptyTitle: "No reports yet",
      emptyDesc: "Run your first profile analysis to generate a full growth playbook.",
    },
    settings: {
      profile: "Profile",
      notifications: "Notifications",
      appearance: "Appearance",
      fullName: "Full name",
      email: "Email",
      darkMode: "Dark mode",
      changeAvatar: "Change avatar",
    },
  },
};

type Dict = typeof en;
const tr = (partial: any): { translation: Dict } => ({
  translation: { ...en, ...partial, common: { ...en.common, ...(partial.common || {}) }, nav: { ...en.nav, ...(partial.nav || {}) }, sidebar: { ...en.sidebar, ...(partial.sidebar || {}) }, pages: { ...en.pages, ...(partial.pages || {}) } } as Dict,
});

// Translations focus on the shared navigation / sidebar / common vocabulary
// that appears on every screen. Long-form content (marketing copy, AI report
// prose) falls back to English until localized copy is authored.
export const resources = {
  en: { translation: en },
  hi: tr({
    common: { language: "भाषा", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफ़ाइल विश्लेषण", getStarted: "शुरू करें", save: "बदलाव सहेजें", saving: "सहेज रहे हैं…", cancel: "रद्द करें", ok: "ठीक है", close: "बंद करें", loading: "लोड हो रहा है…", upgrade: "प्रो में अपग्रेड करें", freePlan: "फ़्री प्लान", perDay: "1 विश्लेषण / दिन", newReport: "नई रिपोर्ट", open: "खोलें", view: "देखें", comingSoon: "जल्द आ रहा है", connect: "इंस्टाग्राम कनेक्ट करें", disconnect: "डिस्कनेक्ट", search: "खोजें" },
    nav: { features: "विशेषताएँ", pricing: "मूल्य", testimonials: "प्रशंसापत्र", faq: "सामान्य प्रश्न" },
    sidebar: { dashboard: "डैशबोर्ड", analyze: "प्रोफ़ाइल विश्लेषण", reports: "रिपोर्ट्स", history: "इतिहास", billing: "बिलिंग", settings: "सेटिंग्स" },
    pages: { history: { title: "विश्लेषण इतिहास", subtitle: "आपकी सभी विश्लेषित प्रोफ़ाइलें।", compare: "रिपोर्ट्स की तुलना", searchPh: "इतिहास खोजें", empty: "कोई मेल नहीं मिला" }, reports: { title: "आपकी रिपोर्ट्स", subtitle: "आपके तैयार किए गए ग्रोथ प्लेबुक।", emptyTitle: "अभी कोई रिपोर्ट नहीं", emptyDesc: "अपनी पहली रिपोर्ट बनाने के लिए विश्लेषण चलाएँ।" }, settings: { profile: "प्रोफ़ाइल", notifications: "सूचनाएँ", appearance: "रूप-रंग", fullName: "पूरा नाम", email: "ईमेल", darkMode: "डार्क मोड", changeAvatar: "अवतार बदलें" } },
  }),
  bn: tr({
    common: { language: "ভাষা", signIn: "সাইন ইন", signOut: "সাইন আউট", analyzeProfile: "প্রোফাইল বিশ্লেষণ", getStarted: "শুরু করুন", save: "পরিবর্তন সংরক্ষণ", saving: "সংরক্ষণ হচ্ছে…", cancel: "বাতিল", ok: "ঠিক আছে", close: "বন্ধ", loading: "লোড হচ্ছে…", upgrade: "প্রো তে আপগ্রেড", freePlan: "ফ্রি প্ল্যান", perDay: "১ বিশ্লেষণ / দিন", newReport: "নতুন রিপোর্ট", open: "খুলুন", view: "দেখুন", comingSoon: "শীঘ্রই আসছে", connect: "ইনস্টাগ্রাম যুক্ত করুন", disconnect: "সংযোগ বিচ্ছিন্ন", search: "খুঁজুন" },
    nav: { features: "বৈশিষ্ট্য", pricing: "মূল্য", testimonials: "প্রশংসাপত্র", faq: "সাধারণ প্রশ্ন" },
    sidebar: { dashboard: "ড্যাশবোর্ড", analyze: "প্রোফাইল বিশ্লেষণ", reports: "রিপোর্ট", history: "ইতিহাস", billing: "বিলিং", settings: "সেটিংস" },
  }),
  te: tr({
    common: { language: "భాష", signIn: "సైన్ ఇన్", signOut: "సైన్ అవుట్", analyzeProfile: "ప్రొఫైల్ విశ్లేషణ", getStarted: "ప్రారంభించండి", save: "మార్పులను భద్రపరచు", saving: "భద్రపరుస్తోంది…", cancel: "రద్దు", ok: "సరే", close: "మూసివేయి", loading: "లోడ్ అవుతోంది…", upgrade: "ప్రోకి అప్‌గ్రేడ్", freePlan: "ఉచిత ప్లాన్", perDay: "1 విశ్లేషణ / రోజు", newReport: "కొత్త రిపోర్ట్", open: "తెరవండి", view: "చూడండి", comingSoon: "త్వరలో", connect: "ఇన్‌స్టాగ్రామ్ కనెక్ట్", disconnect: "డిస్‌కనెక్ట్", search: "వెతకండి" },
    nav: { features: "ఫీచర్లు", pricing: "ధర", testimonials: "అభిప్రాయాలు", faq: "ప్రశ్నలు" },
    sidebar: { dashboard: "డాష్‌బోర్డ్", analyze: "ప్రొఫైల్ విశ్లేషణ", reports: "రిపోర్టులు", history: "చరిత్ర", billing: "బిల్లింగ్", settings: "అమరికలు" },
  }),
  mr: tr({
    common: { language: "भाषा", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफाइल विश्लेषण", getStarted: "सुरू करा", save: "बदल जतन करा", saving: "जतन करत आहे…", cancel: "रद्द करा", ok: "ठीक", close: "बंद", loading: "लोड होत आहे…", upgrade: "प्रो मध्ये अपग्रेड", freePlan: "फ्री प्लॅन", perDay: "1 विश्लेषण / दिवस", newReport: "नवीन अहवाल", open: "उघडा", view: "पहा", comingSoon: "लवकरच", connect: "इंस्टाग्राम कनेक्ट", disconnect: "डिस्कनेक्ट", search: "शोधा" },
    nav: { features: "वैशिष्ट्ये", pricing: "किंमत", testimonials: "प्रशंसापत्रे", faq: "प्रश्न" },
    sidebar: { dashboard: "डॅशबोर्ड", analyze: "प्रोफाइल विश्लेषण", reports: "अहवाल", history: "इतिहास", billing: "बिलिंग", settings: "सेटिंग्ज" },
  }),
  ta: tr({
    common: { language: "மொழி", signIn: "உள்நுழை", signOut: "வெளியேறு", analyzeProfile: "சுயவிவரம் பகுப்பாய்வு", getStarted: "தொடங்குக", save: "மாற்றங்களை சேமி", saving: "சேமிக்கிறது…", cancel: "ரத்து", ok: "சரி", close: "மூடு", loading: "ஏற்றுகிறது…", upgrade: "ப்ரோ ஆக மேம்படுத்து", freePlan: "இலவச திட்டம்", perDay: "1 பகுப்பாய்வு / நாள்", newReport: "புதிய அறிக்கை", open: "திற", view: "காண்க", comingSoon: "விரைவில்", connect: "இன்ஸ்டாகிராம் இணை", disconnect: "துண்டி", search: "தேடு" },
    nav: { features: "அம்சங்கள்", pricing: "விலை", testimonials: "பாராட்டுகள்", faq: "கேள்விகள்" },
    sidebar: { dashboard: "டாஷ்போர்டு", analyze: "சுயவிவரம் பகுப்பாய்வு", reports: "அறிக்கைகள்", history: "வரலாறு", billing: "பில்லிங்", settings: "அமைப்புகள்" },
  }),
  gu: tr({
    common: { language: "ભાષા", signIn: "સાઇન ઇન", signOut: "સાઇન આઉટ", analyzeProfile: "પ્રોફાઇલ વિશ્લેષણ", getStarted: "શરૂ કરો", save: "ફેરફારો સાચવો", saving: "સાચવે છે…", cancel: "રદ કરો", ok: "બરાબર", close: "બંધ", loading: "લોડ થઇ રહ્યું છે…", upgrade: "પ્રો પર અપગ્રેડ", freePlan: "ફ્રી પ્લાન", perDay: "1 વિશ્લેષણ / દિવસ", newReport: "નવો રિપોર્ટ", open: "ખોલો", view: "જુઓ", comingSoon: "ટૂંક સમયમાં", connect: "ઇન્સ્ટાગ્રામ કનેક્ટ", disconnect: "ડિસ્કનેક્ટ", search: "શોધો" },
    nav: { features: "વિશેષતાઓ", pricing: "કિંમત", testimonials: "પ્રશંસાપત્રો", faq: "પ્રશ્નો" },
    sidebar: { dashboard: "ડેશબોર્ડ", analyze: "પ્રોફાઇલ વિશ્લેષણ", reports: "રિપોર્ટ્સ", history: "ઇતિહાસ", billing: "બિલિંગ", settings: "સેટિંગ્સ" },
  }),
  kn: tr({
    common: { language: "ಭಾಷೆ", signIn: "ಸೈನ್ ಇನ್", signOut: "ಸೈನ್ ಔಟ್", analyzeProfile: "ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಣೆ", getStarted: "ಪ್ರಾರಂಭಿಸಿ", save: "ಬದಲಾವಣೆ ಉಳಿಸಿ", saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ…", cancel: "ರದ್ದು", ok: "ಸರಿ", close: "ಮುಚ್ಚು", loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ…", upgrade: "ಪ್ರೊಗೆ ಅಪ್‌ಗ್ರೇಡ್", freePlan: "ಉಚಿತ ಯೋಜನೆ", perDay: "1 ವಿಶ್ಲೇಷಣೆ / ದಿನ", newReport: "ಹೊಸ ವರದಿ", open: "ತೆರೆಯಿರಿ", view: "ನೋಡಿ", comingSoon: "ಶೀಘ್ರದಲ್ಲಿ", connect: "ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಸಂಪರ್ಕಿಸಿ", disconnect: "ಸಂಪರ್ಕ ಕಡಿ", search: "ಹುಡುಕಿ" },
    nav: { features: "ವೈಶಿಷ್ಟ್ಯಗಳು", pricing: "ಬೆಲೆ", testimonials: "ಅಭಿಪ್ರಾಯಗಳು", faq: "ಪ್ರಶ್ನೆಗಳು" },
    sidebar: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", analyze: "ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಣೆ", reports: "ವರದಿಗಳು", history: "ಇತಿಹಾಸ", billing: "ಬಿಲ್ಲಿಂಗ್", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು" },
  }),
  ml: tr({
    common: { language: "ഭാഷ", signIn: "സൈൻ ഇൻ", signOut: "സൈൻ ഔട്ട്", analyzeProfile: "പ്രൊഫൈൽ വിശകലനം", getStarted: "ആരംഭിക്കുക", save: "മാറ്റങ്ങൾ സേവ്", saving: "സേവ് ചെയ്യുന്നു…", cancel: "റദ്ദാക്കുക", ok: "ശരി", close: "അടയ്ക്കുക", loading: "ലോഡുചെയ്യുന്നു…", upgrade: "പ്രോയിലേക്ക് അപ്‌ഗ്രേഡ്", freePlan: "സൗജന്യ പ്ലാൻ", perDay: "1 വിശകലനം / ദിവസം", newReport: "പുതിയ റിപ്പോർട്ട്", open: "തുറക്കുക", view: "കാണുക", comingSoon: "ഉടൻ വരുന്നു", connect: "ഇൻസ്റ്റാഗ്രാം കണക്റ്റ്", disconnect: "വിച്ഛേദിക്കുക", search: "തിരയുക" },
    nav: { features: "സവിശേഷതകൾ", pricing: "വില", testimonials: "അഭിപ്രായങ്ങൾ", faq: "ചോദ്യങ്ങൾ" },
    sidebar: { dashboard: "ഡാഷ്‌ബോർഡ്", analyze: "പ്രൊഫൈൽ വിശകലനം", reports: "റിപ്പോർട്ടുകൾ", history: "ചരിത്രം", billing: "ബില്ലിംഗ്", settings: "ക്രമീകരണങ്ങൾ" },
  }),
  pa: tr({
    common: { language: "ਭਾਸ਼ਾ", signIn: "ਸਾਈਨ ਇਨ", signOut: "ਸਾਈਨ ਆਊਟ", analyzeProfile: "ਪ੍ਰੋਫਾਈਲ ਵਿਸ਼ਲੇਸ਼ਣ", getStarted: "ਸ਼ੁਰੂ ਕਰੋ", save: "ਬਦਲਾਅ ਸੰਭਾਲੋ", saving: "ਸੰਭਾਲ ਰਿਹਾ…", cancel: "ਰੱਦ", ok: "ਠੀਕ", close: "ਬੰਦ", loading: "ਲੋਡ ਹੋ ਰਿਹਾ…", upgrade: "ਪ੍ਰੋ ਵਿੱਚ ਅਪਗ੍ਰੇਡ", freePlan: "ਫ੍ਰੀ ਪਲਾਨ", perDay: "1 ਵਿਸ਼ਲੇਸ਼ਣ / ਦਿਨ", newReport: "ਨਵੀਂ ਰਿਪੋਰਟ", open: "ਖੋਲ੍ਹੋ", view: "ਵੇਖੋ", comingSoon: "ਜਲਦੀ ਆ ਰਿਹਾ", connect: "ਇੰਸਟਾਗ੍ਰਾਮ ਕਨੈਕਟ", disconnect: "ਡਿਸਕਨੈਕਟ", search: "ਖੋਜੋ" },
    nav: { features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ", pricing: "ਕੀਮਤ", testimonials: "ਪ੍ਰਸ਼ੰਸਾ", faq: "ਸਵਾਲ" },
    sidebar: { dashboard: "ਡੈਸ਼ਬੋਰਡ", analyze: "ਪ੍ਰੋਫਾਈਲ ਵਿਸ਼ਲੇਸ਼ਣ", reports: "ਰਿਪੋਰਟਾਂ", history: "ਇਤਿਹਾਸ", billing: "ਬਿਲਿੰਗ", settings: "ਸੈਟਿੰਗਾਂ" },
  }),
  or: tr({
    common: { language: "ଭାଷା", signIn: "ସାଇନ୍ ଇନ୍", signOut: "ସାଇନ୍ ଆଉଟ୍", analyzeProfile: "ପ୍ରୋଫାଇଲ୍ ବିଶ୍ଳେଷଣ", getStarted: "ଆରମ୍ଭ କରନ୍ତୁ", save: "ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ", saving: "ସଞ୍ଚୟ କରୁଛି…", cancel: "ବାତିଲ୍", ok: "ଠିକ୍", close: "ବନ୍ଦ", loading: "ଲୋଡ୍ ହେଉଛି…", upgrade: "ପ୍ରୋକୁ ଅପଗ୍ରେଡ୍", freePlan: "ମାଗଣା ପ୍ଲାନ୍", perDay: "1 ବିଶ୍ଳେଷଣ / ଦିନ", newReport: "ନୂଆ ରିପୋର୍ଟ୍", open: "ଖୋଲନ୍ତୁ", view: "ଦେଖନ୍ତୁ", comingSoon: "ଶୀଘ୍ର ଆସୁଛି", connect: "ଇନଷ୍ଟାଗ୍ରାମ୍ ସଂଯୋଗ", disconnect: "ବିଚ୍ଛେଦ", search: "ଖୋଜନ୍ତୁ" },
    nav: { features: "ବିଶେଷତା", pricing: "ମୂଲ୍ୟ", testimonials: "ପ୍ରଶଂସା", faq: "ପ୍ରଶ୍ନ" },
    sidebar: { dashboard: "ଡ୍ୟାସବୋର୍ଡ୍", analyze: "ପ୍ରୋଫାଇଲ୍ ବିଶ୍ଳେଷଣ", reports: "ରିପୋର୍ଟ୍", history: "ଇତିହାସ", billing: "ବିଲିଙ୍ଗ", settings: "ସେଟିଙ୍ଗ୍" },
  }),
  ur: tr({
    common: { language: "زبان", signIn: "سائن ان", signOut: "سائن آؤٹ", analyzeProfile: "پروفائل تجزیہ", getStarted: "شروع کریں", save: "تبدیلیاں محفوظ کریں", saving: "محفوظ ہو رہا ہے…", cancel: "منسوخ", ok: "ٹھیک", close: "بند کریں", loading: "لوڈ ہو رہا ہے…", upgrade: "پرو میں اپ گریڈ", freePlan: "مفت پلان", perDay: "1 تجزیہ / دن", newReport: "نئی رپورٹ", open: "کھولیں", view: "دیکھیں", comingSoon: "جلد آ رہا ہے", connect: "انسٹاگرام منسلک", disconnect: "منقطع", search: "تلاش" },
    nav: { features: "خصوصیات", pricing: "قیمت", testimonials: "تعریفیں", faq: "سوالات" },
    sidebar: { dashboard: "ڈیش بورڈ", analyze: "پروفائل تجزیہ", reports: "رپورٹس", history: "تاریخ", billing: "بلنگ", settings: "ترتیبات" },
  }),
  as: tr({
    common: { language: "ভাষা", signIn: "ছাইন ইন", signOut: "ছাইন আউট", analyzeProfile: "প্ৰফাইল বিশ্লেষণ", getStarted: "আৰম্ভ কৰক", save: "সংৰক্ষণ কৰক", saving: "সংৰক্ষণ কৰি আছে…", cancel: "বাতিল", ok: "ঠিক", close: "বন্ধ", loading: "লোড হৈ আছে…", upgrade: "প্ৰোলৈ আপগ্ৰেড", freePlan: "বিনামূলীয়া প্লেন", perDay: "১ বিশ্লেষণ / দিন", newReport: "নতুন প্ৰতিবেদন", open: "খোলক", view: "চাওক", comingSoon: "সোনকালে আহিছে", connect: "ইনষ্টাগ্ৰাম সংযোগ", disconnect: "বিচ্ছিন্ন", search: "সন্ধান" },
    nav: { features: "বৈশিষ্ট্য", pricing: "মূল্য", testimonials: "প্ৰশংসা", faq: "প্ৰশ্ন" },
    sidebar: { dashboard: "ডেশ্বব’ৰ্ড", analyze: "প্ৰফাইল বিশ্লেষণ", reports: "প্ৰতিবেদন", history: "ইতিহাস", billing: "বিলিং", settings: "ছেটিংছ" },
  }),
  mai: tr({
    common: { language: "भाषा", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफाइल विश्लेषण", getStarted: "शुरू करू", save: "बदलाव सहेजू", saving: "सहेज रहल अछि…", cancel: "रद्द", ok: "ठीक", close: "बंद", loading: "लोड भ' रहल अछि…", upgrade: "प्रो में अपग्रेड", freePlan: "फ्री प्लान", perDay: "1 विश्लेषण / दिन", newReport: "नव रिपोर्ट", open: "खोलू", view: "देखू", comingSoon: "जल्दी आबि रहल", connect: "इंस्टाग्राम जोड़ू", disconnect: "अलग करू", search: "ताकू" },
    nav: { features: "विशेषता", pricing: "मूल्य", testimonials: "प्रशंसा", faq: "प्रश्न" },
    sidebar: { dashboard: "डैशबोर्ड", analyze: "प्रोफाइल विश्लेषण", reports: "रिपोर्ट", history: "इतिहास", billing: "बिलिंग", settings: "सेटिंग्स" },
  }),
  sa: tr({
    common: { language: "भाषा", signIn: "प्रवेशः", signOut: "निर्गमः", analyzeProfile: "व्यक्तिविश्लेषणम्", getStarted: "आरभताम्", save: "परिवर्तनं रक्ष्यताम्", saving: "रक्षति…", cancel: "निरस्तम्", ok: "अस्तु", close: "पिधानम्", loading: "आगच्छति…", upgrade: "प्रो-उन्नयनम्", freePlan: "निःशुल्कयोजना", perDay: "१ विश्लेषणम् / दिनम्", newReport: "नवप्रतिवेदनम्", open: "उद्घाट्यताम्", view: "पश्यतु", comingSoon: "शीघ्रम् आगमिष्यति", connect: "इन्स्टाग्रामसम्बन्धः", disconnect: "विच्छेदः", search: "अन्वेषणम्" },
    nav: { features: "विशेषताः", pricing: "मूल्यम्", testimonials: "प्रशंसा", faq: "प्रश्नाः" },
    sidebar: { dashboard: "फलकम्", analyze: "व्यक्तिविश्लेषणम्", reports: "प्रतिवेदनानि", history: "इतिहासः", billing: "देयम्", settings: "विन्यासाः" },
  }),
  ne: tr({
    common: { language: "भाषा", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफाइल विश्लेषण", getStarted: "सुरु गर्नुहोस्", save: "परिवर्तन सुरक्षित", saving: "सुरक्षित गर्दै…", cancel: "रद्द", ok: "ठीक", close: "बन्द", loading: "लोड हुँदै…", upgrade: "प्रो मा अपग्रेड", freePlan: "निःशुल्क योजना", perDay: "१ विश्लेषण / दिन", newReport: "नयाँ रिपोर्ट", open: "खोल्नुहोस्", view: "हेर्नुहोस्", comingSoon: "चाँडै आउँदै", connect: "इन्स्टाग्राम जडान", disconnect: "विच्छेदन", search: "खोज्नुहोस्" },
    nav: { features: "विशेषताहरू", pricing: "मूल्य", testimonials: "प्रशंसा", faq: "प्रश्नहरू" },
    sidebar: { dashboard: "ड्यासबोर्ड", analyze: "प्रोफाइल विश्लेषण", reports: "रिपोर्टहरू", history: "इतिहास", billing: "बिलिङ", settings: "सेटिङहरू" },
  }),
  kok: tr({
    common: { language: "भास", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफायल विश्लेशण", getStarted: "सुरू करात", save: "बदल जतनाय", saving: "जतनाय जाता…", cancel: "रद्द", ok: "बरें", close: "बंद", loading: "लोड जाता…", upgrade: "प्रो कडेन अपग्रेड", freePlan: "फुकट प्लान", perDay: "१ विश्लेशण / दीस", newReport: "नवो अहवाल", open: "उगडात", view: "पळयात", comingSoon: "बेगीन येता", connect: "इन्स्टाग्राम जोडात", disconnect: "वेगळें", search: "सोदात" },
    nav: { features: "वैशिष्ट्यां", pricing: "मोल", testimonials: "प्रशंसा", faq: "प्रस्न" },
    sidebar: { dashboard: "डॅशबोर्ड", analyze: "प्रोफायल विश्लेशण", reports: "अहवाल", history: "इतिहास", billing: "बिलिंग", settings: "सेटिंग्स" },
  }),
  ks: tr({
    common: { language: "زَبان", signIn: "سائن اِن", signOut: "سائن آوٹ", analyzeProfile: "پروفائل تَجزیہ", getStarted: "شُروع کٔرِو", save: "تبدیلی محفوظ", saving: "محفوظ ہٕوان…", cancel: "منسوخ", ok: "ٹھیٖک", close: "بند", loading: "لوڈ ہٕوان…", upgrade: "پرو اپ گریڈ", freePlan: "مفت پلان", perDay: "1 تجزیہ / دۄہ", newReport: "نۆو رپورٹ", open: "کھۄلِو", view: "وُچھِو", comingSoon: "جلد ییِوان", connect: "انسٹاگرام کنکٹ", disconnect: "منقطع", search: "ژھانڈِو" },
    nav: { features: "خصوصیات", pricing: "قیمَت", testimonials: "تعریف", faq: "سوال" },
    sidebar: { dashboard: "ڈیش بورڈ", analyze: "پروفائل تجزیہ", reports: "رپورٹ", history: "تٲریٖخ", billing: "بلنگ", settings: "ترتیبات" },
  }),
  sd: tr({
    common: { language: "ٻولي", signIn: "سائن ان", signOut: "سائن آئوٽ", analyzeProfile: "پروفائل تجزيو", getStarted: "شروع ڪريو", save: "تبديليون محفوظ", saving: "محفوظ ٿي رهيو…", cancel: "منسوخ", ok: "ٺيڪ", close: "بند", loading: "لوڊ ٿي رهيو…", upgrade: "پرو اپگريڊ", freePlan: "مفت پلان", perDay: "1 تجزيو / ڏينهن", newReport: "نئون رپورٽ", open: "کوليو", view: "ڏسو", comingSoon: "جلد اچي پيو", connect: "انسٽاگرام ڳنڍيو", disconnect: "الڳ ڪريو", search: "ڳوليو" },
    nav: { features: "خاصيتون", pricing: "قيمت", testimonials: "تعريفون", faq: "سوال" },
    sidebar: { dashboard: "ڊيش بورڊ", analyze: "پروفائل تجزيو", reports: "رپورٽون", history: "تاريخ", billing: "بلنگ", settings: "سيٽنگون" },
  }),
  doi: tr({
    common: { language: "बोली", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफाइल विश्लेषण", getStarted: "शुरू करो", save: "बदलाव सहेजो", saving: "सहेजी करदा ऐ…", cancel: "रद्द", ok: "ठीक", close: "बंद", loading: "लोड होआ करदा ऐ…", upgrade: "प्रो च अपग्रेड", freePlan: "फ्री प्लान", perDay: "1 विश्लेषण / दिन", newReport: "नमीं रिपोर्ट", open: "खोलो", view: "दिक्खो", comingSoon: "जल्दी आवा करदा", connect: "इंस्टाग्राम जोड़ो", disconnect: "अलग करो", search: "तलाशो" },
    nav: { features: "विशेषताएं", pricing: "कीमत", testimonials: "प्रशंसा", faq: "सवाल" },
    sidebar: { dashboard: "डैशबोर्ड", analyze: "प्रोफाइल विश्लेषण", reports: "रिपोर्ट", history: "इतिहास", billing: "बिलिंग", settings: "सेटिंग्स" },
  }),
  mni: tr({
    common: { language: "লোন", signIn: "সাইন ইন", signOut: "সাইন আউট", analyzeProfile: "প্রোফাইল বিশ্লেষণ", getStarted: "হৌবা", save: "সেভ তৌবা", saving: "সেভ তৌরি…", cancel: "মথন্তবা", ok: "চুম্মি", close: "থিংবা", loading: "লোড তৌরি…", upgrade: "প্রো অপগ্রেড", freePlan: "ফ্রি প্লান", perDay: "১ বিশ্লেষণ / নুমিৎ", newReport: "অনৌবা রিপোর্ট", open: "হাংবা", view: "য়েংবা", comingSoon: "থুনা লাক্কনি", connect: "ইনস্টাগ্রাম শম্নবা", disconnect: "খায়দোকপা", search: "থিবা" },
    nav: { features: "মশক্", pricing: "মমল", testimonials: "থাগৎপা", faq: "ৱাহং" },
    sidebar: { dashboard: "ড্যাশবোর্দ", analyze: "প্রোফাইল বিশ্লেষণ", reports: "রিপোর্ট", history: "ইতিহাস", billing: "বিলিং", settings: "সেটিংস" },
  }),
  brx: tr({
    common: { language: "राव", signIn: "साइन इन", signOut: "साइन आउट", analyzeProfile: "प्रोफाइल आलाय", getStarted: "जागाय", save: "थांख्रुम", saving: "थांख्रुम खालामगासिनो…", cancel: "नंलि", ok: "ठीक", close: "बन्द", loading: "लोड जागासिनो…", upgrade: "प्रो अपग्रेड", freePlan: "फ्रि प्लान", perDay: "1 आलाय / सान", newReport: "गोदान रिपर्ट", open: "खौलाय", view: "नाय", comingSoon: "गोख्रों फैगोन", connect: "इन्स्टाग्राम फोनांजाब", disconnect: "गुबुन", search: "नागिर" },
    nav: { features: "मोन्थाय", pricing: "मान", testimonials: "फुंगै", faq: "सोंथि" },
    sidebar: { dashboard: "डैशबर्ड", analyze: "प्रोफाइल आलाय", reports: "रिपर्ट", history: "जौगा", billing: "बिलिं", settings: "सेटिं" },
  }),
};
