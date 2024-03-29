import axios from "axios";
import { sendText, sendButton } from "./english.js";

export const faqMalayalam =
    "*പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ*\n\n1. മറ്റ് സംഭാവന രീതികളിൽ ചിട്ടികൾ നടത്തുന്നതിനുള്ള കെ.എസ്.എഫ്.ഇ. ചിട്ടികളിൽ ചേരാൻ പ്രധാനമായ ആകരണങ്ങൾ എന്താണ്?\n\n2. ഞാൻ കേട്ടിട്ടുള്ളത് കെ.എസ്.എഫ്.ഇ. യുടെ ജാമ്യ വ്യവസ്ഥകൾ വഴക്കമില്ലാത്തവയും ബുദ്ധിമുട്ടേറിയതും ആണെന്നാണ്. ശരിയല്ലേ?\n\n3. മറ്റ് സ്ഥാപനങ്ങളിലെ സമാന പദ്ധതികളെ അപേക്ഷിച്ച് കെ.എസ്.എഫ്.ഇ. യുടെ ഗൃഹോപകരണ - വാഹന വായ്പാ പദ്ധതി മെച്ചപ്പെട്ടതാണ് എന്ന് പറയാൻ കാരണമെന്ത്?\n\n4. കെ.എസ്.എഫ്.ഇ. ഭവന വായ്പയ്ക്ക് മറ്റ് സ്ഥാപനങ്ങൾ മുന്നോട്ടുവെയ്ക്കുന്ന ഭവന വായ്പാ പദ്ധതിയുമായി എന്ത് വ്യത്യാസമാണ് ഉള്ളത്?\n\n5. കെ.എസ്.എഫ്.ഇ. യുടെ സ്വർണ്ണപ്പണയ വായ്പയുടെ പ്രധാന സവിശേഷതകൾ എന്തൊക്കെയാണ്?\n\n6. കെ.എസ്.എഫ്.ഇ. വ്യക്തിഗത വായ്പയുടെ സവിശേഷതകൾ എന്തൊക്കെ?\n\n7. ചിട്ടിപ്പണവും വായ്പാത്തുകയും ലഭിയ്ക്കാൻ കെ.എസ്.എഫ്.ഇ. യിൽ കാലതാമസം ഏറെയുണ്ട് എന്ന് കേൾക്കുന്നത് ശരിയാണോ?\n\n8. പരാതികൾ പരിഹരിയ്ക്കുന്നതിന് എന്തെങ്കിലും സംവിധാനമുണ്ടോ?\n\n9. എങ്ങനെയാണ് ശാഖകൾക്ക് മേലുള്ള നിയന്ത്രണം സാധ്യമാക്കിയിട്ടുള്ളത്?\n\n10. ഈയിടെയായി പ്രവാസി മലയാളികൾക്കും ചിട്ടി തുടങ്ങിയതായി വാർത്തയുണ്ടല്ലോ?";

export const faqListMlOptions = [
    {
        id: "1",
        title: "ചോദ്യം 1",
        description: "മറ്റ് സംഭാവന രീതികളിൽ ചിട്ടികൾ നടത്തുന്നതിനുള്ള...?",
    },
    {
        id: "2",
        title: "ചോദ്യം 2",
        description:
            "ഞാൻ കേട്ടിട്ടുള്ളത് കെ.എസ്.എഫ്.ഇ. യുടെ ജാമ്യ വ്യവസഥകൾ...?",
    },
    {
        id: "3",
        title: "ചോദ്യം 3",
        description:
            "മറ്റ് സ്ഥാപനങ്ങളിലെ സമാന പദ്ധതികളെ അപേക്ഷിച്ച് കെ.എസ്.എഫ്.ഇ. യുടെ...?",
    },
    {
        id: "4",
        title: "ചോദ്യം 4",
        description: "കെ.എസ്.എഫ്.ഇ. ഭവന വായ്പയ്ക്ക് മറ്റ് സ്ഥാപനങ്ങൾ...",
    },
    {
        id: "5",
        title: "ചോദ്യം 5",
        description:
            "കെ.എസ്.എഫ്.ഇ. യുടെ സ്വർണ്ണപ്പണയ വായ്പയുടെ പ്രധാന സവിശേഷതകൾ...",
    },
    {
        id: "6",
        title: "ചോദ്യം 6",
        description: "കെ.എസ്.എഫ്.ഇ. വ്യക്തിഗത വായ്പയുടെ സവിശേഷതകൾ...",
    },
    {
        id: "7",
        title: "ചോദ്യം 7",
        description:
            "ചിട്ടിപ്പണവും വായ്പാത്തുകയും ലഭിയ്ക്കാൻ കെ.എസ്.എഫ്.ഇ. യിൽ ...",
    },
    {
        id: "8",
        title: "ചോദ്യം 8",
        description: "പരാതികൾ പരിഹരിയ്ക്കുന്നതിന് എന്തെങ്കിലും സംവിധാനമുണ്ടോ?",
    },
    {
        id: "9",
        title: "ചോദ്യം 9",
        description:
            "എങ്ങനെയാണ് ശാഖകൾക്ക് മേലുള്ള നിയന്ത്രണം സാധ്യമാക്കിയിട്ടുള്ളത്?",
    },
    {
        id: "10",
        title: "ചോദ്യം 10",
        description: "ഈയിടെയായി പ്രവാസി മലയാളികൾക്കും ചിട്ടി തുടങ്ങിയതായി...",
    },
];

export const faqListMalayalam = [
    {
        id: "q1",
        question:
            "മറ്റ് നിക്ഷേപ പദ്ധതികളിൽ ചേരുന്നതിനേക്കാൾ കെ.എസ്.എഫ്.ഇ. ചിട്ടിയിൽ ചേരുന്നത് കൂടുതൽ ആകർഷണീയമാകുന്നത് എങ്ങനെ?",
        answer: "വായ്പയുടേയും നിക്ഷേപത്തിന്റേയും പ്രത്യേകതകൾ കൂട്ടിയിണക്കി ഉണ്ടാക്കിയ ഒരു പദ്ധതിയാണ് ചിട്ടി. ചിട്ടിയിൽ ഒരു വരിക്കാരന് ഒരു പ്രത്യേക ശതമാനം കിഴിവിൽ ചിട്ടി ലേലം വിളിച്ചെടുക്കാനും പണം മുൻകൂട്ടി കൈപ്പറ്റാനും സാധിയ്ക്കുന്നു. അതേ സമയം മറ്റ് റെക്കറിംഗ് ഡെപ്പോസിറ്റുകളിൽ അടച്ച പണത്തിനെ ബന്ധപ്പെടുത്തി മാത്രമേ, തുക കൈപ്പറ്റാൻ സാധിക്കൂ. തുടക്കത്തിൽ പരമാവധി കുറവിന് ചിട്ടി വിളിച്ചെടുക്കാൻ ധാരാളം പേർ വരുമ്പോൾ നറുക്കിനെ ആശ്രയിക്കുന്നത് കൊണ്ടുള്ള അപര്യാപ്തത മറികടക്കാനായി, ചിട്ടി വിളിച്ചെടുക്കാത്ത ചിറ്റാളർക്ക് ചിട്ടിയിൽ നിന്നുള്ള വായ്പാസൗകര്യം ഏർപ്പെടുത്തിയിട്ടുണ്ട്. ഈ ലോൺ പണത്തിന്റെ ആവശ്യവും ചിട്ടി കിട്ടാനുള്ള കാലതാമസവും തമ്മിലുള്ള വ്യത്യാസത്തെ പരിഹരിയ്ക്കും.",
    },
    {
        id: "q2",
        question:
            "ഞാൻ കേട്ടിട്ടുള്ളത് കെ.എസ്.എഫ്.ഇ. യുടെ ജാമ്യ വ്യവസ്ഥകൾ വഴക്കമില്ലാത്തവയും ബുദ്ധിമുട്ടേറിയതും ആണെന്നാണ്. ശരിയല്ലേ?",
        answer: `തീർച്ചയായും ഇത് ഒരു തെറ്റിദ്ധാരണയാണ്. കെ.എസ്.എഫ്.ഇ. സ്വീകരിയ്ക്കുന്ന ജാമ്യവ്യവസ്ഥകളുടെ വിശാല പരിധിയെക്കുറിച്ചും അവ സ്വീകരിക്കപ്പെട്ടിട്ടുള്ള യഥാർത്ഥ സന്ദർഭങ്ങളെപ്പറ്റിയും ധാരണയില്ലാത്തവർ ആണ് ഇത്തരം തെറ്റിദ്ധാരണകൾ പരത്തുന്നത്. കെ.എസ്.എഫ്.ഇ. നാലു വിഭാഗങ്ങളിൽപ്പെട്ട നിരവധി ജാമ്യങ്ങൾ സ്വീകരിക്കുന്നു.

        (1) സാമ്പത്തിക രേഖകൾ
        (2) വ്യക്തിഗത ജാമ്യം
        (3) വസ്തു ജാമ്യം
         (4) സ്വർണ്ണാഭരണ ജാമ്യം
        ഇതിൽ ഒന്നാമത്തെ വിഭാഗത്തിൽ താഴെപ്പറയുന്ന ജാമ്യങ്ങൾ ഉൾക്കൊള്ളുന്നു.
        
        കെ.എസ്.എഫ്.ഇ. യുടെയോ മറ്റ് സാമ്പത്തിക സ്ഥാപനങ്ങളുടേയോ സ്ഥിര നിക്ഷേപ രശീതികൾ
        നാലു വർഷമോ അതിൽ കൂടുതലോ പഴക്കമുള്ള ദേശീയ സമ്പാദ്യ സർട്ടിഫിക്കറ്റുകൾ (VIII ഇഷ്യു)
        കിസാൻ വികാസ് പത്ര
        എൽ.ഐ.സി സറണ്ടർ വാല്യു
        വിളിച്ചെടുക്കാത്ത കെ.എസ്.എഫ്.ഇ ചിട്ടിയുടെ പാസ്സ്ബുക്കുകൾ
        ബാങ്ക് ഗ്യാരണ്ടി.
        രണ്ടാമത്തെ വിഭാഗത്തിൽ സംസ്ഥാന /കേന്ദ്ര ഗവൺമെന്റ് ജീവനക്കാർ, ഗവൺമെന്റ് കമ്പനികൾ, ബാങ്കുകൾ മറ്റ് പ്രധാന സ്ഥാപനങ്ങൾ തുടങ്ങിയവയിൽ പ്രവർത്തിക്കുന്ന ജീവനക്കാർ എന്നിവർപ്പെടുന്നു.
        
        5 ലക്ഷം രൂപ വരെയുള്ള ഭാവിബാധ്യതയ്ക്ക് സംസ്ഥാന/കേന്ദ്ര ഗവൺമെന്റ് ജീവനക്കാരുടെ സ്വന്തം ജാമ്യം / ഏകവ്യക്തി ജാമ്യം മതിയാകുന്നതാണ്.
        
        10 ലക്ഷം രൂപ വരെയുള്ള ഭാവി ബാധ്യതയ്ക്ക് സംസ്ഥാന/കേന്ദ്ര ഗവൺമെന്റ് ജീവനക്കാരനാണ് വരിക്കാരനെങ്കിൽ മറ്റൊരു സംസ്ഥാന/കേന്ദ്ര ഗവൺമെന്റ് ജീവനക്കാരനെ ജാമ്യമായി തന്നാൽ മതിയാകും.
        
        മേലധികാരിയ്ക്ക് ശമ്പളം പിടിച്ചുതരാൻ വകുപ്പുള്ള ജീവനക്കാരെ സംബന്ധിച്ചിടത്തോളം ഭാവി ബാധ്യതയുടെ 10% എങ്കിലും ശമ്പളം ഉണ്ടായിരിക്കണം. മേലധികാരിയ്ക്ക് ശമ്പളം പിടിച്ചു തരാൻ വകുപ്പില്ലാത്ത ജീവനക്കാർക്ക് ഇത് 12.5% ആണ്.വരിക്കാരന്റേയും ജാമ്യക്കാരന്റേയും മൊത്തം (നെറ്റ്) ശമ്പളം ചിട്ടിയുടെ / വായ്പയുടെ പ്രതിമാസത്തവണയിൽ കൂടുതൽ ഉണ്ടായിരിക്കണം.
        
        മൂന്നാമത്തെ വിഭാഗത്തിൽ, വഴി സൗകര്യമുള്ള വസ്തുവകകൾ ജാമ്യമായി സ്വീകരിക്കുന്നതാണ്.
        
        മേൽ വിഭാഗങ്ങളിൽപ്പെട്ട ജാമ്യ ഉപാധികൾ ഒരുവിധം ആളുകൾക്കൊക്കെ കരഗതമാണ്. മാത്രമല്ല, ഉപഭോക്താക്കളുടെ താല്പര്യത്തിന് അനുയോജ്യമായി കാലാകാലങ്ങളിൽ ജാമ്യവ്യവസ്ഥകൾ  പുതുക്കപ്പെടുന്നതും ആണ്.`,
    },
    {
        id: "q3",
        question:
            "മറ്റ് സ്ഥാപനങ്ങളിലെ സമാന പദ്ധതികളെ അപേക്ഷിച്ച് കെ.എസ്.എഫ്.ഇ. യുടെ ഗൃഹോപകരണ - വാഹന വായ്പാ പദ്ധതി മെച്ചപ്പെട്ടതാണ് എന്ന് പറയാൻ കാരണമെന്ത്?",
        answer: "ഈ പദ്ധതിയുടെ പലിശ 12% താരതമ്യേന കുറവാണ്. മാത്രമല്ല, ജാമ്യവ്യവസ്ഥകൾ ലളിതവും  ടി.വി. തുടങ്ങിയ ഗൃഹോപകരണങ്ങൾ മുതൽ നാലു ചക്രവാഹനങ്ങൾ വരെ ഈ പദ്ധതി വഴി കരസ്ഥമാക്കാവുന്നതാണ്. മറ്റ് സ്ഥാപനങ്ങളെ അപേക്ഷിച്ച്, 60 മാസം വരെ കാലാവധി തിരിച്ചടവിന് കെ.എസ്.എഫ്.ഇ നൽകുന്നുണ്ട്.",
    },
    {
        id: "q4",
        question:
            "കെ.എസ്.എഫ്.ഇ. ഭവന വായ്പയ്ക്ക് മറ്റ് സ്ഥാപനങ്ങൾ മുന്നോട്ടുവെയ്ക്കുന്ന ഭവന വായ്പാ പദ്ധതിയുമായി എന്ത് വ്യത്യാസമാണ് ഉള്ളത്?",
        answer: "മറ്റ് സ്ഥാപനങ്ങൾ മുന്നോട്ടുവയ്ക്കുന്ന ഭവന വായ്പാ പദ്ധതികളെ അപേക്ഷിച്ച് കച്ചവടക്കാർ, വിദേശ ഇന്ത്യക്കാർ, വ്യവസായികൾ, പ്രൊഫഷണലുകൾ, ഉദ്യോഗസ്ഥർ തുടങ്ങി സമൂഹത്തിലെ വിവിധ തുറകളിൽ പ്രവർത്തിക്കുന്ന ആളുകൾക്ക് പ്രാപ്യമായ പദ്ധതിയാണ് കെ.എസ്.എഫ്.ഇ. ഭവന വായ്പാ പദ്ധതി. പലിശ നിരക്ക് താരതമ്യേന കുറവും ജാമ്യ വ്യവസ്ഥകൾ ലളിതവും ആണ്. ഈ പദ്ധതിയുടെ നടപടിക്രമങ്ങൾ എളുപ്പം പൂർത്തീകരിയ്ക്കുന്നതിനായി ഗ്രീൻ ചാനൽ സമ്പ്രദായം ഏർപ്പെടുത്തിയിട്ടുണ്ട്. ഭവനത്തോടുകൂടിയും ഭവന നിർമ്മാണത്തിനു വേണ്ടിയും വസ്തുവകകൾ വാങ്ങുന്നതിനും ഇതേ വായ്പ ഉപയോഗിക്കാവുന്നതാണ്.",
    },
    {
        id: "q5",
        question:
            "കെ.എസ്.എഫ്.ഇ. യുടെ സ്വർണ്ണപ്പണയ വായ്പയുടെ പ്രധാന സവിശേഷതകൾ എന്തൊക്കെയാണ്?",
        answer: "ഉദ്ദേശം എന്തുതന്നെയായാലും അതിന് ഉപയുക്തമാക്കാവുന്ന ഒന്നാണ് കെ.എസ്.എഫ്.ഇ. യുടെ സ്വർണ്ണപ്പണയ വായ്പ. വൈകീട്ട് 4.30 വരെ തുറന്നിരിയ്ക്കുന്ന സ്വർണ്ണപ്പണയവായ്പാ കൗണ്ടറുകൾ കെ.എസ്.എഫ്.ഇ. യുടെ പ്രത്യേകതയാണ്. പെട്ടെന്ന് സ്വർണ്ണപ്പണയ വായ്പ നൽകുന്നതിന് കൗണ്ടറിലെ ഉദ്യോഗസ്ഥൻമാരെ പ്രാപ്തമാക്കിയിട്ടുള്ളതിനാൽ, കുറഞ്ഞ സമയത്തിനുള്ളിൽ വായ്പ ലഭ്യമാക്കുന്നു. പണയം നിന്ന ദിവസങ്ങൾക്ക് മാത്രമേ പലിശ നൽകേണ്ടി വരികയുള്ളൂ എന്നത് മറ്റൊരു സവിശേഷതയാണ്.",
    },
    {
        id: "q6",
        question: "കെ.എസ്.എഫ്.ഇ. വ്യക്തിഗത വായ്പയുടെ സവിശേഷതകൾ എന്തൊക്കെ?",
        answer: "ഈ പദ്ധതിയനുസരിച്ച്, കെ.എസ്.എഫ്.ഇ.യുമായി ഒരു വർഷത്തിൽ കുറയാത്ത ബന്ധമുള്ള, കൃത്യമായി തിരിച്ചടവു നടത്തിയ വ്യക്തികൾക്ക് വ്യക്തിഗത ജാമ്യത്തിൽ 5 ലക്ഷം രൂപ വരെയും വസ്തു /സാമ്പത്തിക രേഖാ ജാമ്യത്തിൽ 25 ലക്ഷം രൂപവരെയും ഈ പദ്ധതി പ്രകാരം വായ്പ ലഭിയ്ക്കുന്നതാണ്. SREG  വിഭാഗത്തിൽപ്പെട്ട ആളുകൾക്കും, ഉത്തമമായ തിരിച്ചടവു ചരിത്രം ഉണ്ടെങ്കിൽ അതിന് അപേക്ഷിക്കാവുന്നതാണ്.",
    },
    {
        id: "q7",
        question:
            "ചിട്ടിപ്പണവും വായ്പാത്തുകയും ലഭിയ്ക്കാൻ കെ.എസ്.എഫ്.ഇ. യിൽ കാലതാമസം ഏറെയുണ്ട് എന്ന് കേൾക്കുന്നത് ശരിയാണോ?",
        answer: "തെറ്റാണത്. ജാമ്യ ഉപാധികൾ കൃത്യമായി സമർപ്പിച്ചാൽ ഇതൊരിക്കലും സംഭവിക്കില്ല. കാലാകാലങ്ങളിൽ ജാമ്യ വ്യവസ്ഥയിൽ കൊണ്ടുവരുന്ന പരിഷ്കരണങ്ങളും ഇളവുകളും ചിട്ടി വരിക്കാർക്ക് / വായ്പാ അപേക്ഷകർക്ക് വളരെപ്പെട്ടെന്ന് പണം ലഭിയ്ക്കുന്നതിന് ഉദ്ദേശിച്ചാണ് നടപ്പാക്കുന്നത്.",
    },
    {
        id: "q8",
        question: "പരാതികൾ പരിഹരിയ്ക്കുന്നതിന് എന്തെങ്കിലും സംവിധാനമുണ്ടോ?",
        answer: "സേവനത്തെ സംബന്ധിച്ച് എന്തെങ്കിലും പരാതിയുണ്ടെങ്കിൽ ശാഖാമാനേജരെ സമീപിക്കാവുന്നതാണ്. ശാഖാമാനേജരുടെ അടുത്ത് പരാതിയ്ക്ക് പരിഹാരമുണ്ടായില്ലെങ്കിൽ, പ്രസ്തുത പരാതി ബന്ധപ്പെട്ട മേഖലാ ഓഫീസിലോ / കോർപ്പറേറ്റ് ഓഫീസിലോ സമർപ്പിക്കാവുന്നതാണ്.",
    },
    {
        id: "q9",
        question:
            "എങ്ങനെയാണ് ശാഖകൾക്ക് മേലുള്ള നിയന്ത്രണം സാധ്യമാക്കിയിട്ടുള്ളത്?",
        answer: `തൃശ്ശൂരാണ് കെ.എസ്.എഫ്.ഇ. യുടെ ആസ്ഥാനം. 16 മേഖലാ ഓഫീസുകൾ കെ.എസ്.എഫ്.ഇ. യ്ക്കുണ്ട്.

        തിരുവനന്തപുരം റൂറൽ
        തിരുവനന്തപുരം അർബൻ
        കൊല്ലം റൂറൽ
        കൊല്ലം അർബൻ
        പത്തനംതിട്ട
        കോട്ടയം
        ആലപ്പുഴ
        കട്ടപ്പന
        എറണാകുളം റൂറൽ
        എറണാകുളം അർബൻ
        തൃശ്ശൂർ
        പാലക്കാട്
        മലപ്പുറം
        കോഴിക്കോട് റൂറൽ
        കോഴിക്കോട് അർബൻ
        കണ്ണൂർ
        അവ ശാഖാ പ്രവർത്തനങ്ങളെ ഏകോപിപ്പിയ്ക്കുകയും നിയന്ത്രിയ്ക്കുകയും ചെയ്യുന്നു.ഓരോ ശാഖയ്ക്ക് കീഴിലുള്ള ശാഖകളെ ഈ വെബ് സൈറ്റിൽ കൊടുത്തിരിയ്ക്കുന്നു.`,
    },
    {
        id: "q10",
        question:
            "ഈയിടെയായി പ്രവാസി മലയാളികൾക്കും ചിട്ടി തുടങ്ങിയതായി വാർത്തയുണ്ടല്ലോ?",
        answer: "അതെ. ഗവൺമെന്റ് ഓഫ് ഇന്ത്യയുടെ 13.04.2015 ൽ പുറത്തിറങ്ങിയ 227-LU നമ്പർ ഗസറ്റ് നോട്ടിഫിക്കേഷൻ പ്രകാരം പ്രവാസി മലയാളികൾക്കും ചിട്ടിയിൽ ചേരാവുന്നതാണ്. കെ.എസ്.എഫ്.ഇ. പ്രവാസി ചിട്ടികൾ എന്ന് പേരിട്ട ഈ പദ്ധതിയുടെ വിശദാംശങ്ങൾ അറിയാൻ www.pravasi.ksfe.com എന്ന വെബ് സൈറ്റ് സന്ദർശിക്കേണ്ടതാണ്. ഇതിന് വേണ്ടി ഒരു പ്രതീതി ശാഖ തിരുവനന്തപുരത്ത് പ്രവർത്തിയ്ക്കുന്നുണ്ട്.",
    },
];

export const productList = [
    {
        id: "chitty",
        title: "Chitty",
        description: "KSFE Chitty",
    },
    {
        id: "loans_and_advances",
        title: "Loans & Advances",
        description:
            "Gold Loan, Janamitram Gold Loan, KSFE Home Loan, KSFE Personal Loan, ...",
    },
    {
        id: "deposit_schemes",
        title: "Deposit Schemes",
        description:
            "Fixed Deposit, Chitty Security Deposit in Trust, Short Term Deposits,...",
    },
    {
        id: "securities_acceptable",
        title: "Securities Acceptable",
        description:
            "Personal Surety, FD of KSFE and Other Bank Deposits, Sugama Security ...",
    },
    {
        id: "fee_based_services",
        title: "Fee Based Services",
        description: "Safe Deposit Locker, Money Transfer Services",
    },
];

export const showProductList = async (phone_no_id, access_token, from) => {
    await axios({
        method: "POST",
        url:
            "https://graph.facebook.com/v13.0/" +
            phone_no_id +
            "/messages?access_token=" +
            access_token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            type: "interactive",
            interactive: {
                type: "list",
                header: {
                    type: "text",
                    text: "സേവനങ്ങൾ",
                },
                body: {
                    text: "ㅤㅤㅤ",
                },
                // footer: {
                //     text: "<FOOTER_TEXT>",
                // },
                action: {
                    button: "വിവിധ സേവനങ്ങൾ",
                    sections: [
                        {
                            rows: productList,
                        },
                    ],
                },
            },
        },

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const showFaqOptions = async (phone_no_id, access_token, from) => {
    await axios({
        method: "POST",
        url:
            "https://graph.facebook.com/v13.0/" +
            phone_no_id +
            "/messages?access_token=" +
            access_token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            type: "interactive",
            interactive: {
                type: "list",
                header: {
                    type: "text",
                    text: "ചോദ്യം തിരഞ്ഞെടുക്കുക",
                },
                body: {
                    text: "ㅤㅤㅤ",
                },
                // footer: {
                //     text: "<FOOTER_TEXT>",
                // },
                action: {
                    button: "ചോദ്യങ്ങൾ",
                    sections: [
                        {
                            rows: faqListMlOptions,
                        },
                    ],
                },
            },
        },

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const sendMenu = async (phone_no_id, access_token, from) => {
    await axios({
        method: "POST",
        url:
            "https://graph.facebook.com/v13.0/" +
            phone_no_id +
            "/messages?access_token=" +
            access_token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: "ㅤㅤㅤ",
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "malayalam",
                                title: "മെനു",
                            },
                        },
                    ],
                },
            },
        },

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const showMenu = async (phone_no_id, access_token, from) => {
    await sendButton(
        phone_no_id,
        access_token,
        from,
        "ഞാൻ നിങ്ങളെ എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?\n\n\n_പ്രധാനപ്പെട്ട ബോട് കമാൻഡുകൾ:_\n_*/menu* മെനു ലഭിക്കുന്നതിന്_\n_*/products* സേവനങ്ങളുടെ വിവരങ്ങൾക്ക്_\n_*/language* ഭാഷ മാറ്റുന്നതിന്_",
        "faq",
        "ചോദ്യങ്ങൾ",
        "branch_locator",
        "ബ്രാഞ്ച് ലൊക്കേറ്റർ",
        "contact",
        "ഞങ്ങളെ ബന്ധപ്പെടുക"
    );

    await sendButton(
        phone_no_id,
        access_token,
        from,
        "ㅤㅤㅤ",
        "request_call",
        "കോൾ അഭ്യർഥിക്കുക",
        "products",
        "സേവനങ്ങൾ",
        "pravasi_chitty",
        "പ്രവാസി ചിട്ടി"
    );

    await axios({
        method: "POST",
        url:
            "https://graph.facebook.com/v13.0/" +
            phone_no_id +
            "/messages?access_token=" +
            access_token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: "ㅤㅤㅤ",
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "about_ksfe",
                                title: "കെഎസ്എഫ്ഇയെ അറിയുക",
                            },
                        },
                        {
                            type: "reply",
                            reply: {
                                id: "change_language",
                                title: "ഭാഷ മാറ്റുക",
                            },
                        },
                    ],
                },
            },
        },

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });

    await sendText(
        phone_no_id,
        access_token,
        from,
        "മെനുവിൽ നിന്ന് ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ എന്നോട് ഒരു ചോദ്യം ചോദിക്കുക."
    );
};
