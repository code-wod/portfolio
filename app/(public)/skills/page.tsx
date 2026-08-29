'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/Common';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  description: string;
  icon: string;
  color: string;
}

const categories = [
  'All',
  'Android & Mobile Development',
  'Networking & Real-Time',
  'Databases & Storage',
  'Architecture & Design',
  'Build & DevOps',
  'Advanced Concepts',
];

const skills: Skill[] = [
  { name: 'Kotlin', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Expert in Kotlin for Android development', icon: '⚡', color: '#7F52FF' },
  { name: 'Jetpack Compose', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 2, description: 'Modern declarative UI toolkit', icon: '🎨', color: '#4285F4' },
  { name: 'Material Design 3', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Latest Material Design system', icon: '🎯', color: '#6750A4' },
  { name: 'XML Layouts', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Traditional Android UI development', icon: '📐', color: '#3DDC84' },
  { name: 'Navigation Component', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Jetpack Navigation for app navigation', icon: '🧭', color: '#FF6B6B' },
  { name: 'RecyclerView', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Efficient list and grid displays', icon: '📋', color: '#4ECDC4' },
  { name: 'Constraint Layout', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: 'Complex responsive layouts', icon: '📦', color: '#FFD93D' },
  { name: 'ViewPager2', category: 'Android & Mobile Development', proficiency: 4, yearsOfExperience: 3, description: 'Swipeable views and tabs', icon: '📄', color: '#6BCB77' },

  { name: 'REST APIs', category: 'Networking & Real-Time', proficiency: 5, yearsOfExperience: 3, description: 'RESTful API design and consumption', icon: '🌐', color: '#FF6B6B' },
  { name: 'Retrofit', category: 'Networking & Real-Time', proficiency: 5, yearsOfExperience: 3, description: 'Type-safe HTTP client for Android', icon: '🔗', color: '#4ECDC4' },
  { name: 'OkHttp', category: 'Networking & Real-Time', proficiency: 5, yearsOfExperience: 3, description: 'Efficient HTTP & HTTP/2 client', icon: '⚡', color: '#FFD93D' },
  { name: 'WebRTC', category: 'Networking & Real-Time', proficiency: 5, yearsOfExperience: 2, description: 'Real-time voice/video communication', icon: '📞', color: '#3DDC84' },
  { name: 'Firebase Realtime DB', category: 'Networking & Real-Time', proficiency: 5, yearsOfExperience: 3, description: 'Real-time database synchronization', icon: '🔥', color: '#FFCA28' },
  { name: 'XMPP', category: 'Networking & Real-Time', proficiency: 4, yearsOfExperience: 2, description: 'Extensible messaging protocol', icon: '💬', color: '#6BCB77' },
  { name: 'Socket.io', category: 'Networking & Real-Time', proficiency: 4, yearsOfExperience: 2, description: 'Real-time bidirectional communication', icon: '🔌', color: '#010101' },

  { name: 'Firebase Firestore', category: 'Databases & Storage', proficiency: 5, yearsOfExperience: 3, description: 'Scalable NoSQL document database', icon: '🔥', color: '#FFCA28' },
  { name: 'Firebase Storage', category: 'Databases & Storage', proficiency: 5, yearsOfExperience: 3, description: 'Cloud file storage solution', icon: '☁️', color: '#FFCA28' },
  { name: 'Room Database', category: 'Databases & Storage', proficiency: 5, yearsOfExperience: 3, description: 'SQLite abstraction layer', icon: '🗄️', color: '#3DDC84' },
  { name: 'SQLite', category: 'Databases & Storage', proficiency: 4, yearsOfExperience: 3, description: 'Embedded relational database', icon: '💾', color: '#003B57' },
  { name: 'Local Caching', category: 'Databases & Storage', proficiency: 5, yearsOfExperience: 3, description: 'Offline-first data strategies', icon: '💾', color: '#4ECDC4' },
  { name: 'Offline-first Sync', category: 'Databases & Storage', proficiency: 4, yearsOfExperience: 2, description: 'Data synchronization strategies', icon: '🔄', color: '#6BCB77' },

  { name: 'MVVM', category: 'Architecture & Design', proficiency: 5, yearsOfExperience: 3, description: 'Model-View-ViewModel pattern', icon: '🏗️', color: '#6750A4' },
  { name: 'Clean Architecture', category: 'Architecture & Design', proficiency: 5, yearsOfExperience: 3, description: 'Separation of concerns architecture', icon: '🧼', color: '#3DDC84' },
  { name: 'MVC', category: 'Architecture & Design', proficiency: 4, yearsOfExperience: 3, description: 'Model-View-Controller pattern', icon: '📐', color: '#FF6B6B' },
  { name: 'Modular Architecture', category: 'Architecture & Design', proficiency: 5, yearsOfExperience: 2, description: 'Multi-module project structure', icon: '🧩', color: '#4ECDC4' },
  { name: 'Separation of Concerns', category: 'Architecture & Design', proficiency: 5, yearsOfExperience: 3, description: 'Design principle for maintainability', icon: '✂️', color: '#FFD93D' },

  { name: 'Gradle', category: 'Build & DevOps', proficiency: 5, yearsOfExperience: 3, description: 'Build automation system', icon: '🐘', color: '#02303A' },
  { name: 'Dagger/Hilt', category: 'Build & DevOps', proficiency: 5, yearsOfExperience: 2, description: 'Dependency injection frameworks', icon: '💉', color: '#FF6B6B' },
  { name: 'JUnit/Espresso', category: 'Build & DevOps', proficiency: 4, yearsOfExperience: 3, description: 'Unit and UI testing frameworks', icon: '🧪', color: '#25A162' },
  { name: 'Git/GitHub', category: 'Build & DevOps', proficiency: 5, yearsOfExperience: 3, description: 'Version control and collaboration', icon: '📝', color: '#181717' },
  { name: 'CI/CD', category: 'Build & DevOps', proficiency: 4, yearsOfExperience: 2, description: 'Continuous integration/deployment', icon: '🔄', color: '#4ECDC4' },
  { name: 'Play Store Deployment', category: 'Build & DevOps', proficiency: 5, yearsOfExperience: 3, description: 'App publishing and management', icon: '🚀', color: '#4285F4' },

  { name: 'Kotlin Coroutines', category: 'Advanced Concepts', proficiency: 5, yearsOfExperience: 3, description: 'Asynchronous programming', icon: '⚡', color: '#7F52FF' },
  { name: 'Multithreading', category: 'Advanced Concepts', proficiency: 5, yearsOfExperience: 3, description: 'Concurrent programming', icon: '🧵', color: '#FF6B6B' },
  { name: 'App Startup Optimization', category: 'Advanced Concepts', proficiency: 5, yearsOfExperience: 2, description: 'Performance optimization', icon: '🚀', color: '#3DDC84' },
  { name: 'Memory Management', category: 'Advanced Concepts', proficiency: 5, yearsOfExperience: 3, description: 'Memory leak prevention', icon: '🧠', color: '#4ECDC4' },
  { name: 'Performance Optimization', category: 'Advanced Concepts', proficiency: 5, yearsOfExperience: 3, description: 'App performance tuning', icon: '⚡', color: '#FFD93D' },
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterText, setFilterText] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(filterText.toLowerCase()) ||
                          skill.description.toLowerCase().includes(filterText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={cn(
            'text-lg',
            i < rating ? 'text-warning' : 'text-tertiary'
          )}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Skills & Expertise</h1>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                3+ years building scalable Android apps with modern technologies
              </p>
            </header>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    activeCategory === category
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-tertiary text-secondary hover:text-primary hover:bg-border'
                  )}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search skills..."
                className="w-full max-w-md mx-auto px-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                aria-label="Search skills"
              />
            </div>

            {filteredSkills.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-secondary">No skills found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <motion.article
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card variant="default" padding="lg" hover className="h-full">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                          aria-hidden="true"
                        >
                          {skill.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-primary mb-1">{skill.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(skill.proficiency)}
                            <span className="text-xs text-tertiary">({skill.proficiency}/5)</span>
                          </div>
                          <p className="text-sm text-secondary mb-2">{skill.description}</p>
                          <div className="flex items-center gap-4 text-xs text-tertiary">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" aria-hidden="true" />
                              {skill.yearsOfExperience}+ years
                            </span>
                            <span className="px-2 py-0.5 bg-tertiary rounded text-tertiary">
                              {skill.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}