"use client";

import {
  FormEvent,
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

const categories = [
  {
    id: "web",
    name: "Website development",
    shortName: "Web development",
    description: "Marketing sites, portfolios and business websites.",
    icon: "code",
    base: 5200,
    hours: 190,
    weeks: 5,
    range: "$3k – $12k",
    example:
      "I need a responsive business website with a modern design, contact form and basic SEO.",
  },
  {
    id: "mobile",
    name: "Mobile application",
    shortName: "Mobile app",
    description: "Native and cross-platform apps for iOS and Android.",
    icon: "smartphone",
    base: 9800,
    hours: 340,
    weeks: 8,
    range: "$7k – $28k",
    example:
      "I need a cross-platform fitness app with user profiles, subscriptions and progress tracking.",
  },
  {
    id: "ecommerce",
    name: "Ecommerce development",
    shortName: "Ecommerce",
    description: "Online stores, payments, inventory and product pages.",
    icon: "shopping-bag",
    base: 7200,
    hours: 245,
    weeks: 6,
    range: "$5k – $17k",
    example:
      "I need an ecommerce website for a clothing brand with online payments, customer accounts and about 500 products.",
  },
  {
    id: "design",
    name: "UI and UX design",
    shortName: "UI/UX design",
    description: "Product research, wireframes, prototypes and visual design.",
    icon: "palette",
    base: 3400,
    hours: 115,
    weeks: 3,
    range: "$2k – $8k",
    example:
      "I need a complete UI and UX design for a budgeting mobile app, including research and a clickable prototype.",
  },
  {
    id: "seo",
    name: "Search engine optimization",
    shortName: "SEO",
    description: "Technical SEO, content strategy and search improvements.",
    icon: "search",
    base: 2100,
    hours: 70,
    weeks: 3,
    range: "$1.2k – $5k",
    example:
      "I need technical SEO and a three-month content plan to improve organic traffic for my SaaS website.",
  },
  {
    id: "social",
    name: "Social media management",
    shortName: "Social media",
    description: "Content calendars, publishing and monthly reporting.",
    icon: "megaphone",
    base: 2300,
    hours: 80,
    weeks: 4,
    range: "$1.5k – $6k",
    example:
      "I need social media management for a small fashion brand, with 12 posts per month and monthly reports.",
  },
  {
    id: "branding",
    name: "Branding and graphic design",
    shortName: "Branding",
    description: "Visual identities, logos and brand guidelines.",
    icon: "pen-tool",
    base: 3600,
    hours: 105,
    weeks: 4,
    range: "$1.8k – $8k",
    example:
      "I need a complete visual identity for a new coffee brand, including logo, color palette and brand guide.",
  },
  {
    id: "ai",
    name: "AI solutions",
    shortName: "AI solutions",
    description: "AI assistants, automations and custom integrations.",
    icon: "bot",
    base: 10500,
    hours: 330,
    weeks: 8,
    range: "$8k – $32k",
    example:
      "I need an AI customer support assistant that connects to our knowledge base and Shopify store.",
  },
] as const;

const locations = [
  {
    id: "us",
    country: "United States",
    city: "New York",
    currency: "USD",
    multiplier: 1.2,
    taxRate: 0.08875,
  },
  {
    id: "ca",
    country: "Canada",
    city: "Toronto",
    currency: "CAD",
    multiplier: 1,
    taxRate: 0.13,
  },
  {
    id: "uk",
    country: "United Kingdom",
    city: "London",
    currency: "GBP",
    multiplier: 0.92,
    taxRate: 0.2,
  },
  {
    id: "ae",
    country: "United Arab Emirates",
    city: "Dubai",
    currency: "AED",
    multiplier: 1.02,
    taxRate: 0.05,
  },
  {
    id: "pk",
    country: "Pakistan",
    city: "Karachi",
    currency: "PKR",
    multiplier: 0.34,
    taxRate: 0.05,
  },
  {
    id: "in",
    country: "India",
    city: "Mumbai",
    currency: "INR",
    multiplier: 0.3,
    taxRate: 0.18,
  },
  {
    id: "au",
    country: "Australia",
    city: "Sydney",
    currency: "AUD",
    multiplier: 1.08,
    taxRate: 0.1,
  },
  {
    id: "de",
    country: "Germany",
    city: "Berlin",
    currency: "EUR",
    multiplier: 0.98,
    taxRate: 0.19,
  },
  {
    id: "sg",
    country: "Singapore",
    city: "Singapore",
    currency: "SGD",
    multiplier: 1.04,
    taxRate: 0.09,
  },
  {
    id: "ng",
    country: "Nigeria",
    city: "Lagos",
    currency: "NGN",
    multiplier: 0.28,
    taxRate: 0.075,
  },
] as const;

const projectSizes = [
  {
    id: "small",
    name: "Focused",
    description: "A smaller scope with essential features",
    example: "Landing page or one core workflow",
    multiplier: 0.72,
    weekFactor: 0.75,
  },
  {
    id: "medium",
    name: "Standard",
    description: "A balanced project with the usual features",
    example: "Several screens and integrations",
    multiplier: 1,
    weekFactor: 1,
  },
  {
    id: "large",
    name: "Complex",
    description: "A larger scope with advanced requirements",
    example: "Multiple workflows, roles and integrations",
    multiplier: 1.58,
    weekFactor: 1.45,
  },
] as const;

const qualityOptions = [
  {
    id: "essential",
    name: "Essential",
    description: "Reliable, efficient and budget-conscious",
    multiplier: 0.82,
    weekFactor: 0.9,
  },
  {
    id: "standard",
    name: "Standard",
    description: "A strong balance of quality and value",
    multiplier: 1,
    weekFactor: 1,
  },
  {
    id: "premium",
    name: "Premium",
    description: "More polish, scale and customization",
    multiplier: 1.38,
    weekFactor: 1.2,
  },
] as const;

type CategoryId = (typeof categories)[number]["id"];
type LocationId = (typeof locations)[number]["id"];
type ProjectSizeId = (typeof projectSizes)[number]["id"];
type QualityId = (typeof qualityOptions)[number]["id"];
type Category = (typeof categories)[number];
type Location = (typeof locations)[number];
type ProjectSize = (typeof projectSizes)[number];
type QualityOption = (typeof qualityOptions)[number];

type IconName =
  | "arrow-right"
  | "bot"
  | "calculator"
  | "check"
  | "chevron-down"
  | "clock"
  | "close"
  | "code"
  | "download"
  | "file-text"
  | "globe"
  | "layers"
  | "lock"
  | "megaphone"
  | "menu"
  | "palette"
  | "pen-tool"
  | "plus"
  | "rotate"
  | "search"
  | "share"
  | "shield"
  | "shopping-bag"
  | "sparkles"
  | "smartphone"
  | "trending"
  | "users"
  | "zap";

interface EstimateItem {
  name: string;
  detail: string;
  quantity: number;
  rate: number;
}

interface EstimateResult {
  projectTitle: string;
  description: string;
  category: Category;
  location: Location;
  size: ProjectSize;
  quality: QualityOption;
  items: EstimateItem[];
  subtotal: number;
  contingency: number;
  taxes: number;
  total: number;
  low: number;
  high: number;
  confidence: number;
  durationMin: number;
  durationMax: number;
}

interface SharedEstimate {
  description: string;
  categoryId: CategoryId;
  locationId: LocationId;
  sizeId: ProjectSizeId;
  qualityId: QualityId;
}

const scopeByCategory: Record<CategoryId, string[]> = {
  web: [
    "Discovery, content plan and project roadmap",
    "Responsive page designs and reusable components",
    "Front-end build, forms and CMS integration",
    "Testing, launch and team handover",
  ],
  mobile: [
    "Product flows, wireframes and user journeys",
    "Reusable mobile UI and design system",
    "Cross-platform build and backend integration",
    "Store submission, testing and launch support",
  ],
  ecommerce: [
    "Catalog, customer and checkout experience",
    "Payments, tax, shipping and inventory setup",
    "Responsive storefront and product administration",
    "Testing, analytics and staff training",
  ],
  design: [
    "User research and stakeholder workshop",
    "Information architecture and user flows",
    "High-fidelity interface design",
    "Clickable prototype and design handover",
  ],
  seo: [
    "Technical SEO audit and opportunity review",
    "Keyword and content strategy",
    "On-page recommendations and implementation",
    "Ranking setup and progress reporting",
  ],
  social: [
    "Audience research and monthly content plan",
    "Creative production and publishing calendar",
    "Community response and channel monitoring",
    "Monthly performance review and report",
  ],
  branding: [
    "Brand discovery and positioning workshop",
    "Logo exploration and visual direction",
    "Color, typography and supporting assets",
    "Brand guidelines and final file handover",
  ],
  ai: [
    "Use-case validation and technical discovery",
    "Data, model and integration architecture",
    "AI workflow build and evaluation suite",
    "Security testing, monitoring and handover",
  ],
};

const assumptions = [
  "One approved round of revisions is included per deliverable",
  "You will provide copy, brand assets and feedback on schedule",
  "The estimate assumes normal working hours and normal project access",
  "Third-party subscriptions and ongoing monthly services are excluded",
];

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "bot":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="3" />
          <path d="M8 3h8M12 3v4M8 13h.01M16 13h.01M8 17h8" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="3" />
          <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
        </svg>
      );
    case "download":
      return (
        <svg {...props}>
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 20h16" />
        </svg>
      );
    case "file-text":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...props}>
          <path d="m3 11 15-6v14L3 13v-2ZM11 16l1 5H7l-2-7M19 9a3 3 0 0 1 0 6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "palette":
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 0 0 0 18h1.4a1.6 1.6 0 0 0 1.1-2.8 1.6 1.6 0 0 1 1.1-2.8H18A3 3 0 0 0 21 12a9 9 0 0 0-9-9Z" />
          <path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01M17 9h.01" />
        </svg>
      );
    case "pen-tool":
      return (
        <svg {...props}>
          <path d="m12 19 7-7 3 3-7 7-3-3Z" />
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18M2 2l7.586 7.586M11 11a2 2 0 1 0 2 2" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "rotate":
      return (
        <svg {...props}>
          <path d="M20 7v5h-5M4 17v-5h5" />
          <path d="M6.1 9A7 7 0 0 1 18.8 7L20 12M4 12l1.2 5A7 7 0 0 0 17.9 15" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    case "share":
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "shopping-bag":
      return (
        <svg {...props}>
          <path d="M5 7h14l1 14H4L5 7Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...props}>
          <path d="m12 3-1.1 3.2A5 5 0 0 1 8 9L5 10l3 1a5 5 0 0 1 2.9 2.8L12 17l1.1-3.2A5 5 0 0 1 16 11l3-1-3-1a5 5 0 0 1-2.9-2.8L12 3Z" />
          <path d="m5 3-.3.9A2 2 0 0 1 3.3 4.5L2.5 5l.8.5a2 2 0 0 1 1.4 1.6L5 8l.3-.9a2 2 0 0 1 1.4-1.6l.8-.5-.8-.5A2 2 0 0 1 5.3 3.9L5 3ZM19 16l-.4 1.2a2.2 2.2 0 0 1-1.4 1.4L16 19l.8.4a2.2 2.2 0 0 1 1.4 1.4L19 22l.4-1.2a2.2 2.2 0 0 1 1.4-1.4l.8-.4-.8-.4a2.2 2.2 0 0 1-1.4-1.4L19 16Z" />
        </svg>
      );
    case "smartphone":
      return (
        <svg {...props}>
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <path d="M10 5h4M11 19h2" />
        </svg>
      );
    case "trending":
      return (
        <svg {...props}>
          <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "zap":
      return (
        <svg {...props}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );
  }
}

function Brand() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="CostCalc home">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-[#17151f] text-white shadow-sm transition-transform duration-300 group-hover:-rotate-3">
        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#765cf6]" />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden="true">
          <path d="M6 7.5 12 4l6 3.5v7L12 18l-6-3.5v-7Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="m8.5 10 3.5 2 3.5-2M12 12v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[19px] font-bold tracking-[-0.035em] text-[#181720]">CostCalc</span>
    </a>
  );
}

function roundMoney(value: number) {
  return Math.round(value);
}

function formatCurrency(value: number, location: Location) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: location.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number, location: Location) {
  const symbol = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: location.currency,
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .formatToParts(value)
    .find((part) => part.type === "currency")?.value;

  if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${symbol}${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return `${symbol}${Math.round(value)}`;
}

function detectCategory(description: string): CategoryId {
  const value = description.toLowerCase();
  const matches: Array<{ words: string[]; id: CategoryId }> = [
    { words: ["ecommerce", "e-commerce", "online store", "shopify", "checkout"], id: "ecommerce" },
    { words: ["mobile app", "android", "ios", "fitness app", "application"], id: "mobile" },
    { words: ["ai ", "artificial intelligence", "automation", "assistant", "chatbot"], id: "ai" },
    { words: ["logo", "branding", "brand identity", "visual identity", "coffee brand"], id: "branding" },
    { words: ["ui", "ux", "prototype", "wireframe", "product design"], id: "design" },
    { words: ["seo", "search engine", "organic traffic", "ranking"], id: "seo" },
    { words: ["social media", "instagram", "content calendar", "posts per month"], id: "social" },
    { words: ["website", "web app", "web application", "landing page", "portfolio"], id: "web" },
  ];

  return matches.find(({ words }) => words.some((word) => value.includes(word)))?.id ?? "web";
}

function detectLocation(description: string): LocationId {
  const value = description.toLowerCase();
  const matches: Array<{ words: string[]; id: LocationId }> = [
    { words: ["canada", "toronto", "vancouver", "montreal"], id: "ca" },
    { words: ["united states", "usa", "new york", "san francisco", "texas"], id: "us" },
    { words: ["united kingdom", "uk", "london", "manchester"], id: "uk" },
    { words: ["dubai", "uae", "abu dhabi"], id: "ae" },
    { words: ["pakistan", "karachi", "lahore", "islamabad"], id: "pk" },
    { words: ["india", "mumbai", "delhi", "bangalore"], id: "in" },
    { words: ["australia", "sydney", "melbourne"], id: "au" },
    { words: ["germany", "berlin", "munich"], id: "de" },
    { words: ["singapore"], id: "sg" },
    { words: ["nigeria", "lagos", "abuja"], id: "ng" },
  ];

  return matches.find(({ words }) => words.some((word) => value.includes(word)))?.id ?? "us";
}

function getProjectTitle(description: string, category: Category) {
  const cleaned = description
    .trim()
    .replace(/^(i need|we need|please create|i want|we want)\s+/i, "")
    .replace(/[.!?]+$/, "");

  if (cleaned.length < 20 || cleaned.length > 76) return category.shortName;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function calculateEstimate(
  description: string,
  categoryId: CategoryId,
  locationId: LocationId,
  sizeId: ProjectSizeId,
  qualityId: QualityId,
): EstimateResult {
  const category = categories.find((item) => item.id === categoryId) ?? categories[0];
  const location = locations.find((item) => item.id === locationId) ?? locations[0];
  const size = projectSizes.find((item) => item.id === sizeId) ?? projectSizes[1];
  const quality = qualityOptions.find((item) => item.id === qualityId) ?? qualityOptions[1];

  const projectTotal =
    category.base * location.multiplier * size.multiplier * quality.multiplier;
  const lineItemShares = [0.14, 0.16, 0.42, 0.16, 0.12];
  const lineItemDetails = [
    { name: "Discovery & strategy", detail: "Requirements, research and project plan", quantity: 1 },
    { name: "UX & UI design", detail: "Wireframes, interface design and prototype", quantity: 28 },
    {
      name: "Development",
      detail: "Responsive build, features and integrations",
      quantity: Math.round(category.hours * 0.62),
    },
    { name: "Quality assurance", detail: "Testing, fixes and launch checks", quantity: 28 },
    { name: "Project management", detail: "Communication, coordination and handover", quantity: 16 },
  ];

  const items: EstimateItem[] = lineItemDetails.map((item, index) => {
    const amount = projectTotal * lineItemShares[index];
    return {
      name: item.name,
      detail: item.detail,
      quantity: item.quantity,
      rate: roundMoney(amount / item.quantity),
    };
  });
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const contingency = roundMoney(subtotal * 0.05);
  const taxes = roundMoney((subtotal + contingency) * location.taxRate);
  const total = subtotal + contingency + taxes;
  const baseWeeks = category.weeks * size.weekFactor * quality.weekFactor;
  const confidence = Math.min(94, 80 + Math.min(12, Math.floor(description.length / 10)));

  return {
    projectTitle: getProjectTitle(description, category),
    description,
    category,
    location,
    size,
    quality,
    items,
    subtotal,
    contingency,
    taxes,
    total,
    low: roundMoney(total * 0.88),
    high: roundMoney(total * 1.17),
    confidence,
    durationMin: Math.max(1, Math.round(baseWeeks * 0.8)),
    durationMax: Math.max(2, Math.round(baseWeeks * 1.2)),
  };
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface QuoteModalProps {
  estimate: EstimateResult;
  items: EstimateItem[];
  onChange: (items: EstimateItem[]) => void;
  onClose: () => void;
  notify: (message: string) => void;
}

function QuoteModal({ estimate, items, onChange, onClose, notify }: QuoteModalProps) {
  const [businessName, setBusinessName] = useState("Your Company");
  const [customerName, setCustomerName] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const contingency = roundMoney(subtotal * 0.05);
  const taxes = roundMoney((subtotal + contingency) * estimate.location.taxRate);
  const total = subtotal + contingency + taxes;

  const updateItem = (index: number, field: "quantity" | "rate", value: string) => {
    const numericValue = Math.max(0, Number(value) || 0);
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: numericValue } : item,
      ),
    );
  };

  const printQuote = () => {
    document.body.classList.add("printing-quote");
    window.print();
    window.setTimeout(() => document.body.classList.remove("printing-quote"), 500);
  };

  return (
    <div className="quote-print-shell fixed inset-0 z-[100] overflow-y-auto bg-[#15131b]/65 p-3 backdrop-blur-sm sm:p-6">
      <div
        className="quote-document mx-auto my-3 max-w-5xl overflow-hidden rounded-[24px] border border-white/60 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Editable project quotation"
      >
        <div className="no-print flex items-center justify-between border-b border-[#ebe9f0] px-5 py-4 sm:px-7">
          <div>
            <p className="font-semibold text-[#1d1b25]">Quotation editor</p>
            <p className="mt-0.5 text-xs text-[#777381]">Edit any line item before downloading.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#e8e6ec] text-[#5f5c68] transition hover:bg-[#f5f4f7]"
            aria-label="Close quotation editor"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="p-5 sm:p-9">
          <div className="flex flex-col gap-7 border-b border-[#eae8ee] pb-7 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#18161f]">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#18161f] text-white">
                  <Icon name="layers" className="h-4 w-4" />
                </span>
                <span className="text-lg font-bold tracking-[-0.03em]">
                  {businessName || "CostCalc quote"}
                </span>
              </div>
              <h2 className="mt-5 max-w-xl text-2xl font-bold tracking-[-0.04em] text-[#1c1a23] sm:text-3xl">
                {estimate.projectTitle}
              </h2>
              <p className="mt-2 text-sm text-[#777481]">Prepared for {customerName || "your client"}</p>
            </div>
            <div className="rounded-2xl bg-[#f5f3fb] px-5 py-4 text-sm sm:min-w-48">
              <p className="font-semibold text-[#26232e]">Quotation QF-2026-0248</p>
              <p className="mt-1 text-[#777481]">Valid for 30 days</p>
              <span className="mt-3 inline-flex rounded-full bg-[#e5f6ed] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#188052]">
                Draft
              </span>
            </div>
          </div>

          <div className="grid gap-4 py-6 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#46424f]">
              From
              <input
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#dedbe5] bg-white px-4 py-3 font-semibold text-[#24212c] outline-none transition focus:border-[#6f57e8] focus:ring-4 focus:ring-[#6f57e8]/10"
              />
            </label>
            <label className="block text-sm font-medium text-[#46424f]">
              Prepared for
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Client or company name"
                className="mt-2 w-full rounded-xl border border-[#dedbe5] bg-white px-4 py-3 font-semibold text-[#24212c] outline-none transition focus:border-[#6f57e8] focus:ring-4 focus:ring-[#6f57e8]/10"
              />
            </label>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e6e3eb]">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead className="bg-[#f7f6f9] text-[11px] uppercase tracking-[0.12em] text-[#6f6b78]">
                <tr>
                  <th className="px-4 py-3.5 font-bold">Description</th>
                  <th className="w-28 px-3 py-3.5 font-bold">Qty</th>
                  <th className="w-40 px-3 py-3.5 font-bold">Rate</th>
                  <th className="w-32 px-4 py-3.5 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe9ef]">
                {items.map((item, index) => (
                  <tr key={item.name}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#292631]">{item.name}</p>
                      <p className="mt-0.5 text-xs text-[#817d89]">{item.detail}</p>
                    </td>
                    <td className="px-3 py-4">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(event) => updateItem(index, "quantity", event.target.value)}
                        className="w-full rounded-lg border border-[#dedbe5] bg-white px-2.5 py-2 text-right text-sm font-medium text-[#34313c] outline-none focus:border-[#6f57e8]"
                        aria-label={`${item.name} quantity`}
                      />
                    </td>
                    <td className="px-3 py-4">
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(event) => updateItem(index, "rate", event.target.value)}
                        className="w-full rounded-lg border border-[#dedbe5] bg-white px-2.5 py-2 text-right text-sm font-medium text-[#34313c] outline-none focus:border-[#6f57e8]"
                        aria-label={`${item.name} rate`}
                      />
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-[#292631]">
                      {formatCurrency(item.quantity * item.rate, estimate.location)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 ml-auto max-w-sm">
            <div className="flex items-center justify-between border-b border-[#ebe9ef] py-3 text-sm text-[#66626e]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#302d37]">{formatCurrency(subtotal, estimate.location)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#ebe9ef] py-3 text-sm text-[#66626e]">
              <span>Contingency (5%)</span>
              <span className="font-semibold text-[#302d37]">{formatCurrency(contingency, estimate.location)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#ebe9ef] py-3 text-sm text-[#66626e]">
              <span>Taxes & fees</span>
              <span className="font-semibold text-[#302d37]">{formatCurrency(taxes, estimate.location)}</span>
            </div>
            <div className="flex items-center justify-between py-5">
              <span className="font-bold text-[#24212b]">Total</span>
              <span className="text-2xl font-bold tracking-[-0.04em] text-[#272331]">
                {formatCurrency(total, estimate.location)}
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#f7f6f9] p-5 text-xs leading-5 text-[#77727f]">
            This quotation is valid for 30 days. Final pricing may change after a detailed review or
            professional inspection. A 50% deposit may be required to begin work.
          </div>
        </div>

        <div className="no-print flex flex-col-reverse gap-3 border-t border-[#ebe9f0] bg-[#faf9fb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-xs text-[#77727f]">You can edit quantities and rates before downloading.</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                notify("Quotation details saved for this session");
                onClose();
              }}
              className="flex-1 rounded-xl border border-[#dcd8e2] bg-white px-4 py-3 text-sm font-semibold text-[#3e3a46] transition hover:bg-[#f6f5f7] sm:flex-none"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={printQuote}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6754e7] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(103,84,231,0.22)] transition hover:bg-[#5946d3] sm:flex-none"
            >
              <Icon name="download" className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<CategoryId>("web");
  const [locationId, setLocationId] = useState<LocationId>("us");
  const [sizeId, setSizeId] = useState<ProjectSizeId>("medium");
  const [qualityId, setQualityId] = useState<QualityId>("standard");
  const [questionStep, setQuestionStep] = useState(0);
  const [stage, setStage] = useState<"describe" | "questions" | "complete">("describe");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState<EstimateItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const selectedCategory = useMemo(
    () => categories.find((item) => item.id === categoryId) ?? categories[0],
    [categoryId],
  );
  const selectedLocation = useMemo(
    () => locations.find((item) => item.id === locationId) ?? locations[0],
    [locationId],
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  useEffect(() => {
    if (!window.location.hash.startsWith("#estimate=")) return;

    try {
      const raw = window.location.hash.replace("#estimate=", "");
      const shared = JSON.parse(decodeURIComponent(raw)) as SharedEstimate;
      const categoryIsValid = categories.some((item) => item.id === shared.categoryId);
      const locationIsValid = locations.some((item) => item.id === shared.locationId);
      const sizeIsValid = projectSizes.some((item) => item.id === shared.sizeId);
      const qualityIsValid = qualityOptions.some((item) => item.id === shared.qualityId);

      if (!shared.description || !categoryIsValid || !locationIsValid || !sizeIsValid || !qualityIsValid) {
        return;
      }

      setDescription(shared.description);
      setCategoryId(shared.categoryId);
      setLocationId(shared.locationId);
      setSizeId(shared.sizeId);
      setQualityId(shared.qualityId);
      setEstimate(
        calculateEstimate(
          shared.description,
          shared.categoryId,
          shared.locationId,
          shared.sizeId,
          shared.qualityId,
        ),
      );
      setStage("complete");
      window.setTimeout(() => scrollToSection("estimate-result"), 200);
    } catch {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const beginEstimate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (description.trim().length < 12) return;

    const detectedCategory = detectCategory(description);
    const detectedLocation = detectLocation(description);
    setCategoryId(detectedCategory);
    setLocationId(detectedLocation);
    setQuestionStep(0);
    setStage("questions");
    window.setTimeout(() => scrollToSection("estimator"), 30);
  };

  const continueQuestions = () => {
    if (questionStep === 0) {
      setQuestionStep(1);
      return;
    }

    const result = calculateEstimate(description, categoryId, locationId, sizeId, qualityId);
    setEstimate(result);
    setStage("complete");
    window.setTimeout(() => scrollToSection("estimate-result"), 80);
  };

  const resetEstimate = () => {
    window.history.replaceState(null, "", window.location.pathname);
    setDescription("");
    setCategoryId("web");
    setLocationId("us");
    setSizeId("medium");
    setQualityId("standard");
    setQuestionStep(0);
    setStage("describe");
    setEstimate(null);
    window.setTimeout(() => scrollToSection("estimator"), 50);
  };

  const chooseCategory = (id: CategoryId) => {
    const category = categories.find((item) => item.id === id) ?? categories[0];
    setCategoryId(id);
    setStage("describe");
    if (!description.trim()) setDescription(category.example);
    window.setTimeout(() => scrollToSection("estimator"), 30);
  };

  const openQuotation = () => {
    if (!estimate) return;
    setQuoteItems(estimate.items.map((item) => ({ ...item })));
    setQuoteOpen(true);
  };

  const shareEstimate = async () => {
    if (!estimate) return;
    const payload: SharedEstimate = { description, categoryId, locationId, sizeId, qualityId };
    const url = new URL(window.location.href);
    url.hash = `estimate=${encodeURIComponent(JSON.stringify(payload))}`;

    try {
      await navigator.clipboard.writeText(url.toString());
      notify("Shareable estimate link copied");
    } catch {
      window.prompt("Copy your estimate link:", url.toString());
    }
  };

  const saveEstimate = () => {
    if (!estimate) return;
    localStorage.setItem(
      "costcalc-latest-estimate",
      JSON.stringify({ ...estimate, savedAt: new Date().toISOString() }),
    );
    notify("Estimate saved on this device");
  };

  const activeStep = stage === "describe" ? 0 : stage === "questions" ? 1 : 2;
  const descriptionReady = description.trim().length >= 12;

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#f8f8fb] text-[#1d1b24]">
      <header className="relative z-50 border-b border-[#e9e7ed]/90 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-7" aria-label="Main navigation">
          <Brand />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-medium text-[#65616d] transition hover:text-[#26232d]">
              Services
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-[#65616d] transition hover:text-[#26232d]">
              How it works
            </a>
            <a href="#why-costcalc" className="text-sm font-medium text-[#65616d] transition hover:text-[#26232d]">
              Why CostCalc
            </a>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection("estimator")}
            className="hidden items-center gap-2 rounded-xl bg-[#1d1a25] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#302b3a] sm:flex"
          >
            Estimate my project
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#e5e2e9] text-[#393541] md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="border-t border-[#ece9ef] bg-white px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-1">
              {[
                ["Services", "services"],
                ["How it works", "how-it-works"],
                ["Why CostCalc", "why-costcalc"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#4c4854] hover:bg-[#f6f5f8]"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("estimator");
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#1d1a25] px-4 py-3 text-sm font-bold text-white"
              >
                Estimate my project
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      <section className="hero-surface relative">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="relative mx-auto grid min-w-0 max-w-[1200px] grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-20 pt-14 sm:px-7 sm:pt-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
          <div className="min-w-0 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded9f4] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#5d50a3] shadow-sm backdrop-blur">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ece8ff]">
                <Icon name="sparkles" className="h-3.5 w-3.5 text-[#6954df]" />
              </span>
              AI-powered project costing
            </div>
            <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.04] tracking-[-0.055em] text-[#19171f] sm:text-[3.6rem] lg:text-[4.15rem]">
              Know what your project should cost.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#6b6773] sm:text-lg sm:leading-8">
              Describe your project and get a localized cost range, clear scope and professional
              quotation in minutes—not days.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-[#5f5b66]">
              <span className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#e5f6ed] text-[#198454]">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                No credit card
              </span>
              <span className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#e5f6ed] text-[#198454]">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                Instant estimate
              </span>
              <span className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#e5f6ed] text-[#198454]">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                Localized pricing
              </span>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-[#e5e2ea] pt-6">
              <div className="flex -space-x-2">
                {["JM", "AR", "SK"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#f8f8fb] text-[10px] font-bold text-white ${
                      ["bg-[#5c6ac4]", "bg-[#bf6d8b]", "bg-[#398b7d]"][index]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-5 text-[#77727e]">
                <span className="font-bold text-[#3c3943]">Built for smarter planning</span>
                <br />
                Clear numbers before you commit.
              </p>
            </div>
          </div>

          <div id="estimator" className="min-w-0 scroll-mt-24">
            <div className="estimator-card relative overflow-hidden rounded-[26px] border border-white/90 bg-white p-3 shadow-[0_30px_90px_rgba(45,38,74,0.14)] sm:p-4">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6754e7] via-[#9a7cf1] to-[#5cc8aa]" />
              <div className="px-2 pb-3 pt-2 sm:px-3 sm:pb-4 sm:pt-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#26232e]">
                      {stage === "describe" && "Describe your project"}
                      {stage === "questions" && "A few quick details"}
                      {stage === "complete" && "Your estimate is ready"}
                    </p>
                    <p className="mt-0.5 text-xs text-[#85818c]">Free · No account needed</p>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-[#f0edff] px-3 py-1.5 text-[11px] font-bold text-[#604fc6] sm:flex">
                    <Icon name="zap" className="h-3.5 w-3.5" />
                    Live estimate
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["Describe", "Details", "Estimate"].map((label, index) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <div
                          className={`h-1.5 rounded-full transition-colors ${
                            index <= activeStep ? "bg-[#6d58e8]" : "bg-[#e9e6ee]"
                          }`}
                        />
                        <p
                          className={`mt-1.5 truncate text-[10px] font-semibold sm:text-[11px] ${
                            index <= activeStep ? "text-[#5b4abe]" : "text-[#a29ea8]"
                          }`}
                        >
                          {label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {stage === "describe" && (
                <form onSubmit={beginEstimate} className="rounded-[20px] border border-[#e8e5ed] bg-[#fcfbfd] p-4 sm:p-5">
                  <label htmlFor="project-description" className="text-sm font-bold text-[#302d37]">
                    What do you want to build or improve?
                  </label>
                  <div className="relative mt-3">
                    <textarea
                      id="project-description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value.slice(0, 500))}
                      placeholder="For example: I need an ecommerce website for a clothing brand with payments, customer accounts and around 500 products..."
                      className="min-h-[132px] w-full resize-none rounded-2xl border border-[#dedbe4] bg-white px-4 py-3.5 pr-11 text-[14px] leading-6 text-[#33303a] outline-none transition placeholder:text-[#aaa6b0] focus:border-[#7661e8] focus:ring-4 focus:ring-[#7661e8]/10 sm:min-h-[142px] sm:text-[15px]"
                    />
                    <span className="absolute bottom-3 right-3 text-[10px] font-medium text-[#aaa6b1]">
                      {description.length}/500
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="sr-only">Project category</span>
                      <span className="relative block">
                        <Icon name={selectedCategory.icon as IconName} className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6d58db]" />
                        <select
                          value={categoryId}
                          onChange={(event) => setCategoryId(event.target.value as CategoryId)}
                          className="h-11 w-full appearance-none rounded-xl border border-[#dedbe4] bg-white pl-10 pr-9 text-sm font-semibold text-[#403c47] outline-none transition focus:border-[#7661e8] focus:ring-4 focus:ring-[#7661e8]/10"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.shortName}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77727f]" />
                      </span>
                    </label>
                    <label className="block">
                      <span className="sr-only">Project location</span>
                      <span className="relative block">
                        <Icon name="globe" className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6d58db]" />
                        <select
                          value={locationId}
                          onChange={(event) => setLocationId(event.target.value as LocationId)}
                          className="h-11 w-full appearance-none rounded-xl border border-[#dedbe4] bg-white pl-10 pr-9 text-sm font-semibold text-[#403c47] outline-none transition focus:border-[#7661e8] focus:ring-4 focus:ring-[#7661e8]/10"
                        >
                          {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77727f]" />
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!descriptionReady}
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6754e7] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(103,84,231,0.25)] transition hover:bg-[#5946d3] disabled:cursor-not-allowed disabled:bg-[#c8c3d6] disabled:shadow-none"
                  >
                    Analyze my project
                    <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="mt-2 text-center text-[10px] font-medium text-[#95919c]">
                    {descriptionReady
                      ? "Your description stays private and is never shared."
                      : "Add a few details above to continue."}
                  </p>
                </form>
              )}

              {stage === "questions" && (
                <div className="rounded-[20px] border border-[#e8e5ed] bg-[#fcfbfd] p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#ede9ff] px-3 py-1 text-[11px] font-bold text-[#6652cc]">
                      Quick question {questionStep + 1} of 2
                    </span>
                    <span className="text-xs font-medium text-[#8a8691]">
                      {selectedCategory.shortName} · {selectedLocation.city}
                    </span>
                  </div>

                  {questionStep === 0 ? (
                    <div className="mt-5">
                      <h2 className="text-xl font-bold tracking-[-0.035em] text-[#24212b]">
                        How large is your project?
                      </h2>
                      <p className="mt-1.5 text-sm leading-6 text-[#797581]">
                        This helps us estimate the team, time and overall investment.
                      </p>
                      <div className="mt-5 grid gap-2.5">
                        {projectSizes.map((size) => (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setSizeId(size.id)}
                            className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition sm:p-4 ${
                              sizeId === size.id
                                ? "border-[#7460e4] bg-[#f4f1ff] shadow-[0_0_0_3px_rgba(116,96,228,0.08)]"
                                : "border-[#e3e0e7] bg-white hover:border-[#c9c3e8] hover:bg-[#fbfaff]"
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                                sizeId === size.id
                                  ? "bg-[#6d58df] text-white"
                                  : "bg-[#f0eef3] text-[#77727f]"
                              }`}
                            >
                              {sizeId === size.id ? <Icon name="check" className="h-4 w-4" /> : <Icon name="layers" className="h-4 w-4" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-[#37333f]">{size.name}</span>
                              <span className="mt-0.5 block text-xs leading-5 text-[#817d88]">{size.example}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <h2 className="text-xl font-bold tracking-[-0.035em] text-[#24212b]">
                        What level of quality do you need?
                      </h2>
                      <p className="mt-1.5 text-sm leading-6 text-[#797581]">
                        Pick the option that feels closest to your expectations.
                      </p>
                      <div className="mt-5 grid gap-2.5">
                        {qualityOptions.map((quality) => (
                          <button
                            key={quality.id}
                            type="button"
                            onClick={() => setQualityId(quality.id)}
                            className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition sm:p-4 ${
                              qualityId === quality.id
                                ? "border-[#7460e4] bg-[#f4f1ff] shadow-[0_0_0_3px_rgba(116,96,228,0.08)]"
                                : "border-[#e3e0e7] bg-white hover:border-[#c9c3e8] hover:bg-[#fbfaff]"
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                                qualityId === quality.id
                                  ? "bg-[#6d58df] text-white"
                                  : "bg-[#f0eef3] text-[#77727f]"
                              }`}
                            >
                              <Icon name="sparkles" className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-[#37333f]">{quality.name}</span>
                              <span className="mt-0.5 block text-xs leading-5 text-[#817d88]">{quality.description}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (questionStep === 0) {
                          setStage("describe");
                        } else {
                          setQuestionStep(0);
                        }
                      }}
                      className="rounded-xl border border-[#ddd9e3] bg-white px-4 py-3 text-sm font-bold text-[#5c5864] transition hover:bg-[#f7f6f8]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={continueQuestions}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6754e7] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(103,84,231,0.22)] transition hover:bg-[#5946d3]"
                    >
                      {questionStep === 0 ? "Continue" : "Generate my estimate"}
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {stage === "complete" && estimate && (
                <div className="rounded-[20px] border border-[#dcd6fa] bg-gradient-to-br from-[#f7f4ff] via-white to-[#effbf7] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e5f6ed] text-[#198454] shadow-sm">
                      <Icon name="check" className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1f8a58]">Estimate complete</p>
                      <h2 className="mt-1.5 text-2xl font-bold tracking-[-0.04em] text-[#25212c]">
                        {formatCurrency(estimate.total, estimate.location)}
                      </h2>
                      <p className="mt-1 text-sm text-[#77727f]">
                        Typical investment for {estimate.category.shortName.toLowerCase()} in {estimate.location.city}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 divide-x divide-[#e3dfec] rounded-2xl border border-[#e4e0eb] bg-white/80 py-3 text-center">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98939e]">Confidence</p>
                      <p className="mt-1 text-sm font-bold text-[#37333f]">{estimate.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98939e]">Timeline</p>
                      <p className="mt-1 text-sm font-bold text-[#37333f]">
                        {estimate.durationMin}–{estimate.durationMax} wks
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98939e]">Range</p>
                      <p className="mt-1 text-sm font-bold text-[#37333f]">
                        {formatCompactCurrency(estimate.low, estimate.location)}–{formatCompactCurrency(estimate.high, estimate.location)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection("estimate-result")}
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#211e29] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#34303d]"
                  >
                    View detailed estimate
                    <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-2 pb-1 pt-4 text-[10px] font-semibold text-[#918c98]">
                <span className="flex items-center gap-1.5">
                  <Icon name="lock" className="h-3.5 w-3.5" />
                  Private by default
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="calculator" className="h-3.5 w-3.5" />
                  Transparent pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  Takes under a minute
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {estimate && (
        <section id="estimate-result" className="scroll-mt-8 border-y border-[#e8e5ed] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e9f8f0] px-3 py-1.5 text-xs font-bold text-[#198454]">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Estimate ready
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.045em] text-[#201d27] sm:text-4xl">
                  {estimate.projectTitle}
                </h2>
                <p className="mt-2 text-sm text-[#77727e]">
                  {estimate.category.name} · {estimate.location.city}, {estimate.location.country} · {estimate.size.name} scope
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 print:hidden">
                <button
                  type="button"
                  onClick={saveEstimate}
                  className="rounded-xl border border-[#ddd9e3] bg-white px-4 py-2.5 text-sm font-bold text-[#4f4a57] transition hover:bg-[#f7f6f8]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={shareEstimate}
                  className="rounded-xl border border-[#ddd9e3] bg-white px-4 py-2.5 text-sm font-bold text-[#4f4a57] transition hover:bg-[#f7f6f8]"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="share" className="h-4 w-4" />
                    Share
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openQuotation}
                  className="flex items-center gap-2 rounded-xl bg-[#6754e7] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(103,84,231,0.22)] transition hover:bg-[#5946d3]"
                >
                  <Icon name="file-text" className="h-4 w-4" />
                  Create quotation
                </button>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="result-summary relative overflow-hidden rounded-[24px] bg-[#1c1923] p-6 text-white shadow-[0_22px_50px_rgba(31,27,40,0.17)] sm:p-8">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#725ce5]/25 blur-3xl" />
                <div className="absolute -bottom-24 left-20 h-52 w-52 rounded-full bg-[#35b98d]/15 blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#bdb5dc]">Expected investment</p>
                  <p className="mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                    {formatCurrency(estimate.total, estimate.location)}
                  </p>
                  <p className="mt-2 text-sm text-[#aaa5b3]">A typical project total, including contingency and estimated taxes</p>

                  <div className="mt-9 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#928ca0]">Low</p>
                      <p className="mt-1 text-lg font-bold">{formatCompactCurrency(estimate.low, estimate.location)}</p>
                    </div>
                    <div className="h-px w-5 bg-white/15 sm:w-10" />
                    <div className="text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#b9afe4]">Typical</p>
                      <p className="mt-1 text-lg font-bold text-[#d7cef8]">{formatCompactCurrency(estimate.total, estimate.location)}</p>
                    </div>
                    <div className="h-px w-5 bg-white/15 sm:w-10" />
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#928ca0]">High</p>
                      <p className="mt-1 text-lg font-bold">{formatCompactCurrency(estimate.high, estimate.location)}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="relative mx-auto h-full w-2/3 rounded-full bg-gradient-to-r from-[#725ce5] to-[#4fd0a5]">
                      <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#1c1923] bg-white" />
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-[#aaa5b3]">
                    <span className="flex items-center gap-1.5">
                      <Icon name="globe" className="h-4 w-4 text-[#9481ef]" />
                      {estimate.location.currency} pricing
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="clock" className="h-4 w-4 text-[#9481ef]" />
                      {estimate.durationMin}–{estimate.durationMax} weeks
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="shield" className="h-4 w-4 text-[#4fd0a5]" />
                      {estimate.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#e7e4eb] bg-[#fbfafc] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#2b2732]">Estimate confidence</p>
                    <p className="mt-1 text-xs leading-5 text-[#817c88]">Based on project detail, scope and local pricing.</p>
                  </div>
                  <span className="rounded-full bg-[#e5f6ed] px-2.5 py-1 text-[11px] font-bold text-[#198454]">High</span>
                </div>
                <div className="mt-6 flex items-end gap-3">
                  <p className="text-4xl font-bold tracking-[-0.05em] text-[#27232e]">{estimate.confidence}%</p>
                  <p className="pb-1 text-xs text-[#918c97]">confidence score</p>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#e9e6ec]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6a56df] to-[#4bc59c]"
                    style={{ width: `${estimate.confidence}%` }}
                  />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#e7e3eb] bg-white p-3.5">
                    <Icon name="layers" className="h-4 w-4 text-[#6c57db]" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a95a0]">Scope</p>
                    <p className="mt-1 text-sm font-bold text-[#38343f]">{estimate.size.name}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e7e3eb] bg-white p-3.5">
                    <Icon name="sparkles" className="h-4 w-4 text-[#39997b]" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a95a0]">Quality</p>
                    <p className="mt-1 text-sm font-bold text-[#38343f]">{estimate.quality.name}</p>
                  </div>
                </div>
                <p className="mt-5 flex items-center gap-1.5 text-[10px] font-medium text-[#9a95a0]">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  Pricing data updated September 2026
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[24px] border border-[#e7e4eb] bg-white p-5 shadow-[0_8px_30px_rgba(34,29,49,0.04)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold tracking-[-0.03em] text-[#292530]">Cost breakdown</h3>
                    <p className="mt-1 text-xs text-[#8a8590]">Transparent estimate by workstream</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0edff] text-[#6652ce]">
                    <Icon name="calculator" />
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {estimate.items.map((item) => {
                    const amount = item.quantity * item.rate;
                    const percentage = (amount / estimate.subtotal) * 100;
                    return (
                      <div key={item.name}>
                        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-[#3a3641]">{item.name}</p>
                            <p className="mt-0.5 text-[10px] text-[#96919b]">{percentage.toFixed(0)}% of work costs</p>
                          </div>
                          <p className="font-bold text-[#34303b]">{formatCurrency(amount, estimate.location)}</p>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#f0edf2]">
                          <div
                            className="h-full rounded-full bg-[#7560e5]"
                            style={{ width: `${Math.max(8, percentage)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 space-y-2.5 border-t border-[#ece9ef] pt-5 text-sm">
                  <div className="flex justify-between text-[#77727e]">
                    <span>Contingency (5%)</span>
                    <span className="font-semibold text-[#4c4853]">{formatCurrency(estimate.contingency, estimate.location)}</span>
                  </div>
                  <div className="flex justify-between text-[#77727e]">
                    <span>Taxes & fees ({(estimate.location.taxRate * 100).toFixed(estimate.location.taxRate * 100 % 1 ? 2 : 0)}%)</span>
                    <span className="font-semibold text-[#4c4853]">{formatCurrency(estimate.taxes, estimate.location)}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold text-[#2b2732]">
                    <span>Estimated total</span>
                    <span>{formatCurrency(estimate.total, estimate.location)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#e7e4eb] bg-white p-5 shadow-[0_8px_30px_rgba(34,29,49,0.04)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold tracking-[-0.03em] text-[#292530]">Suggested scope of work</h3>
                    <p className="mt-1 text-xs text-[#8a8590]">A practical starting point for your project</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f8f1] text-[#29926c]">
                    <Icon name="check" />
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  {scopeByCategory[estimate.category.id].map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#faf9fb] p-3.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-[10px] font-bold text-[#6a55d7] shadow-sm">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-sm font-medium leading-5 text-[#514c58]">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-[#f0dfbd] bg-[#fffaf0] p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#9a681c]">
                    <Icon name="shield" className="h-4 w-4" />
                    Key assumptions
                  </p>
                  <ul className="mt-3 space-y-2">
                    {assumptions.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs leading-5 text-[#746657]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c5913f]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-[22px] border border-[#e8e4ed] bg-[#f8f7fa] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#6a55d7] shadow-sm">
                  <Icon name="file-text" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#35313c]">Ready to send this to a client?</p>
                  <p className="mt-1 text-xs leading-5 text-[#7e7985]">Create an editable quotation, adjust line items and save it as a PDF.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openQuotation}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6754e7] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(103,84,231,0.2)] transition hover:bg-[#5946d3] print:hidden"
              >
                <Icon name="file-text" className="h-4 w-4" />
                Build quotation
              </button>
            </div>

            <p className="mt-5 text-center text-[11px] leading-5 text-[#96919c]">
              This result is a preliminary market estimate based on the information provided and available pricing data.
              It is not a legally binding quotation. Final prices may change after professional review and confirmation.
            </p>
          </div>
        </section>
      )}

      <section id="services" className="scroll-mt-16 bg-[#f8f8fb] py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b56d8]">Popular categories</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.045em] text-[#201d27] sm:text-4xl">
                Start with the project you have in mind.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#77727e]">
              Choose a category to prefill your project. You can change it at any time.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => chooseCategory(category.id)}
                className="group rounded-[20px] border border-[#e7e4eb] bg-white p-5 text-left shadow-[0_7px_25px_rgba(34,29,49,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#cec7ec] hover:shadow-[0_16px_36px_rgba(46,38,77,0.09)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f0edff] text-[#6551d3] transition group-hover:bg-[#6b56df] group-hover:text-white">
                    <Icon name={category.icon as IconName} />
                  </span>
                  <Icon name="arrow-right" className="h-4 w-4 text-[#b3aeba] transition group-hover:translate-x-0.5 group-hover:text-[#6a55d7]" />
                </div>
                <h3 className="mt-5 text-base font-bold tracking-[-0.025em] text-[#302c37]">{category.shortName}</h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-[#807b87]">{category.description}</p>
                <p className="mt-4 text-xs font-bold text-[#6a55d6]">Typical range {category.range}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-16 border-y border-[#e8e5ed] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b56d8]">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-[#201d27] sm:text-4xl">
              From an idea to a clear estimate in three steps.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#77727e] sm:text-base">
              No spreadsheets, phone calls or confusing price lists. Just a more informed way to plan.
            </p>
          </div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            <div className="process-line absolute left-[16%] right-[16%] top-7 hidden border-t border-dashed border-[#d9d3ee] md:block" />
            {[
              {
                icon: "sparkles" as IconName,
                number: "01",
                title: "Describe your project",
                text: "Write what you need in everyday language, or choose one of our service categories.",
              },
              {
                icon: "users" as IconName,
                number: "02",
                title: "Answer a few questions",
                text: "Confirm the project size, quality and location so the estimate can be more accurate.",
              },
              {
                icon: "file-text" as IconName,
                number: "03",
                title: "Get costs and a quote",
                text: "Review the full breakdown, scope and timeline, then create a client-ready quotation.",
              },
            ].map((step) => (
              <div key={step.number} className="relative rounded-[22px] border border-[#e8e5ed] bg-[#fbfafc] p-6 text-center">
                <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl border-4 border-white bg-[#eeeaff] text-[#6651d3] shadow-[0_8px_20px_rgba(83,67,169,0.12)]">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-[#918b9b]">STEP {step.number}</p>
                <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-[#302c37]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#7b7682]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-costcalc" className="scroll-mt-16 bg-[#f8f8fb] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b56d8]">More than a number</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.045em] text-[#201d27] sm:text-4xl">
              Understand the investment before you hire anyone.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#746f7b]">
              CostCalc turns a simple project description into a structured estimate that makes sense to customers,
              freelancers and small businesses.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("estimator")}
              className="group mt-7 flex items-center gap-2 rounded-xl bg-[#211e29] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#35313e]"
            >
              Create my free estimate
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "globe" as IconName,
                title: "Localized pricing",
                text: "Costs adapt to the selected country, city, currency and local market conditions.",
                color: "bg-[#eeeaff] text-[#6651d3]",
              },
              {
                icon: "calculator" as IconName,
                title: "Transparent numbers",
                text: "See labour, tools, contingency, taxes and every other included cost.",
                color: "bg-[#e8f8f1] text-[#258764]",
              },
              {
                icon: "file-text" as IconName,
                title: "Ready-to-send quotes",
                text: "Edit line items and turn your estimate into a professional PDF quotation.",
                color: "bg-[#fff3df] text-[#a86b18]",
              },
              {
                icon: "shield" as IconName,
                title: "Confidence included",
                text: "Know how complete the input is and where professional review may still be needed.",
                color: "bg-[#eaf2ff] text-[#376bb4]",
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-[22px] border border-[#e7e4eb] bg-white p-5 sm:p-6">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${feature.color}`}>
                  <Icon name={feature.icon} />
                </span>
                <h3 className="mt-5 text-base font-bold text-[#312d38]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#7d7884]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-7 sm:pb-28">
        <div className="cta-surface relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#211e29] px-6 py-14 text-center text-white shadow-[0_24px_60px_rgba(31,27,40,0.18)] sm:px-10 sm:py-16">
          <div className="cta-orb cta-orb-one" />
          <div className="cta-orb cta-orb-two" />
          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[#c4b7ff] ring-1 ring-white/10">
              <Icon name="sparkles" />
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Your next project starts with a number.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#bcb6c5] sm:text-base">
              Get a clear localized estimate and see what it takes to bring your project to life.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("estimator")}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#292430] shadow-lg transition hover:bg-[#f3f0ff]"
            >
              Start my free estimate
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e8e5ed] bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-7 sm:py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <Brand />
              <p className="mt-4 text-sm leading-6 text-[#7f7a86]">
                Clear, localized project estimates for anyone planning digital work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm sm:grid-cols-3 sm:gap-x-20">
              <a href="#services" className="text-[#6d6874] transition hover:text-[#312d38]">Services</a>
              <a href="#how-it-works" className="text-[#6d6874] transition hover:text-[#312d38]">How it works</a>
              <a href="#why-costcalc" className="text-[#6d6874] transition hover:text-[#312d38]">Why CostCalc</a>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-[#eeebf0] pt-6 text-xs text-[#96919c] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 CostCalc. All rights reserved.</p>
            <p>Preliminary estimates only. Final pricing may require professional confirmation.</p>
          </div>
        </div>
      </footer>

      {quoteOpen && estimate && (
        <QuoteModal
          estimate={estimate}
          items={quoteItems}
          onChange={setQuoteItems}
          onClose={() => setQuoteOpen(false)}
          notify={notify}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#211e29] px-4 py-3 text-sm font-semibold text-white shadow-2xl" role="status">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#4fc69b] text-[#153f31]">
            <Icon name="check" className="h-3 w-3" />
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}
