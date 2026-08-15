/* =============================================================
   ANTRA-WEB — CENTRAL CONFIGURATION
   Edit everything here. Nothing else in the codebase should
   contain hardcoded brand/contact/pricing/portfolio values.
   ============================================================= */

const ANTRA_CONFIG = {

  brand: {
    name: "Antra-Web",
    tagline: "Turning Business Ideas Into Digital Experiences.",
    supportingLine: "Modern websites, thoughtful design, and digital presence built around your business.",
    year: 2026
  },

  contact: {
    email: "antra.web.design@gmail.com",
    // Digits only, with country code, no spaces/symbols — used to build the WhatsApp link.
    // NOTE: replace 91 below with your real country code if 6204693928 is not an Indian number.
    whatsappNumber: "916204693928",
    whatsappDisplay: "+91 62046 93928",
    instagramHandle: "antra_web",
    instagramUrl: "https://instagram.com/antra_web",
    facebookName: "Antra Web",
    facebookUrl: "https://www.facebook.com/profile.php?id=61591988702111"
  },

  // ---- FORM ENDPOINT -----------------------------------------
  // This site ships with NO backend wired up on purpose — wire up
  // one of the following and paste the endpoint below:
  //   Formspree:  https://formspree.io/f/XXXXXXX
  //   Web3Forms:  https://api.web3forms.com/submit (needs access_key)
  //   EmailJS:    use their SDK instead of fetch (see js/script.js comment)
  // Until this is set, the form will show a clear "not configured" message
  // instead of pretending to send anything.
  form: {
    endpoint: "", // <-- PASTE YOUR FORMSPREE / WEB3FORMS ENDPOINT HERE
    web3formsAccessKey: "" // <-- only needed if using Web3Forms
  },

  packages: [
    {
      id: "starter",
      name: "Starter",
      price: 250,
      tagline: "Fast • Simple • Effective",
      bestFor: "Startups, small businesses, landing pages and businesses that need a focused online presence.",
      features: [
        "1–3 page website",
        "Responsive design",
        "Contact form",
        "Basic animations",
        "Custom business branding direction",
        "Content layout assistance",
        "Up to 2 revisions"
      ],
      popular: false
    },
    {
      id: "business",
      name: "Business",
      price: 450,
      tagline: "Professional • Engaging • Reliable",
      bestFor: "Growing businesses that need a stronger and more complete website.",
      features: [
        "Up to 5 pages",
        "Responsive & modern design",
        "Smooth animations",
        "Custom visual branding support",
        "Basic SEO setup",
        "Contact forms & integrations",
        "Content layout assistance",
        "Up to 3–5 revisions"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: 750,
      tagline: "Advanced • Powerful • Scalable",
      bestFor: "Businesses with advanced requirements and a more customized experience.",
      features: [
        "Up to 10 pages",
        "Advanced design & development",
        "Premium animations",
        "Custom branding support",
        "SEO setup & optimization",
        "Advanced integrations",
        "Content layout assistance",
        "Up to 5 revisions"
      ],
      popular: false
    }
  ],

  affordablePackage: {
    name: "Simple / One-Page",
    startingAt: 150,
    description: "Not every business needs a huge website. If you need a focused landing page or affordable one-page website, I can create a clean and professional solution around your needs."
  },

  // "image" points at a screenshot you can drop into assets/portfolio/.
  // Until a file exists at that path, the site automatically falls back
  // to a clean, category-styled preview card — nothing ever looks broken.
  // "featured" marks the 6 projects shown on the homepage.
  portfolio: [
    { id:"restaurant", title:"Restaurant", category:"Food & Beverage", description:"Modern restaurant website concept.", tags:["Responsive","Menu Layout","Reservations UI"], url:"https://kumariantra901-glitch.github.io/Restaurant/", image:"assets/portfolio/restaurant.webp", featured:true },
    { id:"field-fold", title:"Field-Fold", category:"Business", description:"Professional business website concept.", tags:["Corporate","Multi-page"], url:"https://kumariantra901-glitch.github.io/Field-Fold/", image:"assets/portfolio/field-fold.webp", featured:true },
    { id:"gym-coach", title:"Gym Coach", category:"Fitness", description:"Personal coaching / fitness website concept.", tags:["Coaching","Booking UI"], url:"https://kumariantra901-glitch.github.io/Gym-Coach/", image:"assets/portfolio/gym-coach.webp", featured:true },
    { id:"custom-drinks", title:"Custom Drinks", category:"Food & Beverage", description:"Custom drinks business website concept.", tags:["E-commerce Style","Product Grid"], url:"https://kumariantra901-glitch.github.io/Custom-Drinks/", image:"assets/portfolio/custom-drinks.webp" },
    { id:"custom-cakes", title:"Custom Cakes", category:"Food & Beverage", description:"Custom cake business website concept.", tags:["Gallery","Order Form"], url:"https://kumariantra901-glitch.github.io/Custom-Cakes/", image:"assets/portfolio/custom-cakes.webp" },
    { id:"pest-control", title:"Pest Control", category:"Home Services", description:"Service-based pest control website concept.", tags:["Local Service","Lead Form"], url:"https://kumariantra901-glitch.github.io/Pest-Control/", image:"assets/portfolio/pest-control.webp", featured:true },
    { id:"custom-treats", title:"Custom Treats", category:"Food & Beverage", description:"Custom treats business website concept.", tags:["Product Grid","Gallery"], url:"https://kumariantra901-glitch.github.io/Custom-Treats/", image:"assets/portfolio/custom-treats.webp" },
    { id:"plumbing-service", title:"Plumbing Service", category:"Home Services", description:"Professional plumbing service website concept.", tags:["Local Service","Quote Form"], url:"https://kumariantra901-glitch.github.io/Plumbing-Service/", image:"assets/portfolio/plumbing.webp" },
    { id:"interior-designing", title:"Interior Designing", category:"Creative", description:"Interior design portfolio website concept.", tags:["Portfolio Grid","Editorial"], url:"https://kumariantra901-glitch.github.io/Interior-Designing/", image:"assets/portfolio/interior.webp", featured:true },
    { id:"salon", title:"Salon", category:"Beauty", description:"Modern salon website concept.", tags:["Booking UI","Services List"], url:"https://kumariantra901-glitch.github.io/salon/", image:"assets/portfolio/salon.webp" },
    { id:"luxury-salon", title:"Luxury Salon", category:"Beauty", description:"Premium salon website concept.", tags:["Premium Styling","Booking UI"], url:"https://kumariantra901-glitch.github.io/Luxury-Salon/", image:"assets/portfolio/luxury-salon.webp", featured:true },
    { id:"cleaning-services", title:"Cleaning Services", category:"Home Services", description:"Professional cleaning service website concept.", tags:["Local Service","Quote Form"], url:"https://kumariantra901-glitch.github.io/cleaning-services/", image:"assets/portfolio/cleaning.webp" },
    { id:"gym", title:"Gym", category:"Fitness", description:"Gym business website concept.", tags:["Membership","Schedule UI"], url:"https://kumariantra901-glitch.github.io/gym/", image:"assets/portfolio/gym.webp" },
    { id:"bakery", title:"Bakery", category:"Food & Beverage", description:"Bakery website concept.", tags:["Product Grid","Warm Branding"], url:"https://kumariantra901-glitch.github.io/bakery/", image:"assets/portfolio/bakery.webp" },
    { id:"dentist", title:"Dentist", category:"Professional Services", description:"Modern dental practice website concept.", tags:["Appointments","Trust-Focused"], url:"https://kumariantra901-glitch.github.io/Dentist/", image:"assets/portfolio/dentist.webp" },
    { id:"cozy-cafe", title:"Cozy Cafe", category:"Food & Beverage", description:"Cozy cafe website concept.", tags:["Menu Layout","Warm Branding"], url:"https://kumariantra901-glitch.github.io/Cozy-Cafe/", image:"assets/portfolio/cozy-cafe.webp" },
    { id:"one-site-cake", title:"One-Site Cake", category:"Food & Beverage", description:"Focused single-page custom cake business website concept.", tags:["One-Page","Order Form"], url:"https://kumariantra901-glitch.github.io/One-Site-cake/", image:"assets/portfolio/one-site-cake.webp" }
  ],

  portfolioFilters: ["All","Business","Food & Beverage","Fitness","Beauty","Home Services","Creative","Professional Services"]
};
