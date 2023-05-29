const config = {
  BASE: {
    COMPANY_NAME: "My Company Name",
    META_TITLE_DEFAULT: "My Company Name - Just a Generic Company",
    META_DESCRIPTION:
      "My Company Name provides generic services to generic customers.",
    OPENGRAPH_TITLE: "My Company Name",
    OPENGRAPH_IMAGE_ALT_TEXT: "My Company Name Homepage Screenshot",
  },
  HOME: {
    TEXT: {
      H1: "Coming Soon!",
      DESCRIPTION:
        "This site is under construction. Please return at a later date.",
    },
    LINKS: {},
    IMAGES: {},
  },
  BLOG: {
    TEXT: {
      H1: "Our Blog",
      DESCRIPTION:
        "We write about our company's direction and thoughts going on our mind.",
    },
    LINKS: {},
    IMAGES: {},
  },
  CONTACT: {
    TEXT: {
      DESCRIPTION: "Get in touch.",
      PARAGRAPH:
        "Have something to say? We are here to help. Fill out the form, send an email, or call us on the phone.",
      ADDRESS: "123 Example Street; My Place, NY 00000",
    },
    LINKS: {
      EMAIL: {
        href: "me@example.com",
        content: "me@example.com",
      },
      PHONE: {
        href: "+12015555555",
        content: "+1 (201) 555-5555",
      },
    },
    IMAGES: {},
  },
  FOOTER: {
    TEXT: {
      COMPANY_NAME: "My Company Name, LLC",
    },
    LINKS: {},
    IMAGES: {},
  }
};
export const BASE = config.BASE;
export const HOME = config.HOME;
export const BLOG = config.BLOG;
export const CONTACT = config.CONTACT;
export const FOOTER = config.FOOTER;
