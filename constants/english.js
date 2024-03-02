import axios from "axios";

export const basePrompt = `
You're KSFE bot, a responsible WhatsApp bot AI to answer customer queries about "Kerala State Financial Enterprises Ltd (KSFE) and the products and services offerred by it."
You should answer users' questions n a polite and effective way. If a user question is very irrelevant to KSFE or its products and services, reply that you can only answer queries about KSFE, in a polite way by saying sorry if necessary.
`;

// Previous conversation: {chat_history} New human question: {question} Response:

export const faqEnglish =
    "*Frequently Asked Questions*\n\n1. What are the main attractions of enrolling in KSFE Chitties over enrollment in other savings instruments?\n\n2. I hear that the security norms of KSFE for various schemes are rigid and cumbersome. Is it true?\n\n3. What are the advantages of the Consumer/Vehicle Loan Scheme of KSFE over similar schemes of the other institutions?\n\n4. What are the advantages of the KSFE Housing Loan over similar schemes of other institutions?\n\n5. What are the main attractions of Gold Loan Scheme of KSFE?\n\n6. What are the main attractions of Chitty Loan Scheme?\n\n7. I hear that the granting of chitty prize money and advance will involve delay in KSFE?\n\n8. Is there a system of redressal of complaints, if I have any?\n\n9. How is the line of control over branches structured?\n\n10. I hear that nowadays KSFE Chitty scheme opens its door to NRI's also?";

export const faqListEnOptions = [
    {
        id: "1",
        title: "Question 1",
        description:
            "What are the main attractions of enrolling in KSFE Chitties over enro...",
    },
    {
        id: "2",
        title: "Question 2",
        description:
            "I hear that the security norms of KSFE for various schemes are rigid ...",
    },
    {
        id: "3",
        title: "Question 3",
        description:
            "What are the advantages of the Consumer/Vehicle Loan Scheme of KSFE o...",
    },
    {
        id: "4",
        title: "Question 4",
        description:
            "What are the advantages of the KSFE Housing Loan over similar schemes...",
    },
    {
        id: "5",
        title: "Question 5",
        description:
            "What are the main attractions of Gold Loan Scheme of KSFE?",
    },
    {
        id: "6",
        title: "Question 6",
        description: "What are the main attractions of Chitty Loan Scheme?",
    },
    {
        id: "7",
        title: "Question 7",
        description:
            "I hear that the granting of chitty prize money and advance will invol...",
    },
    {
        id: "8",
        title: "Question 8",
        description:
            "Is there a system of redressal of complaints, if I have any?",
    },
    {
        id: "9",
        title: "Question 9",
        description: "How is the line of control over branches structured?",
    },
    {
        id: "10",
        title: "Question 10",
        description:
            "I hear that nowadays KSFE Chitty scheme opens its door to NRI's also?",
    },
];

export const faqListEnglish = [
    {
        id: "q1-e",
        question:
            "What are the main attractions of enrolling in KSFE Chitties over enrollment in other savings instruments?",
        answer: "Chitty is a unique scheme incorporating the aspects of a recurring deposit and an advance scheme. In chitty, the subscriber has an opportunity to bid and avail of advance which amounts to a certain percentage of the total denomination of the chitty (sala), whereas in recurring deposit the advance can be availed only on the paid up amount. In case bidding is delayed due to draw of lots in the initial instalments, one can resort to availing of chitty loan, which is a loan that “bridges” the gap between the need of the subscriber for money and the delay in the chitty getting prized",
    },
    {
        id: "q2-e",
        question:
            "I hear that the security norms of KSFE for various schemes are rigid and cumbersome. Is it true?",
        answer: `This is really a biased notion, born out of lack of first hand information regarding the range of securities accepted by KSFE and the actual case with which this can be offered. The KSFE accepts securities belonging, broadly, to four categories:

        (1) Financial Document
        (2) Personal Surety
        (3) Property Security
        (4) Gold Security
        The first category consists of
        
        Fixed deposits of KSFE and other institutions, covered by deposit insurance cover
        NSC VIII issue, which is 4 years or more old from date of deposit
        Kissan Vikas Patra
        The surrender value of LIC policies
        Paid up amount in Non-prized chitties of KSFE
        Bank guarantee
        The second category consists of employees belonging to Government of Kerala and Government of India Departments and Undertakings, Banks and other reputed Organisations and Professionals like Doctors, Chartered Accountants, etc. who have assessed income above a certain limit.
        
        Self surety of an employee belonging to SREG/SRNEG will be accepted upto a liability limit of Rs.5,00,000/-
        
        In case an employee under SREG/SRNEG category can bring another surety, either from SREG or SNREG, this security will be enough for a liability up to Rs.10,00,000/-.
        
        The monthly salary of sureties belonging to Salary Recovery Enforceable Group (SREG) shall be not less than 10 % of the future liability and it should be 12.5% if the sureties are belonging to Salary Recovery Non-Enforceable Group (SRNEG). The total net pay of subscriber/surety together should cover gross monthly installment of chitty/loan.
        
        Under the third category the document related to any, property that is situated in Kerala is admissible, can be accepted as security.
        
        It will not be difficult for any one to offer one of the above categories hereby for a scheme. Moreover reforms are being effected to make the security norms more customer friendly`,
    },
    {
        id: "q3-e",
        question:
            "What are the advantages of the Consumer/Vehicle Loan Scheme of KSFE over similar schemes of the other institutions?",
        answer: "This is a scheme where interest rates are most competitive at 12.00%(simple) and security norms are simple as in other schemes. CVL scheme can be availed to acquire consumer articles ranging from TVs to four wheelers. Unlike similar schemes of competitors the repayment period can be extended upto 60 months.",
    },
    {
        id: "q4-e",
        question:
            "What are the advantages of the KSFE Housing Loan over similar schemes of other institutions?",
        answer: "Housing Loan Scheme of KSFE is designed to cater to the needs of all segments of population such as Traders, NRIs, Business persons, Professionals, Salaried class etc. Rate of interest is competitive and the terms are simple. KSFE provides advance under this category for purchase of plots as well as purchase of dwelling house and for construction of dwelling houses.",
    },
    {
        id: "q5-e",
        question: "What are the main attractions of Gold Loan Scheme of KSFE?",
        answer: "Gold loan scheme of the KSFE is operated through the specialised Gold Loan counters with extended working hours upto 4.30p.m. in branches. The loan applications are disposed within a very short time and since the Gold Loan counters are given immense discretionary powers in relation to the decision making, granting the advance is made in a jiffy. Further, interest is charged for the actual number of days the gold is under pledge.",
    },
    {
        id: "q6-e",
        question: "What are the main attractions of Chitty Loan Scheme ?",
        answer: "Under this scheme advance is extended for any purpose. After remittance of 10% of the instalments a subscriber will be eligible for advance of upto 50% of the sala of the chitty, subject to certain conditions. All securities accepted for chitties are acceptable for chitty loan also. The execution of the loan application is usually very fast, especially if the security belongs to financial documents or personal security category.",
    },
    {
        id: "q7-e",
        question:
            "I hear that the granting of chitty prize money and advance will involve delay in KSFE ?",
        answer: "This is absolutely wrong. There may be rare instances of delay due to the failure in submitting sufficient security in time. Recent reforms brought about for the quick acceptance of securities and bringing in speed and flexibility will further expedite the processing of loan/chitty prize money payment applications and extending of advance/prize money payment in submitting sufficient security in time.",
    },
    {
        id: "q8-e",
        question:
            "Is there a system of redressal of complaints, if I have any ?",
        answer: "Complaints, regarding the deficiency in service at any of the KSFE branch, can be immediately taken up with the Branch Manager. If redressal of complaints is not effected at that level, the complaint can be escalated to the respective Regional Offices/Corporate Office.",
    },
    {
        id: "q9-e",
        question: "How is the line of control over branches structured ?",
        answer: `The Corporate Office of KSFE is at Thrissur. KSFE has 16 Regional Offices viz.,

        Alappuzha
        Ernakulam Rural
        Ernakulam Urban
        Kannur
        Kattappana
        Kollam Rural
        Kollam Urban
        Kottayam
        Kozhikode Rural
        Kozhikode Urban
        Malappuram
        Palakkad
        Pathanamthitta
        Thiruvananthapuram Rural
        Thiruvananthapuram Urban
        Thrissur,
        for coordinating and controlling the branches. A list of branches under each Regional Office is given in this Website elsewhere.`,
    },
    {
        id: "q10-e",
        question:
            "I hear that now a days KSFE Chitty scheme opens its door to NRI's also ?",
        answer: "Yes. Now NRI's can also join chitties offered by KSFE as per notification no. 227 dated 13/4/2015 in the gazette of government of India. For this, they may go through the various denominations of chitties offered by our various Branches and select the type for their requirement. Then they may download the chitty application form, which can be obtained from our website. Take the printout in duplicate and fill up the personal details called for in the last page of the application form. After putting signature on both forms, they may send them to the concerned branches. The address and phone number of branches are provided in our website. The amount for first installment may be transferred by the mode internet banking, money transfer service of WUMT/Xpress Money, for which KSFE has an agreement. The installment can also be remitted through online or directly in the branch in cash/cheque on behalf of the subscriber.",
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
                    text: "Our Products & Services",
                },
                body: {
                    text: "ㅤㅤㅤ",
                },
                // footer: {
                //     text: "<FOOTER_TEXT>",
                // },
                action: {
                    button: "Categories",
                    sections: [
                        {
                            title: "Products & Services",
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

export const showChangeLanguageMenu = async (
    phone_no_id,
    access_token,
    from
) => {
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
                    text: "Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "english",
                                title: "English",
                            },
                        },
                        {
                            type: "reply",
                            reply: {
                                id: "malayalam",
                                title: "മലയാളം",
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
                    text: "Select your question",
                },
                body: {
                    text: "ㅤㅤㅤ",
                },
                // footer: {
                //     text: "<FOOTER_TEXT>",
                // },
                action: {
                    button: "Choose question",
                    sections: [
                        {
                            rows: faqListEnOptions,
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
                                id: "english",
                                title: "Main Menu",
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

export const sendText = async (phone_no_id, access_token, from, message) => {
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
            type: "text",
            text: {
                body: message,
            },
        },

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
};
