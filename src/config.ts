const SIGN_IN_LINK = "https://bridge.springmicro.com/sign-in";
const REGISTER_LINK = "https://bridge.springmicro.com/onboarding/register";

export const NAVBAR = {
  TEXT: {},
  LINKS: {
    LOG_IN: {
      href: SIGN_IN_LINK,
      text: "Log in",
    },
    SIGN_UP: {
      href: REGISTER_LINK,
      text: "Sign up",
    },
  },
  IMAGES: {},
};

export const HERO = {
  TEXT: {
    H1: "Simple web hosting for your business",
    DESCRIPTION:
      "At SpringMicroHost, we'll worry about your website so you can worry about your business. Pick a template, insert your content, and leave the rest to us. Our customer service representatives are ready to help.",
  },
  LINKS: {
    ACTION: {
      href: REGISTER_LINK,
      text: "Get Started",
    },
  },
  IMAGES: {},
};

export const CTA = {
  TEXT: {
    H2: "Build modern websites.",
    DESCRIPTION:
      "Take your online presence to the next level by using our hosting platform.",
  },
  LINKS: {
    ACTION: {
      href: REGISTER_LINK,
      text: "Get Started",
    },
  },
  IMAGES: {},
};

export const BLOG = {
  TEXT: {
    H1: "Our Blog",
    DESCRIPTION:
      "We write about our company's direction and thoughts going on our mind.",
  },
  LINKS: {},
  IMAGES: {},
};

export const FEATURES = [
  {
    title: "Bring Your Old Stuff",
    description:
      "Website transferring should be easy. Move old files to us and we will help get them up and running on our platform.",
    icon: "bx:bxs-briefcase",
  },
  {
    title: "2x Faster Load Times",
    description:
      "SpringMicroHost leverages modern site building technologies that eliminate bloat and result in blazing-fast load times.",
    icon: "bx:bxs-timer",
  },
  {
    title: "Easy Content Editing",
    description:
      "Manage your content with our simple editor and live preview features. Support is available for complex needs.",
    icon: "bx:bxs-edit",
  },
  {
    title: "Supplementary Services",
    description:
      "SpringMicroHost is rolling out services like forms, blog, and eCommerce. Be among the first to try them at a discount.",
    icon: "bx:bxs-grid",
  },
  {
    title: "SEO Enabled",
    description:
      "Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!",
    icon: "bx:bxs-file-find",
  },
  {
    title: "Support",
    description:
      "Get help from actual customer service representatives. They will communicate with you one-on-one to meet your needs.",
    icon: "bx:bxs-user",
  },
];

export const PRICING = [
  {
    name: "Personal",
    price: "$3.00/mo",
    popular: false,
    description: "All the basics for starting a single small website.",
    features: [
      "Single Website",
      "Starter Instances",
      "SSL Certificate",
      "Email Support",
      "Template Customizations",
    ],
    action: {
      href: REGISTER_LINK,
      text: "Get Started",
    },
  },
  {
    name: "Pro",
    price: "$4.17/mo",
    popular: true,
    description: "All the basics for starting/hosting up to 3 websites.",
    features: [
      "Everything in Personal",
      "Multiple Websites",
      "SSL Certificates",
      "Personal Manager",
      "Backups",
    ],
    action: {
      href: REGISTER_LINK,
      text: "Get Started",
    },
  },
  {
    name: "Enterprise",
    price: "Get a Quote",
    popular: false,
    description: "For custom web development needs.",
    features: [
      "Large Instances",
      "SSL Certificates",
      "Email and Phone Support",
      "Personal Manager",
      "Backups",
      "Custom Web Development",
    ],
    action: {
      href: "/contact",
      text: "Contact Us",
    },
  },
];
