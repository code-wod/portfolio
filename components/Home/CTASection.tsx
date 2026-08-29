'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/Common';

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-accent/5 border-y border-accent/10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or looking for a skilled Android developer?
            I&apos;m always open to discussing new opportunities, freelance projects,
            or just chatting about technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group w-full sm:w-auto">
              Contact Me
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Download className="h-5 w-5 mr-2" aria-hidden="true" />
              Download Resume
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}