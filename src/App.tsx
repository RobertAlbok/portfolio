import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Code2 } from 'lucide-react';
import perfilImage from './assets/perfil.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; project: any; type: 'demo' | 'code' }>({
    isOpen: false,
    project: null,
    type: 'demo'
  });


  // Refs for animation elements
  const animatedElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const addToAnimationRef = (el: HTMLElement | null) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Light mode enabled');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollY = window.pageYOffset;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop - 100;
          const sectionHeight = element.offsetHeight;
          
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'HTML5', level: 70 },
    { name: 'CSS3/SCSS', level: 40 },
    { name: 'JavaScript (ES6+)', level: 35 },
    { name: 'React.js', level: 20 },
    { name: 'TypeScript', level: 20 },
    { name: 'Backend (Node.js, Python, .NET, MySQL, n8n)', level: 15 }
  ];

  const techStack = [
    { icon: '⚛️', name: 'React' },
    { icon: '🎨', name: 'Tailwind' },
    { icon: '⚡', name: 'Vite' },
    { icon: '📦', name: 'Webpack' },
    { icon: '🔧', name: 'Git' },
    { icon: '🐙', name: 'GitHub' },
    { icon: '🐬', name: 'MySQL' },
    { icon: '🤖', name: 'n8n' },
    { icon: '🐍', name: 'Python' },
    { icon: '💻', name: 'C#' },
    { icon: '🌐', name: '.NET' },
    { icon: '🟩', name: 'Node.js' },
  ];

  const projects = [
    {
      title: 'Plataforma E-commerce',
      description: 'Uma plataforma de e-commerce moderna construída com React e sistemas de pagamento integrados.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Redux', 'Stripe', 'Node.js', 'MySQL']
    },
    {
      title: 'App de Gerenciamento de Tarefas',
      description: 'Uma aplicação colaborativa de gerenciamento de tarefas com atualizações em tempo real e automações.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Next.js', 'Firebase', 'n8n', 'Node.js']
    },
    {
      title: 'Dashboard Meteorológico',
      description: 'Um dashboard interativo com previsões baseadas em localização, visualização de dados e backend robusto.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['JavaScript', 'Chart.js', 'API', 'Python', 'MySQL']
    },
    {
      title: 'Site Corporativo',
      description: 'Um site corporativo profissional com design moderno, performance otimizada e integração backend.',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['TypeScript', 'Material UI', '.NET', 'C#']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
  };

  const handleProjectAction = (project: any, type: 'demo' | 'code') => {
    setProjectModal({ isOpen: true, project, type });
  };

  const closeProjectModal = () => {
    setProjectModal({ isOpen: false, project: null, type: 'demo' });
  };

  const scrollToContact = () => {
    closeProjectModal();
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Robert<span className="text-red-600">.</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { id: 'home', label: 'Início' },
                  { id: 'about', label: 'Sobre' },
                  { id: 'skills', label: 'Habilidades' },
                  { id: 'projects', label: 'Projetos' },
                  { id: 'contact', label: 'Contato' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                {[
                  { id: 'home', label: 'Início' },
                  { id: 'about', label: 'Sobre' },
                  { id: 'skills', label: 'Habilidades' },
                  { id: 'projects', label: 'Projetos' },
                  { id: 'contact', label: 'Contato' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-green-500/10 rounded-full animate-float-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={addToAnimationRef}
            className="text-center lg:text-left opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                Olá, eu sou
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Robert M. Albok
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-green-600 dark:text-green-400">
                Desenvolvedor Frontend
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Apaixonado por criar aplicações web bonitas, responsivas e centradas no usuário 
                com tecnologias modernas e código limpo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Ver Meus Trabalhos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-red-600 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                Entre em Contato
              </button>
            </div>
          </div>

          <div 
            ref={addToAnimationRef}
            className="flex justify-center lg:justify-end opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-300"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">portfolio.js</span>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="text-purple-600 dark:text-purple-400">
                  <span className="text-blue-600 dark:text-blue-400">const</span>{' '}
                  <span className="text-gray-900 dark:text-white">desenvolvedor</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">=</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{'{'}</span>
                </div>
                <div className="pl-4 text-cyan-600 dark:text-cyan-400">
                  nome<span className="text-gray-600 dark:text-gray-400">:</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'Robert M. Albok'</span>
                  <span className="text-gray-600 dark:text-gray-400">,</span>
                </div>
                <div className="pl-4 text-cyan-600 dark:text-cyan-400">
                  habilidades<span className="text-gray-600 dark:text-gray-400">:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">[</span>
                  <span className="text-green-600 dark:text-green-400">'React'</span>
                  <span className="text-gray-600 dark:text-gray-400">,</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'JavaScript'</span>
                  <span className="text-gray-600 dark:text-gray-400">]</span>
                  <span className="text-gray-600 dark:text-gray-400">,</span>
                </div>
                <div className="pl-4 text-cyan-600 dark:text-cyan-400">
                  paixao<span className="text-gray-600 dark:text-gray-400">:</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'Desenvolvimento Frontend'</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">{'}'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-6 border-r-2 border-b-2 border-red-600 transform rotate-45"></div>
        </div>
      </section>

      <div className="flex justify-center py-8 dark:bg-[#0d1117]">
        <picture>
          {isDarkMode ? (
            <source 
              media="(prefers-color-scheme: dark)" 
              srcSet="https://raw.githubusercontent.com/eduardavieira-dev/eduardavieira-dev/output/pacman-contribution-graph-dark.svg"
            />
          ) : (
            <source 
              media="(prefers-color-scheme: light)" 
              srcSet="https://raw.githubusercontent.com/eduardavieira-dev/eduardavieira-dev/output/pacman-contribution-graph.svg"
            />
          )}
          <img 
            alt="pacman contribution graph" 
            src={isDarkMode ? "https://raw.githubusercontent.com/eduardavieira-dev/eduardavieira-dev/output/pacman-contribution-graph-dark.svg" : "https://raw.githubusercontent.com/eduardavieira-dev/eduardavieira-dev/output/pacman-contribution-graph.svg"}
            className="max-w-full h-auto"
          />
        </picture>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={addToAnimationRef}
            className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Sobre Mim
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Conheça um pouco mais sobre mim
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              ref={addToAnimationRef}
              className="space-y-6 opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-200"
            >
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Sou um Desenvolvedor Frontend e Backend (Fullstack) dedicado com paixão por criar experiências digitais excepcionais. 
                Com expertise em tecnologias web modernas e backend (Node.js, Python, MySQL, .NET, n8n), transformo ideias em aplicações funcionais, bonitas, robustas e centradas no usuário.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Minha abordagem combina excelência técnica com resolução criativa de problemas, garantindo que 
                cada projeto não apenas atenda aos requisitos, mas supere as expectativas. Mantenho-me atualizado 
                com as últimas tendências e melhores práticas da indústria, tanto no frontend quanto no backend.
              </p>

              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projetos Concluídos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">1</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>

            <div 
              ref={addToAnimationRef}
              className="flex justify-center opacity-0 scale-95 transition-all duration-1000 ease-out delay-400"
            >
              <div className="card">
                <div className="w-full h-full object-cover rounded-[15px] p-1">
                <img 
                  src={perfilImage} 
                  alt="Robert M. Albok - Desenvolvedor Fullstack" 
                  className="w-full h-full object-cover rounded-[15px]"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={addToAnimationRef}
            className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Habilidades & Tecnologias
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tecnologias com as quais trabalho
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <div 
              ref={addToAnimationRef}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200"
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6 text-center">Frontend</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div 
              ref={addToAnimationRef}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400"
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6 text-center">Ferramentas & Frameworks</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="text-2xl mb-2">{tech.icon}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design & UX */}
            <div 
              ref={addToAnimationRef}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-600"
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6 text-center">Design & UX</h3>
              <div className="space-y-4">
                {[
                  { name: 'UI/UX Design', level: 60 },
                  { name: 'Design Responsivo', level: 40 },
                  { name: 'Figma/Adobe XD', level: 35 }
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={addToAnimationRef}
            className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Alguns dos meus trabalhos recentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                ref={addToAnimationRef}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleProjectAction(project, 'demo')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </button>
                      <button 
                        onClick={() => handleProjectAction(project, 'code')}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Código</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={addToAnimationRef}
            className="text-center mb-10 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Vamos trabalhar juntos no seu próximo projeto
            </p>
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> */}
          <div className="flex flex-col items-center justify-center w-full">
            <div 
              ref={addToAnimationRef}
              className="opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-200 w-[80%]"
            >
              <div className="flex flex-col items-center justify-center w-full">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Vamos nos Conectar</h3>
              <div className="flex space-x-4 my-8">
                  <a 
                    href="https://www.linkedin.com/in/robert-albok-bab8ab2b9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/RobertAlbok" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                    >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://wa.me/5511959942147" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors duration-200 flex items-center space-x-2"
                    >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                    </div>
              <p className="text-lg text-red-600 dark:text-red-400 mb-8 leading-relaxed">
                Estou sempre aberto para discutir novas oportunidades, projetos interessantes 
                ou possíveis colaborações. Sinta-se à vontade para entrar em contato!
              </p>

              {/* <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-medium text-gray-900 dark:text-white">robert@exemplo.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Telefone</div>
                    <div className="font-medium text-gray-900 dark:text-white">+55 (11) 99999-9999</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Localização</div>
                    <div className="font-medium text-gray-900 dark:text-white">Disponível para Trabalho Remoto</div>
                  </div>
                </div>
              </div> */}

                              
            </div>

            {/* <form 
              ref={addToAnimationRef}
              className="space-y-6 opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-400"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Enviar Mensagem
              </button>
            </form> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={addToAnimationRef}
        className="bg-gray-50 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 Robert M. Albok. Todos os direitos reservados.
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-4 md:mt-0">
              Construído com ❤️ usando tecnologias web modernas
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {projectModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
                             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                 {projectModal.type === 'demo' ? (
                   <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
                 ) : (
                   <Code2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                 )}
               </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {projectModal.project?.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {projectModal.type === 'demo' 
                  ? "Este projeto está em desenvolvimento ativo. Em breve estará disponível para demonstração!"
                  : "O código fonte deste projeto será disponibilizado em breve no GitHub. Estou trabalhando na documentação e organização do repositório."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                                 <button
                   onClick={scrollToContact}
                   className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                 >
                   Solicitar Demo
                 </button>
                <button
                  onClick={closeProjectModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;