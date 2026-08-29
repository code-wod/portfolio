'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, GitFork, Link } from 'lucide-react';
import { Button } from '@/components/Common';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-20" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="text-center lg:text-left flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight mb-6"
          >
            Hi, I{'m '}
            <span className="text-accent">Dixit Saini</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl text-secondary font-medium mb-4"
          >
            Android Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            3+ years building scalable mobile applications with Kotlin, Firebase & WebRTC.
            Senior Developer at Scramble Apps. Passionate about clean architecture & real-time systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <Button size="lg" className="group w-full sm:w-auto">
              Get In Touch
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View My Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-6"
          >
            <a
              href="mailto:dixit.appinnovator@gmail.com"
              className={cn(
                'p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/dixit"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
              aria-label="GitHub"
            >
              <GitFork className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/dixitsaini2"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
              aria-label="LinkedIn"
            >
              <Link className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
            className="hidden lg:block flex-1 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/10 to-transparent border border-default">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
                  alt="Dixit Saini - Android Developer"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-40 h-40 lg:w-48 lg:h-48 rounded-2xl bg-secondary/80 backdrop-blur-sm border border-default flex items-center justify-center shadow-xl">
                <div className="text-center p-4">
                  <div className="text-3xl lg:text-4xl font-bold text-accent">5+</div>
                  <div className="text-xs lg:text-sm text-secondary">Apps on Play Store</div>
                </div>
              </div>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          className="mt-16 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 relative z-10"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-square max-w-md mx-auto lg:max-w-none lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl blur-2xl" aria-hidden="true" />
              <div className="relative bg-tertiary/50 border border-default rounded-3xl p-1">
                <div className="bg-secondary border border-default rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-accent mb-2">5+</div>
                    <div className="text-secondary">Production Apps</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-4 lg:bottom-[-20px] lg:left-auto lg:right-0 lg:-translate-x-0 lg:translate-y-0">
              <motion.div
                className="bg-secondary/80 backdrop-blur-sm border border-default rounded-xl p-4 min-w-[180px]"
                whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-accent mb-1">3+</div>
                <div className="text-sm text-secondary">Years Experience</div>
              </motion.div>
              <motion.div
                className="bg-secondary/80 backdrop-blur-sm border border-default rounded-xl p-4 min-w-[180px]"
                whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm text-secondary">Technical Skills</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="h-6 w-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}