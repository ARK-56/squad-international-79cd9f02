export const site = {
  name: "Squad International",
  tagline: "Your Business Companion",
  calendly: "https://calendly.com/squadinternational/30min",
  // wa.me needs the country code with no "+" and no leading zero: +92 313 297 2974.
  whatsapp: "https://wa.me/923132972974",
  email: "inquire@squadinternational.net",
  // One number for both, per the site copy deck: "Phone / WhatsApp".
  phone: "+92 313 2972974",
  phoneHref: "tel:+923132972974",
  // Google Business Profile: "Squad International", BPO company, PECHS Karachi.
  // cid form is stable and needs no API key.
  googleReviewsUrl: "https://www.google.com/maps?cid=18065864380427141787",
  googleRating: 4.9,
  googleReviewCount: 33,
  address: "428 Southwest 80th Avenue, North Lauderdale, Florida 33068, US",
  website: "www.squadinternational.net",
  boilerplate:
    "Squad International provides reliable outsourcing and business support solutions designed to help businesses reduce costs, increase capacity and keep day-to-day operations moving.",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/squadinternational" },
    { name: "Instagram", url: "https://www.instagram.com/thesquadinternational" },
    { name: "Facebook", url: "https://www.facebook.com/Squadinternational.net" },
    { name: "YouTube", url: "https://www.youtube.com/@thesquadinternational" },
    { name: "TikTok", url: "https://www.tiktok.com/@squadiansinternational" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  outcomes: string[];
  capabilities: string[];
  process: { step: string; detail: string }[];
  idealFor: string[];
  tools: string[];
  /** Longer positioning line used on the services page card. */
  pitch: string;
  /** Capability chips shown under the pitch. */
  highlights: string[];
  supportModel: string;
  scaling: string;
};

export const services: Service[] = [
  {
    slug: "customer-support",
    title: "Customer Support Outsourcing",
    short: "Inbound calls, live chat + email, and ticket management.",
    summary:
      "Trained support agents handling voice, email, chat and ticketing on your brand and your tooling — with the QA, coverage planning and escalation paths of an in-house function.",
    outcomes: [
      "First response times under 15 minutes on live channels",
      "CSAT held above 90% through structured QA",
      "24/7 or follow-the-sun coverage without hiring locally",
    ],
    capabilities: [
      "Inbound voice and callback handling",
      "Email, chat and social response",
      "Ticket triage and escalation management",
      "Order, billing and account support",
      "Technical tier-1 support",
      "Knowledge base and macro development",
    ],
    process: [
      { step: "Coverage modelling", detail: "Volumes, peak hours and channels define headcount and shifts." },
      { step: "Product training", detail: "Agents complete structured product and tone-of-voice training." },
      { step: "Pilot with QA", detail: "A supervised ramp period with daily scorecards and calibration." },
      { step: "Steady state", detail: "SLA reporting, QA sampling and continuous coaching." },
    ],
    idealFor: ["E-commerce and D2C", "SaaS platforms", "Healthcare and insurance services"],
    tools: [
      "Zendesk, Freshdesk and Intercom",
      "Gorgias and Shopify",
      "Salesforce Service Cloud",
      "Talkdesk, Aircall and RingCentral",
      "Front and Help Scout",
      "Your knowledge base and macro library",
    ],
    pitch:
      "Expand your customer support capacity with dedicated resources that work around your processes — helping you serve customers consistently without carrying the cost of building every support role internally.",
    highlights: ["Inbound Calls", "Live Chat + Email", "Ticket Management"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation & Appointment Setting",
    short: "Cold calling, lead qualification, and appointment setting.",
    summary:
      "Research, list building, multichannel outreach and appointment setting run by SDR pods that report on pipeline, not activity vanity metrics.",
    outcomes: [
      "Predictable monthly qualified meeting volume",
      "Clean, enriched prospect data in your CRM",
      "Lower cost per booked meeting than local SDR hiring",
    ],
    capabilities: [
      "ICP definition and list building",
      "Data enrichment and verification",
      "Cold email and LinkedIn sequencing",
      "Outbound calling and appointment setting",
      "Inbound lead qualification and routing",
      "Pipeline reporting and attribution",
    ],
    process: [
      { step: "ICP & offer workshop", detail: "We align on segments, messaging angles and qualification criteria." },
      { step: "Data & infrastructure", detail: "Lists, domains, sequencing tools and CRM routing are set up." },
      { step: "Launch & iterate", detail: "Weekly message testing against reply and meeting-rate targets." },
      { step: "Scale", detail: "Add channels or seats once cost per meeting is proven." },
    ],
    idealFor: ["B2B services", "Software and technology", "Logistics and manufacturing"],
    tools: [
      "Apollo, ZoomInfo and Cognism",
      "Instantly, Smartlead and Lemlist",
      "LinkedIn Sales Navigator",
      "HubSpot, Salesforce and Close",
      "Clay and Dropcontact enrichment",
      "Aircall and power dialers",
    ],
    pitch:
      "Keep your sales pipeline moving with dedicated prospecting support — without increasing the internal overhead required to manage every stage of outreach and qualification.",
    highlights: ["Cold Calling", "Lead Qualification", "Appointment Setting"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
  {
    slug: "virtual-business-assistance",
    title: "Virtual Assistant & Desk Support",
    short: "Data entry & admin support, research, and CRM & order processing.",
    summary:
      "Dedicated assistants who absorb the administrative load slowing your business down — calendar and inbox management, CRM hygiene, reporting, research, documentation and day-to-day coordination.",
    outcomes: [
      "Reclaim 15-25 hours per week for senior staff",
      "Lower cost per administrative hour by up to 60%",
      "Consistent documentation and CRM data quality",
    ],
    capabilities: [
      "Executive and calendar management",
      "Inbox triage and response handling",
      "CRM and pipeline data maintenance",
      "Invoicing, reconciliation and order admin",
      "Research, reporting and presentation prep",
      "Vendor and supplier coordination",
    ],
    process: [
      { step: "Scope & role design", detail: "We map the tasks, tools and volumes before proposing a team shape." },
      { step: "Recruit & vet", detail: "Shortlisted candidates are screened for domain, language and tooling fit." },
      { step: "Onboard & document", detail: "Your workflows are turned into SOPs owned by our team lead." },
      { step: "Run & improve", detail: "Weekly reporting, QA sampling and quarterly scope reviews." },
    ],
    idealFor: ["Founder-led businesses", "Professional services firms", "Agencies and consultancies"],
    tools: [
      "Google Workspace and Microsoft 365",
      "HubSpot, Salesforce and Pipedrive",
      "Slack, Teams and Notion",
      "Xero, QuickBooks and Bill.com",
      "Asana, ClickUp and Monday.com",
      "DocuSign and PandaDoc",
    ],
    pitch:
      "Move recurring administrative and desk work to dedicated support so your internal team can spend more time on the work that drives the business forward.",
    highlights: ["Data Entry & Admin Support", "Research", "CRM & Order Processing"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
  {
    slug: "medical-billing-healthcare",
    title: "Medical Billing & Healthcare",
    short: "Eligibility verification, medical billing & claims support, and AR follow-up.",
    summary:
      "Billing and administrative support for practices and healthcare services — eligibility checks, charge entry, claim submission, denial handling and accounts-receivable follow-up, run to documented process with audit sampling.",
    outcomes: [
      "Clean-claim rates tracked and reported weekly",
      "Shorter AR cycles through structured follow-up",
      "Clinical staff returned to clinical work",
    ],
    capabilities: [
      "Insurance eligibility and benefits verification",
      "Charge entry and claim preparation",
      "Claim submission and clearinghouse handling",
      "Denial management and appeals",
      "Accounts-receivable follow-up and reporting",
      "Patient billing enquiries",
    ],
    process: [
      { step: "Scope & controls", detail: "Payer mix, volumes and the access controls and agreements needed before go-live." },
      { step: "Train & certify", detail: "Billers are trained on your specialty, payers and practice management system." },
      { step: "Pilot with audit", detail: "A supervised ramp with claim-level review before full volume." },
      { step: "Steady state", detail: "Weekly AR and denial reporting with monthly performance review." },
    ],
    idealFor: ["Medical practices and clinics", "Billing companies", "Allied health and diagnostics"],
    tools: [
      "Athenahealth, DrChrono and Kareo",
      "AdvancedMD and eClinicalWorks",
      "Epic and Cerner portals",
      "Availity and payer portals",
      "Clearinghouses such as Office Ally",
      "Your practice management system",
    ],
    pitch:
      "Support routine healthcare billing and administrative processes with dedicated outsourced resources — adding back-office capacity without having to build every function internally.",
    highlights: ["Eligibility Verification", "Medical Billing & Claims Support", "AR Follow-Up"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
  {
    slug: "ecommerce-customer-support",
    title: "E-commerce Customer Support",
    short: "Shopify & Amazon support, orders + returns, and customer service.",
    summary:
      "Support teams for online retail — pre-sale questions, order and delivery enquiries, returns and refunds — working inside your storefront and helpdesk across the hours your customers actually shop.",
    outcomes: [
      "Faster first response on order and delivery enquiries",
      "Returns and refunds handled to policy, consistently",
      "Peak-season capacity without hiring locally",
    ],
    capabilities: [
      "Pre-sale and product enquiries",
      "Order status and delivery chasing",
      "Returns, refunds and exchanges",
      "Marketplace buyer messaging",
      "Listing and catalogue support",
      "Chargeback and dispute documentation",
    ],
    process: [
      { step: "Coverage modelling", detail: "Order volumes, peak periods and channels define headcount and shifts." },
      { step: "Product & policy training", detail: "Agents learn your catalogue, returns policy and tone of voice." },
      { step: "Pilot with QA", detail: "A supervised ramp with daily scorecards through a first peak." },
      { step: "Steady state", detail: "SLA reporting, macro upkeep and continuous coaching." },
    ],
    idealFor: ["Shopify and WooCommerce brands", "Amazon and marketplace sellers", "D2C and subscription retail"],
    tools: [
      "Shopify and Shopify Inbox",
      "Amazon Seller Central",
      "Gorgias and Zendesk",
      "Re:amaze and Help Scout",
      "ShipStation and AfterShip",
      "Klaviyo and your CRM",
    ],
    pitch:
      "Give your customers dependable support across their buying journey while adding the capacity to manage orders, returns and customer service without continuously increasing internal headcount.",
    highlights: ["Shopify & Amazon Support", "Orders + Returns", "Customer Service"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    short: "QuickBooks, Xero & AP/AR, reconciliation, and monthly reporting.",
    summary:
      "Day-to-day bookkeeping and finance operations — transaction coding, accounts payable and receivable, reconciliations and month-end reporting — delivered on your ledger against an agreed close calendar.",
    outcomes: [
      "A month-end close that lands on the same date every month",
      "Reconciled ledgers with documented review",
      "Finance leadership out of transaction processing",
    ],
    capabilities: [
      "Transaction coding and ledger upkeep",
      "Accounts payable and supplier payment runs",
      "Accounts receivable and collections support",
      "Bank, card and merchant reconciliations",
      "Month-end close and management reporting",
      "Payroll and expense administration support",
    ],
    process: [
      { step: "Books review", detail: "We review the current ledger, chart of accounts and close calendar." },
      { step: "Document the workflow", detail: "Coding rules, approval paths and reporting pack are written down." },
      { step: "Parallel close", detail: "The first close runs alongside your existing process as a check." },
      { step: "Steady state", detail: "Owned close calendar with monthly review of exceptions." },
    ],
    idealFor: ["Owner-managed businesses", "Accounting and bookkeeping firms", "Multi-entity service businesses"],
    tools: [
      "QuickBooks Online and Desktop",
      "Xero and Sage",
      "Bill.com and Dext",
      "Stripe, PayPal and merchant portals",
      "Excel, Sheets and Power BI",
      "Your payroll platform",
    ],
    pitch:
      "Keep recurring financial administration organized and moving with dedicated bookkeeping support built around your business processes and reporting requirements.",
    highlights: ["QuickBooks", "Xero & AP/AR", "Reconciliation", "Monthly Reporting"],
    supportModel: "Dedicated & Reliable",
    scaling: "Flexible to Your Needs",
  },
];

export type Industry = {
  slug: string;
  name: string;
  short: string;
  /** Deck's per-industry headline, shown above the body copy. */
  headline: string;
  /** The deck's "Key Focus" triple. */
  keyFocus: string[];
  challenges: string[];
  solutions: string[];
  metrics: { label: string; value: string }[];
};

export const industries: Industry[] = [
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    short:
      "Customer expectations stay high whether you're handling everyday orders or seasonal peaks. We help e-commerce and retail businesses manage recurring customer and operational workloads without continuously expanding internal headcount.",
    headline: "Support That Scales With Customer Demand",
    keyFocus: ["Customer Experience", "Order Workflows", "Flexible Capacity"],
    challenges: [
      "Volume spikes around promotions and holidays",
      "Order, refund and WISMO enquiries dominating support",
      "Listings and catalogue work falling behind",
    ],
    solutions: [
      "Flexible seasonal support pods that scale up and down",
      "Order, returns and dispute handling on your helpdesk",
      "Catalogue, listing and marketplace operations",
    ],
    metrics: [
      { label: "Peak capacity added", value: "3x" },
      { label: "Avg. first response", value: "< 12 min" },
      { label: "Cost per contact", value: "-45%" },
    ],
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    short:
      "As technology businesses grow, so do customer conversations, administrative workloads and sales activity. Dedicated outsourced support gives your internal team more capacity to focus on product, customers and growth.",
    headline: "Support Your Growth Without Adding Unnecessary Overhead",
    keyFocus: ["Customer Experience", "Pipeline Support", "Scalable Capacity"],
    challenges: [
      "Engineers pulled into tier-1 support tickets",
      "Onboarding backlog slowing time-to-value",
      "Inconsistent outbound pipeline coverage",
    ],
    solutions: [
      "Trained tier-1 support with clear escalation paths",
      "Customer onboarding and implementation support",
      "SDR pods for outbound and inbound qualification",
    ],
    metrics: [
      { label: "Tickets deflected from eng.", value: "78%" },
      { label: "Onboarding time", value: "-40%" },
      { label: "Meetings / month", value: "35+" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Wellness",
    short:
      "Billing, claims and administrative workloads can consume valuable internal time. We help healthcare and wellness businesses add dependable back-office capacity while maintaining consistent processes and accountability.",
    headline: "Reliable Support for Process-Driven Healthcare Operations",
    keyFocus: ["Billing Support", "Administrative Workflows", "Consistent Execution"],
    challenges: [
      "Administrative burden on clinical staff",
      "Appointment no-shows and scheduling churn",
      "Documentation and claims backlogs",
    ],
    solutions: [
      "Patient scheduling, reminders and follow-up",
      "Records, intake and documentation support",
      "Claims and billing operations with audit sampling",
    ],
    metrics: [
      { label: "Admin hours returned", value: "22/wk" },
      { label: "No-show rate", value: "-31%" },
      { label: "Claims accuracy", value: "99.2%" },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    short:
      "Logistics businesses depend on consistent communication, accurate processing and reliable day-to-day support. We help manage recurring operational and administrative workloads so internal teams can stay focused on moving the business forward.",
    headline: "Keep Everyday Operations Moving",
    keyFocus: ["Customer Communication", "Order Processing", "Back-Office Support"],
    challenges: [
      "24/7 shipment exception handling",
      "Manual carrier and vendor coordination",
      "High-volume documentation processing",
    ],
    solutions: [
      "Follow-the-sun track-and-trace desks",
      "Carrier, driver and vendor coordination",
      "Documentation, POD and invoice processing",
    ],
    metrics: [
      { label: "Coverage", value: "24/7" },
      { label: "Exception resolution", value: "-38% time" },
      { label: "Docs processed / day", value: "1,400" },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial & Professional Services",
    short:
      "Financial and professional service businesses depend on accurate, consistent administrative and financial processes. Dedicated outsourced support helps keep recurring work moving without requiring every function to be built internally.",
    headline: "More Back-Office Capacity. Less Internal Overhead.",
    keyFocus: ["Financial Administration", "Client Support", "Operational Efficiency"],
    challenges: [
      "Regulated processes requiring consistent execution",
      "Client servicing volumes outpacing headcount",
      "Costly local hiring for repeatable work",
    ],
    solutions: [
      "KYC and onboarding documentation support",
      "Client servicing and enquiry management",
      "Reconciliation and reporting operations",
    ],
    metrics: [
      { label: "Process accuracy", value: "99.5%" },
      { label: "Turnaround", value: "-52%" },
      { label: "Operating cost", value: "-55%" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property",
    short:
      "Lead follow-ups, appointments, CRM updates and administrative work can quickly take time away from clients and deals. We help real estate and property businesses manage recurring support work with dedicated resources built around their workflow.",
    headline: "Keep Opportunities Moving While Your Team Stays Focused",
    keyFocus: ["Lead Follow-Up", "Appointment Support", "CRM & Administration"],
    challenges: [
      "Inbound leads going cold outside office hours",
      "Listing and CRM data drifting out of date",
      "Tenant and maintenance requests unmanaged",
    ],
    solutions: [
      "Speed-to-lead qualification and appointment setting",
      "Listing, portal and CRM management",
      "Tenant support and maintenance coordination",
    ],
    metrics: [
      { label: "Speed to lead", value: "< 5 min" },
      { label: "Appointments / month", value: "60+" },
      { label: "Listing accuracy", value: "100%" },
    ],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  quote: { text: string; author: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "d2c-peak-season-support",
    client: "D2C home goods brand",
    industry: "E-commerce & Retail",
    service: "Customer Support Outsourcing",
    challenge:
      "Holiday volumes tripled and a three-person in-house team was answering tickets 40 hours late, dragging CSAT to 71%.",
    approach: [
      "Modelled peak volumes and staffed a 12-agent seasonal pod",
      "Rebuilt macros and the help centre to deflect WISMO contacts",
      "Introduced daily QA scorecards and a weekly calibration call",
    ],
    results: [
      { label: "First response", value: "11 min" },
      { label: "CSAT", value: "93%" },
      { label: "Cost per contact", value: "-45%" },
    ],
    quote: {
      text: "They absorbed our worst quarter without us hiring a single person locally.",
      author: "Head of Customer Experience",
    },
  },
  {
    slug: "saas-outbound-pipeline",
    client: "B2B workflow software company",
    industry: "SaaS & Technology",
    service: "Lead Generation & Appointment Setting",
    challenge:
      "Two local SDRs cost more than the pipeline they produced, and outreach stalled whenever one of them left.",
    approach: [
      "Rebuilt the ICP and rewrote sequences around three pain-led angles",
      "Stood up a four-person SDR pod with a dedicated researcher",
      "Weekly message testing tied to reply and meeting-rate targets",
    ],
    results: [
      { label: "Meetings / month", value: "38" },
      { label: "Cost per meeting", value: "-61%" },
      { label: "Pipeline in 6 months", value: "$2.4M" },
    ],
    quote: {
      text: "The pod produces more qualified meetings than our previous in-house team at a third of the cost.",
      author: "VP Revenue",
    },
  },
  {
    slug: "logistics-24-7-desk",
    client: "Freight forwarding group",
    industry: "Logistics & Supply Chain",
    service: "Customer Support Outsourcing",
    challenge:
      "Shipment exceptions raised overnight sat untouched until morning, creating detention charges and customer churn.",
    approach: [
      "Deployed a follow-the-sun track-and-trace desk across three shifts",
      "Documented exception playbooks with escalation thresholds",
      "Built a daily exception dashboard for operations leadership",
    ],
    results: [
      { label: "Coverage", value: "24/7" },
      { label: "Resolution time", value: "-38%" },
      { label: "Detention charges", value: "-$180k/yr" },
    ],
    quote: {
      text: "Nothing waits for morning anymore. That single change paid for the whole engagement.",
      author: "Director of Operations",
    },
  },
];

/**
 * Answers are paragraph arrays: the site copy deck writes several of these as two
 * or three short paragraphs, and joining them into one block loses the breaks.
 */
export const faqs: { q: string; a: string[] }[] = [
  {
    q: "How quickly can a team be up and running?",
    a: [
      "The timeline depends on the service, team size, training requirements and complexity of your workflow.",
      "We start by understanding your requirements, designing the right support structure and preparing the team around your processes and tools. A clear onboarding timeline is agreed before deployment begins.",
    ],
  },
  {
    q: "How is pricing structured?",
    a: [
      "Pricing is built around your specific requirements rather than a fixed package.",
      "Factors such as the type of work, number of resources, responsibilities, working hours and overall scope can affect pricing.",
      "For pricing, book a free consultation or WhatsApp us to discuss your requirements.",
    ],
  },
  {
    q: "Who manages the team day to day?",
    a: [
      "Squad International works as an extension of your business.",
      "We structure dedicated resources around agreed responsibilities and workflows, while maintaining communication, consistency and accountability throughout the engagement.",
      "Your priorities and standards remain clear; we help keep the day-to-day work moving.",
    ],
  },
  {
    q: "How do you protect our data?",
    a: [
      "Data access and security requirements are discussed during the setup process based on the systems, tools and type of work involved.",
      "We work with clients to understand their access requirements and establish an appropriate working structure before delivery begins.",
    ],
  },
  {
    q: "What happens if a team member is not performing as expected?",
    a: [
      "Reliable delivery and accountability are important parts of how we work.",
      "If there is a performance or resource issue, our team works with you to address it and make the necessary adjustments so the agreed responsibilities continue to be handled effectively.",
    ],
  },
  {
    q: "Can you work with our existing tools and working hours?",
    a: [
      "Our support is designed around the way your business already works.",
      "During the discovery and design stages, we review your workflows, systems, responsibilities and required working hours so the team can be structured around your operational needs.",
    ],
  },
  {
    q: "How do we know whether outsourcing is working?",
    a: [
      "Before delivery begins, we make sure responsibilities, expectations and business priorities are clearly understood.",
      "Performance can then be reviewed against the outcomes that matter to your business — whether that means customer support quality, completed work, response times, appointments, operational capacity or another agreed priority.",
    ],
  },
  {
    q: "Is there a minimum commitment?",
    a: [
      "Engagement requirements can vary depending on the service, team structure and scope of work.",
      "Any commitment, commercial terms and engagement requirements are discussed clearly before you begin. Contact us to discuss the right setup for your business.",
    ],
  },
  {
    q: "Where are your teams based, and what hours can they cover?",
    a: [
      "Squad International supports businesses across different markets and works with clients based on their operational requirements.",
      "Working hours and coverage are determined during the setup process based on your customers, workload and the type of support required.",
    ],
  },
  {
    q: "What languages do your teams support?",
    a: [
      "Language requirements depend on the service, role and team being built.",
      "If your business requires support in a specific language, let us know during the discovery call so we can assess the requirement as part of your proposed solution.",
    ],
  },
  {
    q: "Can the team be built around our specific requirements?",
    a: [
      "Yes. That is a core part of our approach.",
      "We tailor teams, workflows and responsibilities around your business rather than forcing you into a fixed outsourcing model. The goal is to give you the support you actually need.",
    ],
  },
  {
    q: "Do teams work from an office or remotely?",
    a: [
      "The delivery setup can depend on the role, workflow and requirements of the engagement.",
      "We discuss the appropriate working model during the discovery and design process so the structure fits the work being handled.",
    ],
  },
  {
    q: "What does onboarding require from our team?",
    a: [
      "We need enough information to understand how the work should be done.",
      "That typically means helping us understand your existing workflow, responsibilities, tools, standards and expectations during the discovery and setup stages.",
      "From there, we structure the solution and prepare the team around your requirements.",
    ],
  },
  {
    q: "What if our support requirements change later?",
    a: [
      "Your outsourcing setup should be able to change with your business.",
      "You can start with the support you need today and adjust your team as your workload, customer base and business requirements evolve.",
      "Specific commercial or contractual changes are agreed according to the engagement.",
    ],
  },
  {
    q: "When is outsourcing not the right solution?",
    a: [
      "Outsourcing works best when there is a clear business function, responsibility or process that can be handed over effectively.",
      "If a process is constantly changing, cannot yet be clearly defined or depends heavily on information that cannot be transferred to another team, it may be better to structure the process first.",
      "Our goal is to build support that works — not simply add resources where they will not create value.",
    ],
  },
];

export const posts = [
  {
    slug: "when-to-outsource-customer-support",
    title: "When outsourcing customer support actually makes sense",
    excerpt:
      "Volume, coverage gaps and cost per contact are the three signals worth acting on — and the ones that mean you should wait.",
    date: "2026-07-28",
    readingTime: "6 min read",
    category: "Customer Support",
    body: [
      "Most teams consider outsourcing at the wrong moment: either far too early, when the process is still changing weekly, or far too late, when service has already degraded and churn is visible in the numbers.",
      "The healthiest trigger is repeatability. If the same twenty contact reasons account for most of your volume, and each has a defensible answer, the work is documentable — and documentable work is delegable work.",
      "The second trigger is coverage. A local team cannot economically cover nights and weekends at low volumes. An offshore pod can, and the cost of leaving overnight contacts unanswered is usually larger than the cost of covering them.",
      "The third is cost per contact. Once you can measure it, you can compare it. If your fully loaded cost per contact is climbing while quality is flat, capacity is the constraint, not effort.",
      "Wait if your product is changing weekly, if nobody internally owns quality, or if you cannot name the metrics you want moved. Outsourcing amplifies whatever process you hand over — including a bad one.",
    ],
  },
  {
    slug: "building-sops-that-survive-turnover",
    title: "Building SOPs that survive turnover",
    excerpt:
      "Process documentation fails when it is written once and never owned. Here is the structure we use on every engagement.",
    date: "2026-07-10",
    readingTime: "5 min read",
    category: "Operations",
    body: [
      "An SOP is not a document, it is a maintained asset. The difference shows up six months later, when the person who wrote it has moved on and nobody has touched it since.",
      "Every procedure we write has four fixed sections: trigger, steps, exceptions and escalation. The exceptions section is where most documentation fails — it is the part that turns a checklist into judgement your team can apply.",
      "Ownership matters more than format. Each SOP names a single owner and a review date. Anything past its review date shows up on the team lead's dashboard until it is either updated or retired.",
      "Finally, tie SOPs to QA. If the quality scorecard scores behaviour that the SOP does not describe, one of the two is wrong. Keeping them in sync is what makes quality coaching feel fair instead of arbitrary.",
    ],
  },
  {
    slug: "cost-of-a-slow-first-response",
    title: "The real cost of a slow first response",
    excerpt:
      "Response time is the single support metric most closely tied to revenue. The maths is less forgiving than most teams expect.",
    date: "2026-06-22",
    readingTime: "4 min read",
    category: "Growth",
    body: [
      "Speed-to-lead studies consistently show a steep decay curve: contact a prospect within five minutes and the conversation is dramatically more likely to happen than at thirty.",
      "The same shape applies to support. A customer waiting on a refund question is deciding whether to buy again, and that decision hardens well before your reply arrives.",
      "The practical fix is rarely working faster. It is coverage — making sure someone is actually available during the hours enquiries arrive — and triage, so simple questions never queue behind complex ones.",
      "Measure the median, not the average, and segment by channel. Averages hide the overnight gap that is doing most of the damage.",
    ],
  },
  {
    slug: "offshore-team-quality-control",
    title: "How to run quality control on an offshore team",
    excerpt: "Sampling, calibration and coaching cadence — the three mechanics that keep quality from drifting.",
    date: "2026-06-04",
    readingTime: "7 min read",
    category: "Operations",
    body: [
      "Quality does not degrade suddenly; it drifts. Without sampling, drift is invisible until a customer escalates.",
      "Sample deliberately: a fixed number of interactions per agent per week, scored against a rubric that reflects the SOP. Random sampling beats cherry-picked reviews every time.",
      "Calibrate the scorers. Once a week, several reviewers score the same interaction independently and discuss variance. Without calibration, scores measure the reviewer, not the agent.",
      "Then coach on patterns rather than incidents. One low score is noise; three in the same rubric category is a training gap worth a session.",
    ],
  },
];

/** The about page uses Global Clients where the homepage uses Coverage Models. */
export const aboutStats = [
  { value: "500+", label: "Trained specialists" },
  { value: "300+", label: "Global clients" },
  { value: "98%", label: "Client retention" },
  { value: "60%", label: "Average cost savings" },
];

export const stats = [
  { value: "500+", label: "Trained specialists" },
  { value: "24/7", label: "Coverage models" },
  { value: "98%", label: "Client retention" },
  { value: "60%", label: "Average cost savings" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  sourceUrl?: string | null;
};

/**
 * Real reviews transcribed from the Google Business Profile (see site.googleReviewsUrl),
 * all five stars. Client reviews only — the listing's remaining five-star review is from a
 * former employee, which belongs on the careers page rather than in a client carousel.
 *
 * Once GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set, src/lib/google-reviews.ts serves
 * live reviews instead and these become the offline fallback.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "My company started to work with squad international more than a year ago. We are very happy with their services, transparency and result driven approach. Professional team with personal/tailored approach. Really recommend!",
    author: "Vania Tariq",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
  {
    quote:
      "Squad International is one of the best companies I have ever worked with, they provide the best services. I approached them on behalf of my company at the start of this year. And I have been in business with them since. I would highly recommend working with them.",
    author: "Ahmed Abdullah",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
  {
    quote:
      "They are the best in handling the marketing. I am totally satisfied with their service. They have the professionals who are the best in their field. Definitely gonna recommend you.",
    author: "Hishmat Malhani",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
  {
    quote:
      "They showed professionalism and handled the tasks as per the given instructions. The instructions were followed to a T. Definitely recommended if you need good service.",
    author: "Muhammad Ali Rahmani",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
  {
    quote:
      "Very attractive organization. Would recommend anyone to pursue them for their services. Always does their work on time with great professionalism.",
    author: "Mahad Pervaiz",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
  {
    quote:
      "Had a great experience working with this business line. Would give them a 10/10 for their services. Always does their work on time. Will look forward working with them again.",
    author: "Tabish Zaman",
    role: "Google review",
    rating: 5,
    sourceUrl: site.googleReviewsUrl,
  },
];
