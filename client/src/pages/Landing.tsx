import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayIcon, 
  CheckCircleIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChatBubbleLeftRightIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  CheckCircleIcon as CheckCircleIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';

function Landing() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: CurrencyDollarIcon,
      title: "Track Expenses with Ease",
      description: "Add expenses instantly with smart categorization and automatic splitting across group members.",
      gradient: "from-emerald-400 to-cyan-500"
    },
    {
      icon: UserGroupIcon,
      title: "Auto Balances Across Groups",
      description: "Real-time balance calculations with smart debt optimization to minimize transactions.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Smart Notes & Conversations",
      description: "Add context to expenses with notes and comments. Keep everyone in the loop.",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: PlusIcon,
      title: "Invite Anyone, Anytime",
      description: "Add friends, roommates, or colleagues to groups instantly with email invitations.",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create a Group",
      description: "Start by creating a group for your friends, roommates, or travel companions.",
      icon: "👥"
    },
    {
      number: "02", 
      title: "Add Expenses with Notes",
      description: "Log expenses with photos, notes, and automatic splitting options.",
      icon: "💰"
    },
    {
      number: "03",
      title: "Settle Balances with a Tap",
      description: "Pay friends directly through the app with integrated payment solutions.",
      icon: "✨"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "College Student",
      avatar: "S",
      text: "SplitSync saved our Europe trip budget! No more awkward money conversations.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Software Engineer",
      avatar: "M", 
      text: "Finally, a clean way to split our team lunches. The notes feature is genius!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Marketing Manager",
      avatar: "P",
      text: "Our roommate expenses are so organized now. Love the real-time balance updates.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Is SplitSync free to use?",
      answer: "Yes! SplitSync is completely free for personal use. We're working on premium features for power users."
    },
    {
      question: "How secure is my financial data?",
      answer: "We use bank-level encryption and never store your payment information. All data is encrypted in transit and at rest."
    },
    {
      question: "Can I use SplitSync offline?",
      answer: "SplitSync works best with an internet connection, but you can view your data offline. Changes sync when you're back online."
    },
    {
      question: "How do I settle payments?",
      answer: "You can settle through integrated payment providers or mark payments as settled manually when paid outside the app."
    },
    {
      question: "Is there a limit to group size?",
      answer: "No limits! Whether it's 2 roommates or 20 friends on a trip, SplitSync scales with your needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white">SplitSync</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">How it Works</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors duration-200">FAQ</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Split expenses.
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    {' '}Sync lives.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Effortlessly track group expenses, balances, and payments in real time. 
                  Perfect for roommates, friends, and small teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20">
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircleIconSolid className="h-5 w-5 text-emerald-400" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIconSolid className="h-5 w-5 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            {/* Animated Dashboard Preview */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                {/* Floating Cards Animation */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 rounded-2xl backdrop-blur-md border border-white/20 transform rotate-6 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 font-bold">+₹1,200</span>
                      </div>
                      <div className="text-white text-sm">Dinner Split</div>
                      <div className="text-gray-300 text-xs">with 4 friends</div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-56 h-28 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-2xl backdrop-blur-md border border-white/20 transform -rotate-3 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
                        <span className="text-red-400 font-bold">-₹800</span>
                      </div>
                      <div className="text-white text-sm">You owe Sarah</div>
                      <div className="text-gray-300 text-xs">Movie tickets</div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Mockup */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">Your Groups</h3>
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                              <div>
                                <div className="text-white font-medium">Group {i}</div>
                                <div className="text-gray-400 text-sm">4 members</div>
                              </div>
                            </div>
                            <div className="text-emerald-400 font-bold">₹{i * 200}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you need to
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                {' '}split smart
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to make group expense management effortless and transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-300">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center group transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Loved by thousands
            </h2>
            <p className="text-xl text-gray-300">
              See what our users are saying
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid key={i} className="h-6 w-6 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl text-white mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {testimonials[activeTestimonial].avatar}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about SplitSync
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="text-white font-semibold text-lg">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to split smart?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've simplified their group expenses with SplitSync.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold text-white">SplitSync</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The easiest way to split expenses and manage group finances. 
                Built with ❤️ by the SplitSync team.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SplitSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;