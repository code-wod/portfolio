import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">About Me</h1>
              <p className="text-secondary text-lg">
                Senior Android Developer with 3+ years of experience building scalable mobile applications.
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-secondary border border-default rounded-xl p-6 lg:p-8">
                  <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4">Professional Summary</h2>
                  <div className="space-y-4 text-secondary leading-relaxed">
                    <p>
                      I'm a passionate Android Developer with over 3 years of professional experience
                      building production-grade mobile applications. Currently serving as a Senior Developer
                      at Scramble Apps, where I lead the development of real-time communication applications
                      using Kotlin, Firebase, and WebRTC.
                    </p>
                    <p>
                      My journey started with an internship at Deftsoft, where I gained hands-on experience
                      with MVVM architecture, Firebase integration, and performance optimization. Since then,
                      I've shipped 5+ production applications spanning chat platforms, social media, healthcare,
                      and e-commerce domains.
                    </p>
                    <p>
                      I'm a strong advocate for clean architecture, testable code, and developer experience.
                      When I'm not coding, I enjoy sharing knowledge through technical blog posts and
                      exploring emerging technologies in the mobile space.
                    </p>
                  </div>
                </div>

                <div className="bg-secondary border border-default rounded-xl p-6 lg:p-8">
                  <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4">Key Highlights</h2>
                  <ul className="space-y-3">
                    {[
                      '5+ production applications on Google Play Store',
                      'Expert in real-time communication (WebRTC, Firebase, XMPP)',
                      'Strong architecture skills: MVVM, Clean Architecture, Modular',
                      'Performance optimization: startup time, memory, battery',
                      'Experience with Jetpack Compose and modern Android toolkit',
                      'Mentored junior developers and conducted code reviews',
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-secondary">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-secondary border border-default rounded-xl p-6 lg:p-8 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-tertiary border border-default flex items-center justify-center overflow-hidden">
                      <span className="text-4xl font-bold text-accent">DS</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">Dixit Saini</h3>
                    <p className="text-secondary text-sm mt-1">Senior Android Developer</p>
                    <p className="text-tertiary text-sm">Mohali, Punjab, India</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-default">
                    <a
                      href="mailto:dixit.appinnovator@gmail.com"
                      className="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>dixit.appinnovator@gmail.com</span>
                    </a>
                    <a
                      href="tel:+919728643374"
                      className="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+91 9728643374</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/dixitsaini2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>linkedin.com/in/dixitsaini2</span>
                    </a>
                    <a
                      href="https://github.com/dixit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>github.com/dixit</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-default">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Professional Journey</h2>
              <p className="text-secondary max-w-2xl mx-auto">
                A timeline of my education and work experience
              </p>
            </header>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-default -translate-x-1/2" aria-hidden="true" />
              
              <div className="space-y-12">
                {[
                  {
                    year: '2025+',
                    type: 'education',
                    title: "Master's in AI/ML",
                    company: 'Rayat Bahra University',
                    description: 'Currently pursuing advanced studies in Artificial Intelligence and Machine Learning.',
                    side: 'left',
                  },
                  {
                    year: '2023-Present',
                    type: 'experience',
                    title: 'Senior Developer',
                    company: 'Scramble Apps',
                    description: 'Building real-time communication apps with Kotlin and Firebase. Implemented WebRTC for voice/video calling. Reduced code complexity by 30% and improved startup time by 20%.',
                    side: 'right',
                  },
                  {
                    year: '2022-2023',
                    type: 'education',
                    title: 'Bachelor of Computer Applications',
                    company: 'Chandigarh Group of Colleges',
                    description: 'Graduated with focus on software development and computer applications.',
                    side: 'left',
                  },
                  {
                    year: '2022-2023',
                    type: 'experience',
                    title: 'Android Developer Intern',
                    company: 'Deftsoft',
                    description: 'Implemented MVVM architecture and integrated Firebase services. Reduced latency by 30% through optimization.',
                    side: 'right',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'relative flex items-center gap-8',
                      item.side === 'left' ? 'flex-row-reverse' : ''
                    )}
                  >
                    <div className={cn(
                      'w-1/2 px-8',
                      item.side === 'left' ? 'text-right pr-12' : 'pl-12'
                    )}>
                      <div className={cn(
                        'bg-secondary border border-default rounded-xl p-6 hover:border-accent/50 transition-colors relative',
                        item.type === 'education' ? 'border-accent/20' : ''
                      )}>
                        <div className="absolute top-6 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border-4 border-primary"
                          style={item.side === 'left' ? { right: '-20px' } : { left: '-20px' }}
                          aria-hidden="true"
                        />
                        <div className="text-sm font-medium text-accent mb-1">{item.year}</div>
                        <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
                        <p className="text-secondary font-medium mb-3">{item.company}</p>
                        <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                        <span className={cn(
                          'inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full',
                          item.type === 'education'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-success/10 text-success'
                        )}>
                          {item.type === 'education' ? 'Education' : 'Work Experience'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Achievements</h2>
              <p className="text-secondary max-w-2xl mx-auto">
                Key milestones and accomplishments in my career
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: '📱', value: '5+', label: 'Production Apps' },
                { icon: '⚡', value: '50+', label: 'Technical Skills' },
                { icon: '🔄', value: 'Expert', label: 'Real-time Systems' },
                { icon: '🏗️', value: 'Expert', label: 'MVVM Architecture' },
                { icon: '✨', value: 'Advocate', label: 'Clean Code' },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="bg-secondary border border-default rounded-xl p-6 text-center hover:border-accent/50 transition-colors"
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <div className="text-3xl font-bold text-accent mb-1">{achievement.value}</div>
                  <div className="text-secondary">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}