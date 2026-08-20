export const site = {
  name: "Meridian BPO",
  tagline: "Dedicated offshore teams that run your operations",
  calendly: "https://calendly.com/meridian-bpo/discovery",
  whatsapp: "https://wa.me/10000000000",
  email: "hello@meridianbpo.com",
  phone: "+1 (000) 000-0000",
  address: "Global delivery centres • Americas · EMEA · APAC",
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
};

export const services: Service[] = [
  {
    slug: "virtual-business-assistance",
    title: "Virtual & Business Assistance",
    short: "Executive, admin and back-office support that gives your team its hours back.",
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
  },
  {
    slug: "customer-support",
    title: "Customer Support",
    short: "Multichannel support teams that protect retention and response times.",
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
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    short: "Outbound and inbound teams that fill your calendar with qualified conversations.",
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
  },
  {
    slug: "dedicated-team-support",
    title: "Dedicated Team Support",
    short: "Full offshore pods — agents, team leads and QA — operating as your extension.",
    summary:
      "When one seat is not enough, we stand up a managed pod with its own team lead, QA analyst and reporting cadence, working exclusively on your account.",
    outcomes: [
      "Managed capacity you can scale month to month",
      "One accountable team lead instead of many contractors",
      "Operational continuity through documented SOPs",
    ],
    capabilities: [
      "Pod design and staffing plans",
      "Dedicated team leads and QA analysts",
      "Shift and coverage management",
      "Workforce and capacity planning",
      "SOP creation and version control",
      "Performance dashboards and SLA reporting",
    ],
    process: [
      { step: "Operating model", detail: "We define roles, ratios, SLAs and reporting before recruiting." },
      { step: "Build the pod", detail: "Hire, train and certify each role against your standards." },
      { step: "Transition", detail: "Phased handover of workload with parallel-run safeguards." },
      { step: "Govern", detail: "Monthly business reviews with performance and improvement plans." },
    ],
    idealFor: ["Scaling operations teams", "Companies replacing contractor sprawl", "Multi-shift service businesses"],
  },
  {
    slug: "operational-management",
    title: "Customer & Operational Management",
    short: "Back-office operations run to documented process and measurable SLAs.",
    summary:
      "Order management, claims, onboarding, data operations and process execution handled by teams that are measured on accuracy and turnaround, not seat time.",
    outcomes: [
      "Turnaround times cut by half on routine processes",
      "Error rates tracked and reduced through QA sampling",
      "Documented process ownership that survives staff churn",
    ],
    capabilities: [
      "Order and fulfilment operations",
      "Customer onboarding and KYC support",
      "Claims and case processing",
      "Data entry, cleansing and migration",
      "Quality assurance and audit sampling",
      "Process documentation and improvement",
    ],
    process: [
      { step: "Process audit", detail: "Current-state mapping with volume, exception and effort analysis." },
      { step: "Standardise", detail: "Rewrite the process into SOPs with clear exception handling." },
      { step: "Execute", detail: "Trained operators run the process against agreed SLAs." },
      { step: "Optimise", detail: "Automation and rework-reduction opportunities each quarter." },
    ],
    idealFor: ["Logistics and supply chain", "Financial services", "Healthcare administration"],
  },
  {
    slug: "growth-support",
    title: "Growth Support",
    short: "Marketing, CRM and revenue-operations support behind your growth team.",
    summary:
      "Execution capacity for the work that keeps slipping: campaign setup, CRM operations, content production support, reporting and marketplace management.",
    outcomes: [
      "Campaigns shipped on schedule without new local hires",
      "Reliable weekly revenue and funnel reporting",
      "Clean CRM and marketing automation hygiene",
    ],
    capabilities: [
      "CRM and marketing automation operations",
      "Campaign build and QA",
      "Content production support",
      "Marketplace and listing management",
      "Reporting and dashboard maintenance",
      "Competitive and market research",
    ],
    process: [
      { step: "Backlog review", detail: "We audit the work queue and identify what is safely delegable." },
      { step: "Playbook build", detail: "Repeatable tasks are documented into runbooks." },
      { step: "Delivery cadence", detail: "Sprint-based delivery with weekly review calls." },
      { step: "Expand", detail: "Add specialisms as trust and throughput increase." },
    ],
    idealFor: ["Marketing teams", "E-commerce operators", "Revenue operations leaders"],
  },
];

export type Industry = {
  slug: string;
  name: string;
  short: string;
  challenges: string[];
  solutions: string[];
  metrics: { label: string; value: string }[];
};

export const industries: Industry[] = [
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    short: "Peak-season support, order operations and marketplace management.",
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
    short: "Tier-1 technical support, onboarding and SDR pipeline generation.",
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
    short: "Patient coordination, admin support and claims processing.",
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
    short: "Track-and-trace, carrier coordination and exception handling.",
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
    short: "KYC support, client servicing and back-office processing.",
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
    short: "Lead qualification, listing management and tenant support.",
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
    service: "Customer Support",
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
    service: "Lead Generation",
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
    service: "Operational Management",
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

export const faqs = [
  {
    q: "How quickly can a team be up and running?",
    a: "A single assistant or agent typically goes live in 10-14 days. A managed pod with a team lead and QA analyst takes three to five weeks, depending on training depth and compliance requirements.",
  },
  {
    q: "How is pricing structured?",
    a: "We price per dedicated seat per month, with rates set by role seniority, language requirements and shift coverage. There are no per-ticket or per-minute surprises, and scope changes are agreed in writing before they take effect.",
  },
  {
    q: "Who manages the team day to day?",
    a: "Every engagement has a named team lead accountable for delivery, plus QA sampling and reporting. You set priorities; we handle scheduling, coaching, cover and performance management.",
  },
  {
    q: "How do you protect our data?",
    a: "Work happens on controlled devices with restricted access, signed NDAs, role-based permissions in your systems and documented offboarding. We can align to your security policy and support region-specific requirements.",
  },
  {
    q: "What happens if an agent underperforms or leaves?",
    a: "SOPs and cross-training mean cover is available immediately, and replacements are recruited and trained at our cost. Continuity is our responsibility, not yours.",
  },
  {
    q: "Can you work in our tools and time zone?",
    a: "Yes. We operate inside your helpdesk, CRM and communication stack, and staff shifts to your customers' hours — including overnight and weekend coverage.",
  },
  {
    q: "How do we measure whether it is working?",
    a: "We agree the metrics before launch — response times, quality scores, turnaround, meetings booked — and report against them weekly, with a monthly business review.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Engagements typically start with a three-month initial term so training investment pays back, then continue month to month.",
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

export const stats = [
  { value: "500+", label: "Trained specialists" },
  { value: "24/7", label: "Coverage models" },
  { value: "98%", label: "Client retention" },
  { value: "60%", label: "Average cost saving" },
];
