// ========================================
// Custom Blog JavaScript — Meg's Blog
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ── 1. Scroll Progress Bar ──────────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  
  // ── 2. Dark Mode Toggle ─────────────────────────────────────
  const darkModeBtn = document.createElement('button');
  darkModeBtn.className = 'dark-mode-toggle';
  darkModeBtn.innerHTML = '🌙';
  darkModeBtn.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(darkModeBtn);
  
  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '☀️';
    darkModeBtn.classList.add('dark');
  }
  
  darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    darkModeBtn.innerHTML = isDark ? '☀️' : '🌙';
    darkModeBtn.classList.toggle('dark');
  });
  
  // ── 3. Sticky TOC Sidebar ───────────────────────────────────
  const tocContainer = document.querySelector('.post-toc') || document.querySelector('.toc');
  const mainContent = document.querySelector('.page__content') || document.querySelector('article');
  
  if (tocContainer && mainContent) {
    const tocHTML = tocContainer.innerHTML;
    if (tocHTML.trim()) {
      const sidebar = document.createElement('div');
      sidebar.className = 'toc-sidebar';
      sidebar.innerHTML = '<h4>📑 Table of Contents</h4>' + tocHTML;
      mainContent.parentNode.insertBefore(sidebar, mainContent);
      
      // Highlight active section on scroll
      const headings = sidebar.querySelectorAll('a');
      
      function highlightActiveToc() {
        const scrollPos = window.scrollY + 150;
        
        document.querySelectorAll('h2[id], h3[id]').forEach(function(heading) {
          const top = heading.offsetTop;
          const bottom = top + heading.offsetHeight;
          
          if (scrollPos >= top && scrollPos < bottom) {
            headings.forEach(function(a) {
              a.classList.remove('active');
              if (a.getAttribute('href') === '#' + heading.id) {
                a.classList.add('active');
              }
            });
          }
        });
      }
      
      window.addEventListener('scroll', highlightActiveToc, { passive: true });
      highlightActiveToc();
    }
  }
  
  // ── 4. Smooth Scroll for Anchor Links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ── 5. Image Hover Enhancement ──────────────────────────────
  document.querySelectorAll('img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      // Open image in new tab
      window.open(this.src, '_blank');
    });
  });
  
  // ── 6. Fade-in Animation on Scroll ──────────────────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card, .post-item, .project-card, .related-card, .experience-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // ── 7. Related Posts (auto-detect by tags) ──────────────────
  const currentTags = [];
  document.querySelectorAll('.post-tags .tag').forEach(function(tag) {
    currentTags.push(tag.textContent.trim());
  });
  
  if (currentTags.length > 0) {
    const allPosts = [];
    document.querySelectorAll('.post-item a').forEach(function(link) {
      const postUrl = link.getAttribute('href');
      if (postUrl !== window.location.pathname) {
        allPosts.push({
          url: postUrl,
          title: link.textContent.trim()
        });
      }
    });
    
    // For now, show a "More Posts" section if on a post page
    if (document.querySelector('.post-item')) {
      const relatedSection = document.createElement('div');
      relatedSection.className = 'related-posts';
      relatedSection.innerHTML = `
        <h3>📚 Continue Reading</h3>
        <div class="related-grid">
          ${allPosts.map(function(post) {
            return `
              <div class="related-card">
                <h4><a href="${post.url}">${post.title}</a></h4>
                <a href="${post.url}" class="read-more">Read more</a>
              </div>
            `;
          }).join('')}
        </div>
      `;
      
      const footer = document.querySelector('.site-footer') || document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(relatedSection, footer);
      }
    }
  }
  
  // ── 8. Reading Time Estimation ──────────────────────────────
  document.querySelectorAll('.read-time').forEach(function(el) {
    const text = el.closest('article')?.textContent || el.textContent;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    el.textContent = `⏱️ ${minutes} min read`;
  });
  
  // ── 9. Copy Code Button ─────────────────────────────────────
  document.querySelectorAll('pre').forEach(function(pre) {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(102, 126, 234, 0.9);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.85em;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(copyBtn);
    
    pre.addEventListener('mouseenter', function() {
      copyBtn.style.opacity = '1';
    });
    
    pre.addEventListener('mouseleave', function() {
      copyBtn.style.opacity = '0';
    });
    
    copyBtn.addEventListener('click', function() {
      const code = pre.querySelector('code')?.textContent || pre.textContent;
      navigator.clipboard.writeText(code).then(function() {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(function() {
          copyBtn.textContent = '📋 Copy';
        }, 2000);
      });
    });
  });
  
  // ── 10. Back to Top Button (shown after scrolling) ──────────
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.9);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 9998;
  `;
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(20px)';
    }
  }, { passive: true });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
});
