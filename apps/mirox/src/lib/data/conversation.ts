type HexyGuide = {
  text: string;
  images: string[];
  trigger: {
    action: () => void;
    label: string;
  } | null;
}[];

export const HEXY_GUIDE: HexyGuide = [
  {
    text: "Hello there! I'm Hexy, your friendly guide to Mirox Forest!",
    images: ['/images/hexy.png'],
    trigger: null,
  },
  {
    text:
      "Let me tell you about Mirox Forest. It's an amazing virtual ecosystem inhabited by AI-based foxes!",
    images: ['/images/hexy.png', '/images/miroxFamily.png'],
    trigger: null,
  },
  {
    text:
      "Mirox Forest simulates the natural processes and systems that occur in a real forest, providing a unique and immersive experience for users.",
    images: ['/images/hexy.png', '/images/miroxFamily.png'],
    trigger: null,
  },
  {
    text:
      "The AI-based foxes in Mirox Forest are highly advanced and are constantly developing themselves.",
    images: ['/images/hexy.png', '/images/miroxFamily.png'],
    trigger: null,
  },
  {
    text:
      "We're sorry to say that Mirox Forest recently faced some financial difficulties, but we're not giving up! We are seeking donations to help us continue developing and growing the platform.",
    images: ['/images/hexy.png', '/images/donation.png'],
    trigger: null,
  },
  {
    text:
      "By donating, not only will you be helping us, but you'll also get an Xpass to enter our amazing world and explore all it has to offer!",
    images: ['/images/hexy.png', '/images/xpass.png'],
    trigger: null,
  },
  {
    text:
      "Thank you for your interest in Mirox Forest. We hope to see you soon!",
    images: ['/images/hexy.png', '/images/miroxFamily.png'],
    trigger: null,
  },
];
