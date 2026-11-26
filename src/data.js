import sprintova from './images/sprintova-kicks.webp'
import serenova from './images/serenova-spa.webp'
import electronicsHub from './images/electronics-hub.webp'
import kajana from './images/kajana.webp'
import electrotech from './images/electrotech.webp'
import svcEcommerce from './images/service-ecommerce.svg'
import svcThemes from './images/service-themes.svg'
import svcInstall from './images/service-install.svg'
import svcCustomize from './images/service-customize.svg'
import workSetup from './images/work-setup.svg'
import workDesign from './images/work-design.svg'
import workSupport from './images/work-support.svg'

// Company details ellam inga mattum maathunga.
export const me = {
  name: 'Creonixs',
  headline: ['Stores built', 'to sell online.'],
  intro: 'Creonixs creates ecommerce websites and Shopify themes, and helps you with installation, customization and bug fixes.',
  email: 'support@creonixs.in',
  location: 'Tamil Nadu, India',
  hours: 'Mon–Sat, 10am–6pm IST',
  reply: 'Replies within 24 hours',
  available: true,
  // '#' irukka edathula unga social page links podunga
  socials: [
    { label: 'Instagram', url: '#' },
    { label: 'Facebook', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'YouTube', url: '#' },
  ],
}

// Navbar and footer menu. '#/portfolio' thani page, matha links home page sections.
export const menu = [
  { label: 'Portfolio', url: '#/portfolio' },
  { label: 'Help', url: '#help' },
  { label: 'Docs', url: '#/docs' },
  { label: 'FAQ', url: '#faq' },
]

// Docs page la irukka theme documentation. Pudhu theme na inga oru line add pannunga.
export const docs = [
  { title: 'Sprintova Docs', text: 'Setup, collection banners, mega menu, low-stock bar and everything else for the Sprintova sneaker theme.', tags: ['Shopify', 'Liquid'], url: 'https://kanhathemes.gitbook.io/sprintova-docs', image: sprintova },
  { title: 'Electronics Hub Docs', text: 'Install, demo import, product showcase and customization guides for the Electronics Hub theme.', tags: ['Shopify', 'Liquid'], url: 'https://kanhathemes.gitbook.io/electronics-hub-docs', image: electronicsHub },
]

// Home page la irukka 3 work cards
export const workCards = [
  { title: 'Store setup and installation', text: 'We install your theme and set up the pages, sections and collections your store needs.', image: workSetup, kind: 'sections', color: '#ffe4d9' },
  { title: 'Store design and customization', text: 'We match colours, fonts and layouts to your brand, so your store looks like your own.', image: workDesign, kind: 'style', color: '#e9e5fb' },
  { title: 'Theme support and bug fixes', text: 'Send your store link with screenshots. We check the issue and reply within 24 hours.', image: workSupport, kind: 'support', color: '#d8f0e0' },
]

export const skills = ['Shopify', 'Liquid', 'Ecommerce', 'Theme setup', 'Customization', 'React', 'JavaScript', 'Figma']

export const services = [
  { title: 'Ecommerce websites', text: 'Online store creation', hue: 225, image: svcEcommerce },
  { title: 'Shopify themes', text: 'Theme development', hue: 320, image: svcThemes },
  { title: 'Theme installation', text: 'Setup on your store', hue: 265, image: svcInstall },
  { title: 'Customization', text: 'Design changes and bug fixes', hue: 195, image: svcCustomize },
]

// Recent works. Images src/images/ folder la irukku (mela import aagudhu).
export const projects = [
  { title: 'Sprintova Kicks', text: 'A sneaker store with a bold hero banner, collections, new releases and best sellers.', tags: 'Footwear store', url: 'https://sprintova-kicks.myshopify.com/', image: sprintova },
  { title: 'Serenova Spa', text: 'A day spa website with a calm design, a treatment booking button and a spa menu.', tags: 'Day spa website', url: 'https://serenova-spa.myshopify.com/', image: serenova },
  { title: 'Electronics Hub', text: 'A gadget store for phones and laptops, with new arrivals and collections.', tags: 'Electronics store', url: 'https://electronics-hub-mart.myshopify.com/', image: electronicsHub },
  { title: 'Kajana', text: 'A jewellery store with an elegant layout that puts handcrafted pieces first.', tags: 'Jewellery store', url: 'https://kk-kajana.myshopify.com/', image: kajana },
  { title: 'Electrotech', text: 'An electronics store with category collections, a blog and a clean product layout.', tags: 'Electronics store', url: 'https://kk-electrotech.myshopify.com/', image: electrotech },
]

// Contact form la irukka Topic dropdown
export const topics = ['Ecommerce Website Creation', 'Shopify Theme Development', 'Installation', 'Customization', 'Bug report', 'Other']

// EmailJS (form message email ku)
export const emailjs = {
  publicKey: 'E1Q06BD95KVGOIAIZ',
  serviceId: 'service_genichi',
  templateId: 'template_0jp1o9k',
}

// Cloudinary (file auto upload). cloudName / preset empty na upload box maraiyum.
export const upload = {
  cloudName: 'glkwvzgi',
  preset: 'portfolio_upload',
  maxFiles: 5,
  maxImageMB: 10,
  maxVideoMB: 100,
}

export const faqs = [
  ['How do I contact Creonixs?', 'Fill the contact form on this page, or mail us at support@creonixs.in.'],
  ['What should I include in my theme support request?', 'Your store link, the theme topic and a short description of the problem. Screenshots or a screen recording help us check quickly.'],
  ['How do I send screenshots or videos?', 'Use Choose Files in the contact form. You can add up to 5 files: images up to 10MB and videos up to 100MB each.'],
  ['When will I get a reply?', 'We reply within 24 hours. Our support hours are Monday to Saturday, 10am to 6pm IST.'],
  ['Can you install or customize my theme?', 'Yes. Choose Installation or Customization as the topic and tell us what you need.'],
  ['How do I report a theme bug?', 'Choose Bug report as the topic, share your store link and the steps that show the problem.'],
]
