/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Cake, 
  Heart, 
  Star, 
  MessageCircle, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Flavor {
  name: string;
}

interface Testimonial {
  name: string;
  category: string;
  stars: number;
  text: string;
}

interface GalleryImage {
  url: string;
  category: string;
  id: number;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'Treats' | 'Boxes' | 'Classic';
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: 'cupcakes-6', category: 'Boxes', title: 'Box of 6 Cupcakes', description: 'Classic swirl cupcakes in your choice of flavour.', price: 15, image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=400&auto=format&fit=crop' },
  { id: 'cupcakes-12', category: 'Boxes', title: 'Box of 12 Cupcakes', description: 'Perfect for sharing. Mixed or single flavour.', price: 28, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400&auto=format&fit=crop' },
  { id: 'brownies', category: 'Treats', title: 'Luxury Brownie Slab', description: 'Rich, fudgy brownie cut into 8 generous squares.', price: 18, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&auto=format&fit=crop' },
  { id: 'blondies', category: 'Treats', title: 'Biscoff Blondies', description: 'White chocolate & Biscoff heaven in every bite.', price: 18, image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=400&auto=format&fit=crop' },
];

const BESPOKE_TYPES = [
  { id: 'birthday', title: 'Celebration Cakes', price: 'From £45', icon: <Cake className="w-full h-full" /> },
  { id: 'wedding', title: 'Wedding Cakes', price: 'From £250', icon: <Heart className="w-full h-full" /> },
  { id: 'baby', title: 'Baby & Reveal', price: 'From £55', icon: <Sparkles className="w-full h-full" /> },
];

const FLAVORS: Flavor[] = [
  { name: 'Vanilla Sponge' }, { name: 'Chocolate Fudge' }, { name: 'Lemon Drizzle' },
  { name: 'Salted Caramel' }, { name: 'Red Velvet' }, { name: 'Biscoff' },
  { name: 'Funfetti' }, { name: 'Oreo' }, { name: 'Strawberries & Cream' },
  { name: 'Raspberry Ripple' }, { name: 'Coffee & Walnut' }, { name: 'Victoria Sponge' },
  { name: 'Chocolate Orange' }, { name: 'Carrot Cake' }, { name: 'Pistachio & Rose' }
];

const WHY_CHOOSE_LOU = [
  { title: 'Completely Bespoke Designs', description: 'Every cake is unique — designed around your vision and style.', icon: <Sparkles className="text-rose" /> },
  { title: 'Made Fresh to Order', description: 'Using only quality ingredients — no preservatives, no shortcuts.', icon: <CheckCircle2 className="text-rose" /> },
  { title: 'Personal Service', description: 'Direct communication with Lou from first enquiry to collection.', icon: <Heart className="text-rose" /> },
  { title: 'Trusted by Hundreds', description: 'Tried, tested, and loved by families across the local area.', icon: <Star className="text-rose" /> }
];

const STEPS = [
  { number: '1', title: 'Get in Touch', text: 'Message Lou via Facebook or the enquiry form below.' },
  { number: '2', title: 'Share Your Vision', text: 'Tell Lou about your occasion, flavours, theme, and budget.' },
  { number: '3', title: 'Get a Quote', text: 'Lou will send a personalised quote, usually within 24 hours.' },
  { number: '4', title: 'Collection Day', text: 'Collect your stunning cake and enjoy the wow reaction!' }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah M.',
    category: 'Birthday Cake',
    stars: 5,
    text: "Lou made my daughter's 5th birthday cake and it was absolutely breathtaking. She nailed the theme perfectly and it tasted even better than it looked. Will definitely order again!"
  },
  {
    name: 'James & Emily',
    category: 'Wedding Cake',
    stars: 5,
    text: "Our wedding cake was the talk of the night. Lou was so easy to work with, understood exactly what we wanted, and delivered something beyond our expectations."
  },
  {
    name: 'Karen T.',
    category: 'Corporate Order',
    stars: 5,
    text: "Ordered a branded cake for our office launch. Everyone was wowed! The edible logo was perfect and it tasted incredible. Highly recommend CakeLoulicious!"
  }
];

const GALLERY: GalleryImage[] = [
  { id: 1, category: 'Gender Reveal', url: 'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/678315516_802606492923588_5785070211621533655_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHeEwKpJGBcxHkVkVnwxl-uy4ehbo94awrLh6Fuj3hrCtO6Fz1FfFAEeiosP4p-nilCLSv7vizo_UnlddSvQuT8&_nc_ohc=mSimrTAiC_0Q7kNvwHJrHYz&_nc_oc=AdqoL7ADjloRoY13XPda1KJtwiNx6rYg3HcqpB0cgVAXWOugLQg2vkqjhHIMHK3qMuM&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=kyvbtl6TroNHe1xYp0CEZg&_nc_ss=7b2a8&oh=00_Af6-_swxlyGslohkWAFQy9qobjV231g1qNwIDFtwgVUZpg&oe=6A0F84A9' },
  { id: 2, category: 'Birthday', url: 'https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/651011805_771244599393111_1808088787487742730_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHFCQoEWPzE1gI3UTxsi3R_iTk5wUiw5YyJOTnBSLDljMEp586SLS4Xu_VzRHuxIHxwsJSLDc7WeOlu8ZlPcHYW&_nc_ohc=x0K5RIR0-NsQ7kNvwEzDetB&_nc_oc=Ado_BO20tHPtHlz6SF8isFbZF9gOAyg82f_pfqiBhKrSxeuTCxarm8p5B4aJPqdFmZg&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=VtnDvP9EV0T4f7RFFxXo1w&_nc_ss=7b2a8&oh=00_Af4BzYP5fOJOBZqmr8D1iJGwmcdfaydIoBkb3nTPFb0dug&oe=6A0F71EB' },
  { id: 3, category: 'Floral', url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, category: 'Drip', url: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, category: 'Cupcakes', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, category: 'Birthday', url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, category: 'Floral', url: 'https://images.unsplash.com/photo-1519340333755-56e9c0d04579?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, category: 'Wedding', url: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop' },
  { id: 9, category: 'Celebration', url: 'https://images.unsplash.com/photo-1510103212845-667793d59646?q=80&w=1200&auto=format&fit=crop' },
  { id: 10, category: 'Drip', url: 'https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?q=80&w=1200&auto=format&fit=crop' },
  { id: 11, category: 'Floral', url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1200&auto=format&fit=crop' },
  { id: 12, category: 'Cupcakes', url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1200&auto=format&fit=crop' }
];

// --- Components ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Custom Enquiry State
  const [enquiryState, setEnquiryState] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: 'Birthday',
    size: '10',
    date: '',
    theme: '',
    flavour: 'Vanilla Sponge',
    budget: '£50-£100',
    dietary: '',
  });

  // Menu Order State
  const [orderState, setOrderState] = useState({
    name: '',
    phone: '',
    date: '',
    deliveryType: 'Collection',
    address: ''
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEnquiryState(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderState(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bespoke Enquiry Sent! Lou will review your design ideas and get back to you soon.');
    console.log('Enquiry:', enquiryState);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order Received! Lou will contact you for payment and collection details.');
    setCart([]);
    setIsCheckoutOpen(false);
    console.log('Order:', orderState, cart);
  };

  return (
    <div className="min-h-screen selection:bg-rose/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl md:text-3xl font-display text-chocolate flex items-center gap-2">
            <Cake className="w-8 h-8 text-rose" />
            CakeLoulicious
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#menu" className="hover:text-rose transition-colors">Treat Menu</a>
            <a href="#bespoke" className="hover:text-rose transition-colors">Bespoke Cakes</a>
            <a href="#gallery" className="hover:text-rose transition-colors">Gallery</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-chocolate hover:text-rose transition-colors"
            >
              <motion.div
                key={cartCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Heart className={`w-6 h-6 ${cartCount > 0 ? 'fill-rose text-rose' : ''}`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                {cartCount > 0 && <span className="font-bold text-rose">£{cartTotal}</span>}
              </motion.div>
            </button>
            <a href="#order" className="bg-rose text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-rose/20 transition-all font-bold">Order Now</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-chocolate">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-rose/10 shadow-xl p-6 flex flex-col gap-4 text-center font-medium"
            >
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Treat Menu</a>
              <a href="#bespoke" onClick={() => setIsMenuOpen(false)}>Bespoke Cakes</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#order" onClick={() => setIsMenuOpen(false)} className="bg-rose text-white py-3 rounded-full">Order Now</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blush via-cream to-cream opacity-80" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pollen.png")' }} />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose/10 text-rose text-sm font-bold tracking-widest uppercase mb-6">
              Bespoke Artisan Bakery
            </span>
            <h1 className="text-7xl md:text-9xl mb-6 text-chocolate drop-shadow-sm">
              CakeLoulicious
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-chocolate/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Bespoke Celebration Cakes<br className="hidden md:block" /> Handcrafted with Love
            </p>
            <p className="text-lg mb-10 flex items-center justify-center gap-2 text-chocolate/70">
              <span className="w-8 h-px bg-rose/30" />
              Hi, I'm Lou — and I pour my heart into every single cake I make.
              <span className="w-8 h-px bg-rose/30" />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#order" className="bg-rose text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-rose/20 hover:-translate-y-1 transition-all">
                Order Your Cake
              </a>
              <a href="#gallery" className="border-2 border-rose text-rose px-10 py-4 rounded-full text-lg font-bold hover:bg-rose/5 transition-all">
                See My Creations
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Floating Shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-gold/20 hidden lg:block"
        >
          <Sparkles size={80} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-20 text-rose/20 hidden lg:block"
        >
          <Heart size={100} />
        </motion.div>
      </section>

      {/* Menu & Bespoke Selection */}
      <section id="menu" className="py-24 bg-white relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-4 italic font-serif">The Classics Menu</h2>
              <p className="text-chocolate/60">Ready to order treats for collection</p>
              <div className="w-24 h-1 bg-rose mx-auto rounded-full mt-4" />
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_ITEMS.map((item) => (
              <FadeIn key={item.id}>
                <div className="group bg-white rounded-3xl overflow-hidden border border-rose/10 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl text-chocolate font-bold">{item.title}</h3>
                      <span className="text-rose font-bold">£{item.price}</span>
                    </div>
                    <p className="text-chocolate/60 text-sm mb-6 flex-grow">{item.description}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full bg-cream text-chocolate py-3 rounded-2xl font-bold hover:bg-rose hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      Add to Selection
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bespoke Header */}
          <div id="bespoke" className="text-center mt-32 mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-4 italic font-serif">Something Unique?</h2>
              <p className="text-chocolate/60">Bespoke Artisan Designs for your biggest milestones</p>
              <div className="w-24 h-1 bg-rose mx-auto rounded-full mt-4" />
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {BESPOKE_TYPES.map((type) => (
              <FadeIn key={type.id}>
                <div className="p-10 rounded-[3rem] bg-blush/20 border border-rose/10 text-center hover:bg-blush/30 transition-colors">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-rose mx-auto mb-6 shadow-sm">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl text-chocolate mb-2">{type.title}</h3>
                  <p className="text-rose font-bold mb-6">{type.price}</p>
                  <a href="#order" className="inline-block bg-white text-chocolate px-8 py-3 rounded-full text-sm font-bold border border-rose/20 hover:border-rose transition-all">
                    Custom Enquiry
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Lou? */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <FadeIn>
                <h2 className="text-5xl md:text-6xl text-chocolate mb-8">Why Customers Love CakeLoulicious</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {WHY_CHOOSE_LOU.map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-rose/5 hover:border-rose/20 transition-all">
                      <div className="w-12 h-12 bg-rose/10 rounded-2xl flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h4 className="text-2xl text-chocolate mb-2">{item.title}</h4>
                      <p className="text-chocolate/60 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2 relative">
              <FadeIn delay={0.2}>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1535141123063-3bb610931353?q=80&w=1200&auto=format&fit=crop" 
                    alt="Cake creation" 
                    className="rounded-[3rem] w-full object-cover shadow-2xl rotate-2"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border-4 border-cream flex items-center gap-4">
                    <div className="bg-gold/10 p-3 rounded-full"><Heart className="text-gold fill-gold" size={32} /></div>
                    <div>
                      <p className="text-sm font-bold text-chocolate/40 uppercase tracking-widest">Handcrafted</p>
                      <p className="text-2xl text-chocolate">With Love</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-4">Ordering is Simple</h2>
              <p className="text-chocolate/60">Four small steps to your dream cake</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-rose/20 z-0" />
            
            {STEPS.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="relative z-10 text-center group">
                  <div className="w-24 h-24 bg-blush rounded-3xl flex items-center justify-center text-3xl font-bold mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-rose/10 text-rose">
                    {step.number}
                  </div>
                  <h3 className="text-2xl text-chocolate mb-3">{step.title}</h3>
                  <p className="text-chocolate/60 text-sm max-w-[200px] mx-auto leading-relaxed">{step.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Flavours Section */}
      <section id="flavours" className="py-24 bg-cream relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-6 whitespace-nowrap">Choose Your Flavour</h2>
              <p className="text-chocolate/60 max-w-xl mx-auto">From classic favorites to indulgent gourmet combinations, Lou has the perfect taste for your celebration.</p>
            </FadeIn>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {FLAVORS.map((f, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="px-6 py-3 rounded-full bg-white border border-rose/10 text-chocolate/80 text-sm font-medium hover:bg-rose hover:text-white hover:border-rose hover:shadow-lg hover:shadow-rose/20 cursor-default transition-all duration-300">
                  {f.name}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-12 text-center p-6 bg-white/50 rounded-2xl border border-dashed border-rose/30">
              <p className="text-chocolate italic flex items-center justify-center gap-2">
                Can't see your favourite? <span className="font-display text-2xl text-rose">Just ask Lou!</span> Custom flavours available.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-4">Fresh from Lou's Kitchen</h2>
              <div className="w-24 h-1 bg-rose mx-auto rounded-full mb-8" />
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((img, idx) => (
              <FadeIn key={img.id} delay={idx * 0.05}>
                <div 
                  onClick={() => setSelectedImage(img)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-square bg-cream shadow-md"
                >
                  <img 
                    src={img.url} 
                    alt={img.category} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-chocolate/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-2 bg-white/90 text-chocolate font-bold rounded-full text-sm uppercase tracking-widest backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {img.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={20} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://facebook.com/CakeLoulicious" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-rose text-white px-8 py-3 rounded-full font-bold hover:shadow-xl hover:shadow-rose/20 transition-all"
            >
              <Facebook size={20} /> See More on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-chocolate/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform">
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt="Enlarged cake" 
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" 
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/90 rounded-full text-chocolate font-bold">
                {selectedImage.category}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Order Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-chocolate/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-blush p-8 border-b border-rose/10 flex justify-between items-center">
                <h2 className="text-3xl text-chocolate font-serif italic">Complete Your Order</h2>
                <button onClick={() => setIsCheckoutOpen(false)}><X className="text-chocolate" /></button>
              </div>
              
              <div className="overflow-y-auto p-8 flex-grow no-scrollbar">
                <div className="mb-8 p-6 bg-cream/30 rounded-2xl border border-rose/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-rose mb-4">Your Selection Summary</h4>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm mb-2">
                       <span>{item.quantity}x {item.title}</span>
                       <span className="font-bold">£{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-rose/10 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Estimate</span>
                    <span className="text-2xl font-bold text-rose">£{cartTotal}</span>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-chocolate/50 ml-2">Full Name</label>
                      <input required type="text" name="name" onChange={handleOrderChange} className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-rose/10 outline-none focus:ring-2 focus:ring-rose/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-chocolate/50 ml-2">Phone Number</label>
                      <input required type="tel" name="phone" onChange={handleOrderChange} className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-rose/10 outline-none focus:ring-2 focus:ring-rose/30" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-chocolate/50 ml-2">Preferred Collection/Delivery Date</label>
                    <input required type="date" name="date" onChange={handleOrderChange} className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-rose/10 outline-none focus:ring-2 focus:ring-rose/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-chocolate/50 ml-2">Preference</label>
                    <div className="flex gap-4">
                      {['Collection', 'Delivery'].map(t => (
                        <button 
                          key={t}
                          type="button"
                          onClick={() => setOrderState(p => ({ ...p, deliveryType: t }))}
                          className={`flex-1 py-3 rounded-xl font-bold border transition-all ${
                            orderState.deliveryType === t ? 'bg-rose text-white border-rose' : 'bg-white text-chocolate/60 border-rose/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  {orderState.deliveryType === 'Delivery' && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-chocolate/50 ml-2">Delivery Address (Local Only)</label>
                      <input required type="text" name="address" onChange={handleOrderChange} className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-rose/10 outline-none focus:ring-2 focus:ring-rose/30" />
                    </div>
                  )}
                  <button type="submit" className="w-full bg-rose text-white py-4 rounded-2xl text-xl font-bold hover:shadow-xl hover:shadow-rose/30 transition-all">
                    Confirm Order for £{cartTotal}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-chocolate/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-rose/10 flex justify-between items-center bg-cream/30">
                <div>
                  <h2 className="text-3xl text-chocolate italic font-serif">Treat Selection</h2>
                  <p className="text-rose text-[10px] font-bold uppercase tracking-widest mt-1">Ready for Lou to Review</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 border border-rose/10 rounded-xl hover:bg-rose/5 transition-colors">
                  <X className="text-chocolate" size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <div className="w-24 h-24 bg-rose/10 rounded-full flex items-center justify-center mx-auto">
                      <Cake size={40} className="text-rose" />
                    </div>
                    <p className="text-xl italic">Your tray is empty...</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-rose font-bold text-sm uppercase tracking-widest">Browse Menu</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-cream/20 border border-rose/5">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-chocolate text-sm">{item.title}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-rose/40 hover:text-rose transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-chocolate/50 mb-3">{item.category} • £{item.price} each</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-white border border-rose/10 rounded-lg">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-rose hover:bg-rose/5 rounded-l-lg transition-colors">-</button>
                            <span className="px-3 font-bold text-xs border-x border-rose/10 h-full flex items-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-rose hover:bg-rose/5 rounded-r-lg transition-colors">+</button>
                          </div>
                          <span className="text-chocolate font-bold text-sm">£{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-rose/10 bg-cream/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-chocolate/60 font-bold uppercase tracking-widest text-xs">Estimated Total*</span>
                    <span className="text-3xl text-chocolate font-bold">£{cartTotal}</span>
                  </div>
                  <p className="text-[10px] text-chocolate/40 mb-6 italic">*Price is a starting estimate. Lou will provide a final quote based on collection/delivery requirements.</p>
                  <button 
                    onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-rose text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-rose/30 transition-all uppercase tracking-widest"
                  >
                    Proceed to Order <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Testimonials */}
      <section className="py-24 bg-cream relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl text-chocolate mb-4">What My Customers Say</h2>
              <p className="text-chocolate/60">Stories of joy from local families</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="h-full bg-white p-10 rounded-[2.5rem] shadow-sm relative group hover:shadow-xl transition-shadow">
                  <div className="absolute top-8 right-8 text-gold opacity-10 group-hover:scale-110 transition-transform">
                    <Star size={60} fill="currentColor" />
                  </div>
                  <div className="flex gap-1 mb-6 text-gold">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-chocolate/70 italic leading-relaxed mb-8 relative z-10">
                    "{t.text}"
                  </p>
                  <div>
                    <h4 className="text-xl text-chocolate font-display flex items-center gap-2">
                       {t.name}
                    </h4>
                    <p className="text-rose text-xs font-bold uppercase tracking-widest mt-1">
                      {t.category}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Enquiry Form Section */}
      <section id="order" className="py-24 bg-white relative">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="bg-blush/30 rounded-[3rem] p-8 md:p-16 border border-rose/10">
            <div className="text-center mb-12">
              <FadeIn>
                <h2 className="text-5xl md:text-6xl text-chocolate mb-4 italic font-serif">Personalised Cake Enquiry</h2>
                <p className="text-chocolate/60">For bespoke celebration designs. Lou will get back to you with a quote within 24 hours.</p>
              </FadeIn>
            </div>

            <form onSubmit={handleEnquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Your Name</label>
                <input required type="text" name="name" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all" />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Email Address</label>
                <input required type="email" name="email" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all" />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Phone Number</label>
                <input required type="tel" name="phone" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all" />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Occasion Type</label>
                <select name="occasion" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all">
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Baby Shower</option>
                  <option>Graduation</option>
                  <option>Corporate</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Approx. Servings</label>
                <select name="size" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50+</option>
                  <option>Not sure</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Preferred Date</label>
                <div className="relative">
                  <input required type="date" name="date" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all font-sans" />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-rose/40 pointer-events-none" size={20} />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Dietary Requirements</label>
                <input type="text" name="dietary" onChange={handleEnquiryChange} placeholder="e.g. Gluten free, Nut allergy..." className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Flavour Preference</label>
                <select name="flavour" onChange={handleEnquiryChange} className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all">
                  {FLAVORS.map(f => (<option key={f.name}>{f.name}</option>))}
                  <option>Something else! (Tell me in ideas)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Budget Range</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {['Under £50', '£50-£100', '£100-£200', '£200-£300', '£300+'].map(b => (
                    <button 
                      key={b} 
                      type="button"
                      onClick={() => setEnquiryState(p => ({ ...p, budget: b }))}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        enquiryState.budget === b ? 'bg-rose text-white border-rose shadow-md' : 'bg-white text-chocolate/60 border-rose/10 hover:border-rose/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-chocolate/70 ml-2">Design Vision & Theme</label>
                <textarea 
                  name="theme" 
                  onChange={handleEnquiryChange} 
                  rows={4} 
                  placeholder="Describe colors, themes, topper ideas, or any specific details..." 
                  className="w-full px-5 py-3 rounded-2xl bg-white border border-rose/20 outline-none focus:ring-2 focus:ring-rose/30 transition-all resize-none" 
                />
              </div>
              <div className="md:col-span-2 mt-6">
                <button type="submit" className="w-full bg-rose text-white py-5 rounded-3xl text-xl font-bold hover:shadow-2xl hover:shadow-rose/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  Send My Enquiry
                </button>
              </div>
            </form>

            <div className="mt-12 pt-12 border-t border-rose/10 text-center">
              <p className="text-chocolate/60 mb-6">Prefer to message directly? Find me on Facebook:</p>
              <a href="https://facebook.com/CakeLoulicious" className="inline-flex items-center gap-3 bg-white text-rose border-2 border-rose px-10 py-3 rounded-full font-bold hover:bg-rose hover:text-white transition-all shadow-sm">
                <Facebook size={24} /> Message CakeLoulicious
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chocolate text-white py-20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <a href="#" className="text-4xl font-display mb-6 inline-block">CakeLoulicious</a>
              <p className="text-cream/60 max-w-sm mb-8 leading-relaxed">
                Baked with love. Designed to wow. Bringing artisanal, handcrafted cake dreams to life since 2018.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-rose hover:border-rose transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-rose hover:border-rose transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-rose hover:border-rose transition-all"><Mail size={18} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#menu" className="hover:text-rose transition-colors">Treat Menu</a></li>
                <li><a href="#bespoke" className="hover:text-rose transition-colors">Bespoke Cakes</a></li>
                <li><a href="#gallery" className="hover:text-rose transition-colors">Gallery</a></li>
                <li><a href="#order" className="hover:text-rose transition-colors text-rose">Order Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Local info</h4>
              <ul className="space-y-4 text-sm font-medium text-cream/60">
                <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0 text-rose" /> Home-based kitchen serving local delivery & collection.</li>
                <li className="flex items-center gap-2"><Clock size={16} className="shrink-0 text-rose" /> Enquiries: 9am — 7pm</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="shrink-0 text-rose" /> Fully Registered & Insured</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-cream/10 text-center text-xs tracking-widest text-cream/40 uppercase font-bold">
            <p>© 2025 CakeLoulicious. Made with butter and love by Lou.</p>
          </div>
        </div>
      </footer>

      {/* Floating Messenger Icon */}
      <a 
        href="https://facebook.com/CakeLoulicious"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-rose text-white p-4 rounded-full shadow-[0_10px_30px_rgba(232,160,160,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-chocolate text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
          Message Lou!
        </span>
      </a>
    </div>
  );
}
