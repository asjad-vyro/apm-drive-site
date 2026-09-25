/** All user-facing words for the page, in one place. Facts with sources live in facts.ts. */
export const HERO = {
  prompt: "an associate product manager at ImagineArt, first year",
  h1a: "Own a product used by millions.",
  h1b: "In your first year.",
  sub: "ImagineArt is hiring a batch of Associate Product Managers in Islamabad. Fresh graduates and people up to a year out, from FAST, LUMS and NUST. You will own a surface, ship it to real users, and be judged on what happens next.",
  primary: "Apply for the drive",
  secondary: "How the drive works",
  imageAlt: "A frame generated with ImagineArt",
  madeWith: "Made with ImagineArt",
};

export const SHIP = {
  eyebrow: "What you'll ship",
  title: "Eight products, one workspace. Pick the one you want to own.",
  body: "Every tile below is a live product with real users on the other side, and every frame on it was made with ImagineArt. An APM here is handed a piece of one of them, not a slide deck about it.",
};

export const LADDER = [
  { title: "Associate Product Manager", own: "A surface or a feature, end to end. You write the spec, the copy and the launch note. You ship weekly and you read what happened.", years: "Year 1" },
  { title: "Product Manager", own: "A product line with a roadmap, a small team of engineers and a designer who sits next to you.", years: "Years 2–3" },
  { title: "Senior Product Manager", own: "A business line with a number attached to it, and more than one squad shipping against it.", years: "Years 3–5" },
  { title: "Group Product Manager", own: "A whole product area across ImagineArt Web. You hire and grow the PMs who own the lines.", years: "Year 5+" },
];

export const SCOPE = [
  { when: "Week 1", what: "You get a surface, a designer, and access to the numbers. You ship something small before Friday." },
  { when: "Day 30", what: "You have talked to users yourself and changed something because of it." },
  { when: "Day 90", what: "You own a roadmap for your surface and defend it in the room." },
  { when: "Month 6", what: "A feature you led is in the product and you can point to what it moved." },
  { when: "Year 1", what: "You are the person the team looks to when your surface feels off. That is the job." },
];

export const HOW = {
  eyebrow: "How product works here",
  title: "Small teams, real users, no layers.",
  items: [
    { n: "01", t: "The spec is yours.", b: "You write it, you defend it, you ship it. Nobody hands you tickets." },
    { n: "02", t: "You talk to users.", b: "Not a research team on your behalf. Creators, marketers and studios use this product every day and they will tell you what is wrong." },
    { n: "03", t: "Ship, then learn.", b: "Small releases, real users, fast iteration. The product changes every week and you will be one of the reasons." },
    { n: "04", t: "Design sits next to you.", b: "PMs and designers pair from the first sketch. No hand-offs, no ticket queues between you." },
    { n: "05", t: "Numbers are the story.", b: "Activation, retention, revenue. You will read them, and you will be asked what you did about them." },
    { n: "06", t: "No layers.", b: "You talk to the Group PM and the founders directly. If something needs deciding, it gets decided." },
  ],
};

export const TEAM = {
  eyebrow: "Who you'll work with",
  title: "The product team.",
  body: "You will work directly with the PMs and designers below, in the same room. The names are real; the titles are current.",
  groups: [
    { label: "Product", people: [
      { name: "Saad Ahmed", role: "Group Product Manager, ImagineArt Web" },
      { name: "Ali Ayub Khan", role: "Senior Product Manager" },
      { name: "Muhammad Usama", role: "Product Manager, ImagineArt Web" },
      { name: "Saif ur Rehman", role: "Product Manager, ImagineArt Web" },
      { name: "Mehdi", role: "Product Growth" },
    ]},
    { label: "Associate PMs", people: [
      { name: "Muhammad Muzammil", role: "Associate Product Manager" },
      { name: "Ashad Qureshi", role: "Associate Product Manager" },
      { name: "Raamiz Khan Niazi", role: "Associate Product Manager" },
      { name: "Ahmed Hassan", role: "Associate Product Manager" },
      { name: "Hussain Asjad Abbas", role: "Associate Product Manager" },
      { name: "Taha Abid", role: "Assistant Product Manager" },
    ]},
    { label: "Design", people: [
      { name: "Aizaz Ahmad", role: "Senior Product Designer" },
      { name: "Hamza Jamal", role: "Product Designer" },
      { name: "Tayyab Abbas", role: "Product Designer" },
      { name: "Khadija Umer", role: "Product Designer" },
      { name: "Syed Aman", role: "Product Designer" },
      { name: "Faisal Khan", role: "Creative Director" },
    ]},
  ],
};

export const PLACES = {
  eyebrow: "Islamabad → San Francisco",
  title: "Built in Islamabad. Shipped to the world.",
  body: "The product team sits in Islamabad. The company sells in San Francisco and to creators everywhere. The strongest people here get to travel with the product: to the SF office, and to the events where the industry meets.",
  islamabad: { name: "Islamabad", sub: "Product, design and engineering" },
  sf: { name: "San Francisco", sub: "Vyro's US office" },
  perks: [
    { t: "Great compensation, in Islamabad.", b: "We say the number in the first conversation, so nobody wastes a month finding out." },
    { t: "A chance to work from the SF office.", b: "Earned, not scheduled. The people who ship the most get the most rope." },
    { t: "International events and conferences.", b: "Where the industry meets, the team goes. Bring a notebook." },
    { t: "Products serving millions.", b: "Nothing you ship here is a toy. It goes to real users the day it's ready." },
  ],
};

export const FIT = {
  eyebrow: "Read this before you apply",
  yes: [
    "You have built something nobody asked you to build.",
    "You would rather ship a rough version this week than a perfect one next quarter.",
    "You read the numbers before the opinions.",
    "You want to be in the room, in Islamabad, with the people building it.",
  ],
  no: [
    "You want the role defined before you will act on it.",
    "You want to be told what to build.",
    "You think product means writing tickets.",
    "You are waiting for a manager to notice you.",
  ],
};

export const PROCESS = {
  eyebrow: "How the drive works",
  title: "Six steps. No tricks.",
  sla: "You hear back within two weeks of applying, either way.",
  steps: [
    { n: "01", t: "Apply", d: "Five minutes", b: "One form, one link to something you made. No cover letter." },
    { n: "02", t: "Campus drive", d: "On your campus", b: "FAST Lahore, Islamabad and Karachi, LUMS, and NUST. Meet the team, see the product, ask anything." },
    { n: "03", t: "Screen with current APMs", d: "30 minutes", b: "The people doing the job a year ahead of you. They ask the questions they wish they had been asked." },
    { n: "04", t: "Product case day", d: "Half a day, in Islamabad", b: "A real problem from the product, worked with a designer at the table. We look at how you think, not how you present." },
    { n: "05", t: "The room", d: "45 minutes", b: "A conversation with the Group PM and the founders. Come with opinions about ImagineArt." },
    { n: "06", t: "Offer", d: "Within days", b: "Number, start date, and who you will sit next to." },
  ],
  campuses: ["FAST Lahore", "FAST Islamabad", "FAST Karachi", "LUMS", "NUST"],
  datesNote: "Campus dates are announced on this page first.",
};

export const APPLY = {
  eyebrow: "Apply",
  title: "Generate your application.",
  body: "Fill the prompt. The only thing we read closely is the link.",
  submit: "Submit application",
  universities: ["FAST", "LUMS", "NUST", "Other"],
  cities: ["Lahore", "Islamabad", "Karachi", "Other"],
  years: ["2025", "2026", "2027"],
  success: "Received. You will hear from us within two weeks.",
  failure: "Something went wrong on our side. Email your application to careers@imagine.art.",
};

export const FAQ = [
  { q: "Who can apply?", a: "Final-year students and graduates up to one year out. The drive focuses on FAST, LUMS and NUST, but the form is open to anyone in Pakistan who has built something worth showing." },
  { q: "Is the role in person?", a: "Yes. The product team works from the Islamabad office. This is a job you do in the room." },
  { q: "What does an Associate Product Manager actually do here?", a: "You are handed a surface of the product and you own it: the spec, the copy, the launch, the numbers afterwards. You work with a designer and engineers directly. There is no layer between you and the users." },
  { q: "What is the compensation?", a: "Great for Islamabad, and we tell you the number in the first conversation rather than at the end." },
  { q: "What is the San Francisco part?", a: "Vyro has an office in San Francisco. The APMs who ship the most get the chance to work from it and to attend international events with the team. It is earned." },
  { q: "How long does the process take?", a: "You hear back within two weeks of applying. From campus drive to offer is usually a few weeks." },
  { q: "Do I need a computer science degree?", a: "No. You need to have built or shipped something, and to be able to explain why you made the choices you made." },
  { q: "Can I use AI to prepare my application?", a: "Yes, and we will ask you how. We build AI products; we would be surprised if you didn't." },
  { q: "I am not from FAST, LUMS or NUST. Should I still apply?", a: "Yes. The campus drives are where we go looking; the form is open to everyone." },
  { q: "What happens with my application data?", a: "It is read by the product team for this drive only and is not shared outside the company." },
];
