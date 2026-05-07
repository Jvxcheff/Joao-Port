/**
 * =================================
 * PORTFÓLIO - LÓGICA DE NAVEGAÇÃO
 * =================================
 */

// ========== NAVEGAÇÃO COM SCROLL SUAVE ==========
/**
 * Função para navegar para uma seção específica com scroll suave
 * @param {string} sectionId - ID da seção para navegar
 */
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Destaque visual temporário
    section.style.animation = 'none';
    setTimeout(() => {
      section.style.animation = '';
    }, 10);
  }
}

// ========== INICIALIZAÇÃO DE EVENTOS ==========
/**
 * Inicializa os eventos dos botões de navegação
 */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      
      // Se o href começa com #, é uma âncora interna
      if (href.startsWith('#')) {
        event.preventDefault();
        const sectionId = href.substring(1);
        
        if (sectionId) {
          navigateToSection(sectionId);
          updateActiveLink(link);
        }
      }
    });
  });
}

/**
 * Atualiza o link ativo na navegação
 * @param {HTMLElement} activeLink - Link ativo
 */
function updateActiveLink(activeLink) {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.style.backgroundColor = '';
  });
  
  activeLink.style.backgroundColor = 'var(--color-accent)';
}

/**
 * Detecta scroll e atualiza link ativo automaticamente
 */
function initializeScrollDetection() {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('nav a');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 100) {
        currentSectionId = section.id;
      }
    });
    
    // Atualiza o link correspondente
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const linkId = href.substring(1);
        
        if (linkId === currentSectionId) {
          updateActiveLink(link);
        } else {
          link.style.backgroundColor = '';
        }
      }
    });
  });
}

/**
 * Adiciona efeito de ripple ao clicar nos botões
 */
function initializeRippleEffect() {
  const buttons = document.querySelectorAll('nav a');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      const rect = this.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.background = 'rgba(255, 255, 255, 0.7)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========== EXECUÇÃO AO CARREGAR PÁGINA ==========
/**
 * Aguarda o carregamento completo do DOM antes de executar
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeScrollDetection();
  initializeRippleEffect();
  
  console.log('✓ Portfólio - Navegação inicializada com sucesso!');
});
