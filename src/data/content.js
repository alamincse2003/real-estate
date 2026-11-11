// All editable site copy lives here. Swap text / images to rebrand.
export const SECTION_ASSETS = '/assets/sections'

export const brand = {
  name: 'Nidus',
  suffix: 'Estate',
  cta: { label: 'Book a Visit', href: '#footer' },
}

export const navLinks = [
  { label: 'Buy', href: '#search' },
  { label: 'Rent', href: '#services' },
  { label: 'Sell', href: '#services' },
  { label: 'Agents', href: '#agents' },
  { label: 'Journal', href: '#resources' },
]

export const testimonials = [
  {
    quote:
      '"Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. He\'s a workaholic so he was available morning, noon and night. Tireless and dedicated. Would recommend him 100%!"',
    author: 'Bernadette Hogan',
  },
  {
    quote:
      '"Shirin was truly a blessing to work with. She helped us find our perfect condo in a great area. She was patient and very understanding. I would recommend working with her if you need someone who will go out of their way to help you find the home of your dreams."',
    author: 'Tyleen',
  },
  {
    quote:
      '"Working with Mathew was an absolute pleasure. His problem-solving skills stood out from the start, and he made the entire process clear for a first-time buyer. We are truly happy in our new home!"',
    author: 'Johanna Nieto',
  },
  {
    quote:
      '"Shirin was an invaluable resource and guide through the home-buying process. She immediately understood what we wanted and moved every stage forward with a steady, reassuring hand."',
    author: 'mattmpowers',
  },
  {
    quote:
      '"After 12 years in NYC, I had my best broker experience by far with Fay Blau. She found a beautiful Upper West Side apartment that fit my needs like a glove and communicated brilliantly throughout."',
    author: 'Giavridis Theodore',
  },
]

export const steps = [
  ['Talk to a Real Human.', 'We match you with an expert who actually listens.'],
  ['Get Clarity.', 'We define what you really need, not just what’s available.'],
  ['Move Forward.', 'We find what fits — and make it happen.'],
]

export const services = [
  {
    number: '1',
    label: 'Buy',
    image: 'service-buy.jpg',
    copy: 'Buy smarter with expert agents backed by mortgage, legal, and appraisal pros—dialed in to get you the best deal, fast. We’ve done this over 10,000 times, and we know what wins.',
  },
  {
    number: '2',
    label: 'Sell',
    image: 'service-sell.jpg',
    copy: 'Sell fast, sell high. Your listing gets pro staging, strategic pricing, constant open houses, and agents who never stop working until the right buyer signs.',
  },
  {
    number: '3',
    label: 'Rent',
    image: 'service-rent.jpg',
    copy: 'Access hidden rentals before they hit the market through agents who know every landlord in town. With decades of NYC experience, we unlock the best deals you won’t find online.',
  },
]

export const features = [
  {
    title: 'Mortgage Services',
    copy: 'Helping you secure your dream home with flexible mortgage options.',
    image: 'feature-mortgage.jpg',
  },
  {
    title: 'Property Management',
    copy: 'Let us handle the details so you can enjoy the rewards.',
    image: 'feature-management.jpg',
  },
  {
    title: 'Construction and Real Estate Development',
    copy: 'Guiding you through the intricacies of building and developing properties with expert insight and support.',
    image: 'feature-development.jpg',
  },
]

export const posts = [
  {
    date: '2026-10-20',
    title: 'Home Staging 101: Small Changes That Help Your Home Sell Faster',
    copy: 'Light, layout and a little decluttering — simple ways to make buyers feel at home from the very first viewing.',
    image: 'blog-staging.jpg',
  },
  {
    date: '2026-04-13',
    title: 'Q1 2026 NYC Market Report',
    copy: 'Q1 2026 saw strong rental demand, active sales, and shifting pricing across NYC. Here’s what it means heading into the spring market.',
    image: 'blog-nyc.png',
  },
  {
    date: '2026-04-01',
    title: 'Philly Real Estate: A Winter Chill or a Spring Opportunity?',
    copy: 'Record-low listings and steady price growth define a unique February for the Philadelphia Metro.',
    image: 'blog-philly.jpg',
  },
]

// TODO: replace these placeholders with your real office details.
export const contact = {
  addressLines: ['Your office address', 'City, Country'],
  email: 'hello@yourdomain.com',
  phone: '+880 1XXX-XXXXXX',
  phoneHref: 'tel:+8801000000000',
  hours: 'Sat – Thu, 10am – 7pm',
}

export const footer = {
  headline: ['Let’s find your', 'next address.'],
  tagline: 'Homes, rentals and investments, guided by people who know every street.',
  newsletter: {
    title: 'Market notes, monthly',
    copy: 'New listings, price trends and buying tips. No spam, unsubscribe any time.',
  },
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Buy a Home', href: '#search' },
        { label: 'Rent a Place', href: '#services' },
        { label: 'Sell Your Property', href: '#services' },
        { label: 'Find an Agent', href: '#agents' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#why-find' },
        { label: 'Careers', href: '#agents' },
        { label: 'Journal', href: '#resources' },
        { label: 'Contact', href: '#footer' },
      ],
    },
  ],
  // Replace "#" with your real profile URLs.
  socials: [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'YouTube', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
}
