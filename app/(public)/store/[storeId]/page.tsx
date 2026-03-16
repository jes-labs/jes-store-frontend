'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Filter, ArrowRight, X, Minus, Plus, Wallet, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/constants/animation'
import CheckoutForm from '@/components/features/storefront/CheckoutForm'
import { toast } from 'sonner'

// Mock Data
const storeData = {
  name: "Amara's Fashion",
  category: "Boutique & Fashion",
  description: "Bespoke Nigerian wear and contemporary styles for the modern African woman. Handcrafted in Lagos, delivered worldwide.",
  bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=400&fit=crop",
  products: [
    { id: '1', name: "Owanbe Lace Gown", price: 120, category: "Gowns", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop" },
    { id: '2', name: "Ankara Midi Skirt", price: 45, category: "Skirts", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop" },
    { id: '3', name: "Adire Silk Wrap", price: 85, category: "Wraps", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=800&fit=crop" },
    { id: '4', name: "Agbada Set (Female)", price: 210, category: "Traditional", image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=600&h=800&fit=crop" },
    { id: '5', name: "Buba & Iro Classic", price: 150, category: "Traditional", image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=600&h=800&fit=crop" },
    { id: '6', name: "Modern Dashiki", price: 65, category: "Casual", image: "https://images.unsplash.com/photo-1574015974293-817f0efebb1b?w=600&h=800&fit=crop" },
  ]
}

const categories = ["All", "Gowns", "Skirts", "Wraps", "Traditional", "Casual"]

export default function StorefrontPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = React.use(params)
  const [cart, setCart] = useState<{product: any, qty: number}[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState("All")
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart')

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { product, qty: 1 }]
    })
    setIsCartOpen(true)
    setCheckoutStep('cart')
    toast.success(`${product.name} added to cart`)
  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(0, item.qty + delta)
        return { ...item, qty: newQty }
      }
      return item
    }).filter(item => item.qty > 0))
  }

  const handleCheckoutComplete = (data: any) => {
    console.log('Checkout details:', data)
    setCheckoutStep('success')
    setCart([])
  }

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0)
  const filteredProducts = storeData.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black">
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 px-6 sm:px-12 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
               <ShoppingBag className="w-6 h-6 text-black" />
            </div>
            <div>
               <h1 className="font-heading font-black text-xl tracking-tighter uppercase leading-none">{storeData.name}</h1>
               <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-none">{storeData.category}</span>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
               {categories.map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                    activeCategory === cat ? "bg-primary text-black" : "text-white/40 hover:text-white"
                  )}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
              >
                 <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 {cart.length > 0 && (
                   <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-black text-[10px] font-bold flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                      {cart.reduce((a, b) => a + b.qty, 0)}
                   </span>
                 )}
              </button>
         </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-20 px-6 sm:px-12 overflow-hidden">
         <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
            <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 0.1, scale: 1 }}
               transition={{ duration: 2 }}
               className="absolute inset-0 bg-cover bg-center" 
               style={{ backgroundImage: `url(${storeData.bannerImage})` }}
            />
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 max-w-3xl">
               <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 rounded-full px-4 py-1 text-[10px] font-bold tracking-widest uppercase">Premium Fashion Hub</Badge>
               <h2 className="text-5xl sm:text-7xl font-heading font-black tracking-tighter text-white leading-[0.9]">
                  ELEVATE YOUR <span className="text-primary italic">STYLE.</span>
               </h2>
               <p className="text-lg text-white/50 font-body max-w-xl leading-relaxed">
                  {storeData.description}
               </p>
               <div className="flex gap-4 pt-4">
                  <Button className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 text-black font-bold text-base shadow-xl">Explore Collection</Button>
                  <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/10 bg-white/5 text-white font-bold text-base">Sustainability Report</Button>
               </div>
            </motion.div>
         </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-20 bg-[#050505] relative z-20">
         <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div>
               <h3 className="text-4xl font-heading font-bold tracking-tight text-white">{activeCategory} Collections</h3>
               <p className="text-white/40 text-sm mt-2">Showing {filteredProducts.length} handcrafted items</p>
            </div>
            
            <div className="relative w-full md:w-80 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:border-primary/40 outline-none transition-all focus:bg-white/10"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <motion.div
           variants={staggerContainer}
           initial="hidden"
           animate="visible"
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
         >
            {filteredProducts.map((p) => (
              <motion.div 
                key={p.id} 
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-primary/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                 <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.03]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                       <Button 
                         onClick={() => addToCart(p)}
                         className="w-full h-12 rounded-2xl bg-white text-black hover:bg-primary font-bold shadow-2xl"
                       >
                          Add to Cart
                       </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                       <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[10px] tracking-tight">{p.category}</Badge>
                    </div>
                 </div>
                 <div className="p-6 space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{p.name}</h4>
                    <div className="text-xl font-black text-white/90">
                       <span className="text-primary">$</span>{p.price}
                       <span className="text-[10px] text-white/30 ml-2 font-mono uppercase tracking-widest">USDC</span>
                    </div>
                 </div>
              </motion.div>
            ))}
         </motion.div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
         {isCartOpen && (
           <>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" 
             />
             <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#080808] border-l border-white/5 z-[70] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]"
             >
                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                   <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-heading font-black text-white flex items-center gap-3">
                         <ShoppingBag className="w-6 h-6 text-primary" /> {checkoutStep === 'success' ? 'Order Confirmed' : 'Your Bag'}
                      </h2>
                      <button onClick={() => setIsCartOpen(false)} className="p-2 text-white/40 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                   </div>
                   <div className="flex gap-1">
                      <div className={cn("h-1 flex-1 rounded-full bg-white/10", (checkoutStep === 'cart' || checkoutStep === 'details' || checkoutStep === 'success') && "bg-primary")} />
                      <div className={cn("h-1 flex-1 rounded-full bg-white/10", (checkoutStep === 'details' || checkoutStep === 'success') && "bg-primary")} />
                      <div className={cn("h-1 flex-1 rounded-full bg-white/10", checkoutStep === 'success' && "bg-primary")} />
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                   {checkoutStep === 'cart' && (
                      <div className="space-y-8">
                         {cart.length === 0 ? (
                           <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-6">
                              <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-white/20"><ShoppingCart className="w-10 h-10" /></div>
                              <div className="space-y-2">
                                 <p className="text-lg font-bold text-white/60 font-heading">Your bag is empty.</p>
                                 <p className="text-xs text-white/30 max-w-[200px]">Looks like you haven't added any items to your collection yet.</p>
                              </div>
                              <Button onClick={() => setIsCartOpen(false)} variant="outline" className="rounded-xl px-8 border-white/10 hover:bg-white/5">Start Shopping</Button>
                           </div>
                         ) : (
                           <div className="space-y-6">
                             {cart.map((item) => (
                               <motion.div key={item.product.id} layout className="flex gap-4 group bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                                  <div 
                                    className="w-20 h-24 rounded-xl bg-cover bg-center shrink-0 border border-white/5" 
                                    style={{ backgroundImage: `url(${item.product.image})` }}
                                  />
                                  <div className="flex-1 flex flex-col justify-between py-1">
                                     <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                           <h4 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h4>
                                           <span className="text-sm font-black text-primary">${item.product.price}</span>
                                        </div>
                                        <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{item.product.category}</p>
                                     </div>
                                     <div className="flex items-center justify-between">
                                        <div className="flex items-center bg-black/40 rounded-lg overflow-hidden border border-white/5 h-8">
                                           <button onClick={() => updateQty(item.product.id, -1)} className="px-2 hover:bg-white/5 text-white/40 hover:text-white"><Minus className="w-3 h-3" /></button>
                                           <span className="px-3 text-xs font-mono font-bold text-white min-w-[2.5rem] text-center">{item.qty}</span>
                                           <button onClick={() => updateQty(item.product.id, 1)} className="px-2 hover:bg-white/5 text-white/40 hover:text-white"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <button onClick={() => updateQty(item.product.id, -item.qty)} className="text-[10px] font-bold text-destructive/60 hover:text-destructive uppercase tracking-widest">Remove</button>
                                     </div>
                                  </div>
                               </motion.div>
                             ))}
                           </div>
                         )}
                      </div>
                   )}

                   {checkoutStep === 'details' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <button 
                           onClick={() => setCheckoutStep('cart')}
                           className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest mb-6"
                         >
                            <ArrowLeft size={12} /> Back to Bag
                         </button>
                         <CheckoutForm total={cartTotal} onComplete={handleCheckoutComplete} />
                      </motion.div>
                   )}

                   {checkoutStep === 'success' && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                         <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                            <div className="relative w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                               <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <h3 className="text-3xl font-heading font-black text-white uppercase italic">Order Received!</h3>
                            <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mx-auto">
                               Thank you for shopping with <span className="text-white font-bold">{storeData.name}</span>. Your stablecoin payment has been verified on-chain.
                            </p>
                         </div>
                         <div className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                               <span>Order Ref</span>
                               <span className="text-white">#JST-8429-XM</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                               <span>Delivery Status</span>
                               <span className="text-primary">Processing</span>
                            </div>
                         </div>
                         <Button onClick={() => setIsCartOpen(false)} className="w-full h-14 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-white/90">
                            Return to Store
                         </Button>
                      </motion.div>
                   )}
                </div>

                {checkoutStep === 'cart' && cart.length > 0 && (
                   <div className="p-8 border-t border-white/5 bg-white/[0.02] space-y-8">
                      <div className="space-y-3">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Total Value</span>
                            <span className="text-4xl font-black font-display text-white tracking-tighter">
                               <span className="text-primary text-2xl mr-1">$</span>
                               {cartTotal.toFixed(2)}
                            </span>
                         </div>
                         <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-primary/5 border border-primary/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Crypto Network fees</span>
                            <span className="text-xs font-bold text-primary italic">~ $0.002 (Celo)</span>
                         </div>
                      </div>

                      <Button 
                        onClick={() => setCheckoutStep('details')}
                        className="w-full h-16 rounded-3xl bg-primary hover:bg-primary/90 text-black font-black text-lg shadow-[0_0_50px_rgba(var(--primary),0.3)] group transition-all"
                      >
                         CHECKOUT NOW
                         <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                   </div>
                )}
             </motion.div>
           </>
         )}
      </AnimatePresence>
    </div>
  )
}
