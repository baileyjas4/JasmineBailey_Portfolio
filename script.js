function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* Fade-in animations */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

/* Dark mode with smooth transition and localStorage */
const toggle = document.getElementById('themeToggle');

// Check localStorage on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggle.textContent = '☀️';
} else {
  toggle.textContent = '🌙';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  toggle.textContent = isDark ? '☀️' : '🌙';
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* Carousel functionality - REMOVED (now using project carousel for experience page) */

/* Resume download function */
function downloadResume() {
  // Create a link element
  const link = document.createElement('a');
  link.href = './assets/Jasmine_Bailey_Resume.pdf'; // Update with your actual resume path
  link.download = 'Jasmine_Bailey_Resume.pdf';
  link.click();
  
  // If resume doesn't exist yet, show alert
  link.onerror = () => {
    alert('Resume will be available soon! Please check back later.');
  };
}

/* Create floating petals */
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = Math.random() * 100 + '%';
  petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  
  // Random petal shapes
  const shapes = [
    '50% 0 50% 0',
    '0 50% 0 50%',
    '50% 50% 0 0',
    '0 0 50% 50%'
  ];
  petal.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
  
  document.body.appendChild(petal);
  
  // Remove petal after animation
  setTimeout(() => {
    petal.remove();
  }, 15000);
}

// Create petals periodically
setInterval(createPetal, 800);

// Create initial petals
for (let i = 0; i < 8; i++) {
  setTimeout(createPetal, i * 300);
}

/* Create sparkle effect on cursor movement */
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(sparkleTimeout);
  sparkleTimeout = setTimeout(() => {
    createSparkle(e.clientX, e.clientY);
  }, 100);
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

/* Create cursor-following petals */
let lastPetalTime = 0;
const petalInterval = 150; // Create a petal every 150ms

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  
  if (currentTime - lastPetalTime >= petalInterval) {
    createCursorPetal(e.clientX, e.clientY);
    lastPetalTime = currentTime;
  }
});

function createCursorPetal(x, y) {
  const petal = document.createElement('div');
  petal.className = 'cursor-petal';
  petal.style.left = x + 'px';
  petal.style.top = y + 'px';
  
  // Random petal shapes
  const shapes = [
    '50% 0 50% 0',
    '0 50% 0 50%',
    '50% 50% 0 0',
    '0 0 50% 50%'
  ];
  petal.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
  
  document.body.appendChild(petal);
  
  // Remove petal after animation completes
  setTimeout(() => {
    petal.remove();
  }, 2000);
}

/* Image carousel for About page with crossfade */
const profileImages = [
  './assets/IMG_3496.JPG',
  './assets/IMG_8522.JPG'
];

let currentImageIndex = 0;
const profileImageContainer = document.querySelector('.about-image');

if (profileImageContainer) {
  const img1 = document.getElementById('profileImage');
  const img2 = document.createElement('img');
  img2.alt = 'Jasmine Bailey';
  img2.style.opacity = '0';
  img2.style.zIndex = '1';
  img1.style.zIndex = '2';
  profileImageContainer.appendChild(img2);
  
  // Preload next image
  img2.src = profileImages[1];
  
  let useFirstImage = true;
  
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % profileImages.length;
    
    if (useFirstImage) {
      img2.src = profileImages[currentImageIndex];
      img2.style.zIndex = '2';
      img1.style.zIndex = '1';
      setTimeout(() => {
        img2.style.opacity = '1';
        img1.style.opacity = '0';
      }, 50);
    } else {
      img1.src = profileImages[currentImageIndex];
      img1.style.zIndex = '2';
      img2.style.zIndex = '1';
      setTimeout(() => {
        img1.style.opacity = '1';
        img2.style.opacity = '0';
      }, 50);
    }
    
    useFirstImage = !useFirstImage;
  }, 5000);
}

/* Smooth scroll with offset */
document.querySelectorAll('nav button[onclick]').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const onclickAttr = this.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes('scrollTo')) {
      const targetId = onclickAttr.match(/'([^']+)'/)[1];
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

/* Project Carousel for Experience Page */
let currentProjectSlide = 0;
let projectSlides = [];
let projectCarouselInterval = null;
let isTransitioning = false;

function moveProjectCarousel(direction) {
  if (projectSlides.length === 0 || isTransitioning) return;
  
  isTransitioning = true;
  
  currentProjectSlide += direction;
  
  if (currentProjectSlide < 0) {
    currentProjectSlide = projectSlides.length - 1;
  } else if (currentProjectSlide >= projectSlides.length) {
    currentProjectSlide = 0;
  }
  
  updateProjectCarousel();
  
  // Allow next transition after animation completes
  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

function goToProjectSlide(index) {
  if (isTransitioning) return;
  
  currentProjectSlide = index;
  updateProjectCarousel();
  
  // Reset auto-play timer when manually navigating
  if (projectCarouselInterval) {
    clearInterval(projectCarouselInterval);
    startProjectCarouselAutoPlay();
  }
}

function updateProjectCarousel() {
  const track = document.getElementById('projectCarouselTrack');
  const indicators = document.querySelectorAll('#projectIndicators .indicator');
  
  if (!track || projectSlides.length === 0) return;
  
  const slideWidth = projectSlides[0].offsetWidth + 30; // width + gap
  const offset = currentProjectSlide * slideWidth;
  track.style.transform = `translateX(-${offset}px)`;
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentProjectSlide);
  });
}

function startProjectCarouselAutoPlay() {
  // Clear any existing interval
  if (projectCarouselInterval) {
    clearInterval(projectCarouselInterval);
  }
  
  // Start new auto-play interval
  projectCarouselInterval = setInterval(() => {
    if (!isTransitioning) {
      moveProjectCarousel(1);
    }
  }, 15000);
}

// Update carousel on window resize to prevent glitches
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateProjectCarousel();
  }, 250);
});

/* Fetch GitHub repositories and populate experience page carousel */
async function fetchGitHubRepos() {
  const username = 'baileyjas4';
  const projectTrack = document.getElementById('projectCarouselTrack');
  const indicatorsContainer = document.getElementById('projectIndicators');
  
  if (!projectTrack) return; // Only run on experience page
  
  // Specific repos to display with their live URLs
  const selectedRepos = [
    { name: 'JasmineBailey_Portfolio', liveUrl: 'https://github.com/baileyjas4/JasmineBailey_Portfolio' },
    { name: 'pokicards', liveUrl: 'https://baileyjas4.github.io/pokicards/' },
    { name: 'flashcards-a1', liveUrl: 'https://baileyjas4.github.io/flashcards-a1/' },
    { name: 'MoniquesCritique-frontend', liveUrl: 'https://github.com/baileyjas4/MoniquesCritique-frontend' },
    { name: 'MoniquesCritique-backend', liveUrl: 'https://github.com/baileyjas4/MoniquesCritique-backend' },
    { name: 'Taskmanagmentapp', liveUrl: 'https://baileyjas4.github.io/Taskmanagmentapp/' },
    { name: 'React-Counter', liveUrl: 'https://baileyjas4.github.io/React-Counter/' }
  ];
  
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await response.json();
    
    // Clear existing placeholder projects
    projectTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Filter and order repos based on selectedRepos list
    const orderedRepos = selectedRepos
      .map(selected => {
        const repo = repos.find(r => r.name === selected.name);
        if (repo) {
          repo.customLiveUrl = selected.liveUrl;
        }
        return repo;
      })
      .filter(repo => repo !== undefined);
    
    // Create project cards from selected repos
    orderedRepos.forEach((repo, index) => {
      const card = createProjectCard(repo, index);
      projectTrack.appendChild(card);
      
      // Create indicator
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.onclick = () => goToProjectSlide(index);
      indicatorsContainer.appendChild(indicator);
    });
    
    // Add "View All Projects" card at the end
    const viewAllCard = createViewAllCard(orderedRepos.length);
    projectTrack.appendChild(viewAllCard);
    
    // Add indicator for "View All" card
    const viewAllIndicator = document.createElement('div');
    viewAllIndicator.className = 'indicator';
    viewAllIndicator.onclick = () => goToProjectSlide(orderedRepos.length);
    indicatorsContainer.appendChild(viewAllIndicator);
    
    // Store slides for carousel
    projectSlides = document.querySelectorAll('#projectCarouselTrack .project-card');
    
    // Start auto-play carousel
    startProjectCarouselAutoPlay();
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Keep placeholder content if API fails
  }
}

function createViewAllCard(index) {
  const card = document.createElement('div');
  card.className = 'project-card view-all-card';
  
  card.innerHTML = `
    <div class="project-image view-all-image">
      <div class="view-all-content">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
    </div>
    <div class="project-content">
      <h3>View All Projects</h3>
      <p>Explore my complete collection of projects, experiments, and open-source contributions on GitHub. Discover more of my work and see what I'm currently building!</p>
      <div class="project-tech">
        <span class="tech-tag">43+ Repositories</span>
      </div>
      <div class="project-links">
        <a href="https://github.com/baileyjas4" target="_blank" class="github-link view-all-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Visit GitHub Profile
        </a>
      </div>
    </div>
  `;
  
  return card;
}

function createProjectCard(repo, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  // Get language or use default
  const language = repo.language || 'Code';
  
  // Create enhanced description
  const description = enhanceDescription(repo);
  
  // Get topics as tech tags
  const topics = repo.topics || [];
  const techTags = topics.length > 0 ? topics : [language];
  
  // Map repo names to actual image files
  const imageMap = {
    'JasmineBailey_Portfolio': './assets/JasmineBailey_Portfolio.png',
    'pokicards': './assets/pokicards.png',
    'flashcards-a1': './assets/ai-flashcard.png',
    'MoniquesCritique-frontend': './assets/MoniquesCritique-frontend.png',
    'MoniquesCritique-backend': './assets/MoniquesCritique-backend.png',
    'Taskmanagmentapp': './assets/Taskmanagmentapp.png',
    'React-Counter': './assets/React-Counter.png'
  };
  
  // Use actual image if available, otherwise use placeholder
  const imageUrl = imageMap[repo.name] || `https://via.placeholder.com/400x250/E6D5C3/5a4a42?text=${encodeURIComponent(repo.name)}`;
  
  // Use custom live URL if provided, otherwise use repo homepage
  const liveUrl = repo.customLiveUrl || repo.homepage;
  
  card.innerHTML = `
    <div class="project-image">
      <img src="${imageUrl}" alt="${repo.name}" />
    </div>
    <div class="project-content">
      <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
      <p>${description}</p>
      <div class="project-tech">
        ${techTags.slice(0, 4).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${repo.html_url}" target="_blank" class="github-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        ${liveUrl ? `<a href="${liveUrl}" target="_blank" class="live-link">View Live →</a>` : ''}
      </div>
    </div>
  `;
  
  return card;
}

function enhanceDescription(repo) {
  // Special description for the portfolio project
  if (repo.name === 'JasmineBailey_Portfolio') {
    return 'This portfolio website! A responsive, elegant showcase featuring custom animations, floating petals, dynamic GitHub integration, and a beautiful floral design theme. Built with vanilla HTML, CSS, and JavaScript.';
  }
  
  // Special description for pokicards project
  if (repo.name === 'pokicards') {
    return 'A responsive Pokédex dashboard displaying the first 150 Pokémon with search, type filtering, dark/light mode toggle, interactive flip cards with hover animations, and Pokémon cry sounds. Built with PokéAPI.';
  }
  
  // Special description for AI flashcards project
  if (repo.name === 'flashcards-a1') {
    return 'An AI-assisted flashcard application with deck management, card navigation, keyboard controls, and delete functionality. Built collaboratively with AI to refactor code, fix bugs, and enhance features through iterative development.';
  }
  
  // Special description for Task Management App
  if (repo.name === 'Taskmanagmentapp') {
    return 'A comprehensive task management application with due date tracking, overdue notifications, status updates (working/completed), category organization, and filtering by both category and status for efficient task organization.';
  }
  
  // Special description for MoniquesCritique frontend
  if (repo.name === 'MoniquesCritique-frontend') {
    return 'React-based web application for a restaurant discovery platform. Features include user authentication, interactive map integration with Mapbox, real-time search with Yelp API, personalized AI recommendations, and a responsive UI built with React Router and modern component architecture.';
  }
  
  // Special description for MoniquesCritique backend
  if (repo.name === 'MoniquesCritique-backend') {
    return 'RESTful API built with Node.js and Express, featuring JWT authentication, MongoDB database integration, intelligent recommendation algorithm based on user preferences and review history, Yelp API integration for external place data, and comprehensive middleware for security and error handling.';
  }
  
  // If repo has a description, use it
  if (repo.description && repo.description.length > 20) {
    return repo.description;
  }
  
  // Otherwise, create an enhanced description based on repo details
  const language = repo.language || 'code';
  const name = repo.name.toLowerCase();
  const topics = repo.topics || [];
  
  // Language-specific descriptions
  const languageDescriptions = {
    'JavaScript': 'A dynamic JavaScript application showcasing modern web development practices and interactive user experiences.',
    'TypeScript': 'A type-safe TypeScript project demonstrating robust code architecture and scalable development patterns.',
    'HTML': 'A responsive web project featuring clean HTML structure, semantic markup, and modern design principles.',
    'CSS': 'A stylish web design project showcasing advanced CSS techniques, animations, and responsive layouts.',
    'Python': 'A Python application demonstrating clean code principles, efficient algorithms, and practical problem-solving.',
    'Java': 'A Java-based application showcasing object-oriented programming and enterprise-level development practices.',
    'React': 'A modern React application featuring component-based architecture and seamless user interactions.',
    'Vue': 'A Vue.js application demonstrating reactive data binding and elegant component composition.',
    'Node.js': 'A Node.js backend application featuring RESTful APIs and efficient server-side processing.'
  };
  
  // Check for specific project types based on name or topics
  if (name.includes('portfolio') || name.includes('website')) {
    return 'A professional portfolio website showcasing projects, skills, and experience with elegant design and smooth animations.';
  }
  
  if (name.includes('api') || topics.includes('api')) {
    return `A RESTful API built with ${language}, featuring robust endpoints, data validation, and secure authentication.`;
  }
  
  if (name.includes('app') || name.includes('application')) {
    return `A full-featured ${language} application with intuitive UI, responsive design, and optimized performance.`;
  }
  
  if (name.includes('game')) {
    return `An interactive game built with ${language}, featuring engaging gameplay mechanics and smooth animations.`;
  }
  
  if (name.includes('bot') || name.includes('automation')) {
    return `An automation tool built with ${language} to streamline workflows and improve productivity.`;
  }
  
  if (name.includes('dashboard') || name.includes('admin')) {
    return `A comprehensive dashboard application with data visualization, real-time updates, and intuitive controls.`;
  }
  
  if (name.includes('ecommerce') || name.includes('shop') || name.includes('store')) {
    return `An e-commerce platform featuring product management, shopping cart functionality, and secure checkout process.`;
  }
  
  if (topics.includes('react') || topics.includes('vue') || topics.includes('angular')) {
    return `A modern single-page application built with ${topics[0]}, featuring dynamic content and seamless navigation.`;
  }
  
  if (topics.includes('mongodb') || topics.includes('database')) {
    return `A full-stack application with database integration, CRUD operations, and efficient data management.`;
  }
  
  // Use language-specific description if available
  if (languageDescriptions[language]) {
    return languageDescriptions[language];
  }
  
  // Default enhanced description
  return `An innovative ${language} project demonstrating modern development practices, clean code architecture, and creative problem-solving.`;
}

// Run on page load if on experience page
if (document.getElementById('projectCarouselTrack')) {
  fetchGitHubRepos();
}
