'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const stats: Stat[] = [
  { value: '5+', label: 'Production Apps' },
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Technical Skills' },
  { value: '100%', label: 'Client Satisfaction' },
];

export function QuickStats() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-default">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center lg:text-left p-6 lg:p-8 bg-secondary/50 border border-default rounded-xl hover:border-accent/50 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-secondary text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}