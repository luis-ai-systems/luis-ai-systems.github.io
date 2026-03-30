function toggleMenu() {
  var nav = document.getElementsByClassName("site-header-nav")[0];
  if (nav.style.display == "inline-flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "inline-flex";
  }
}

jQuery(function() {
  // ========================
  // Back to Top
  // ========================
  function toTop () {
    var $toTop = $(".gotop");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css("display", "block").fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on("click", function (evt) {
      var $obj = $("body,html");
      $obj.animate({
        scrollTop: 0
      }, 600, 'swing');

      evt.preventDefault();
    });
  }

  toTop();

  // ========================
  // Sticky Header with Shrink Effect
  // ========================
  var header = document.querySelector('.site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========================
  // Theme Toggle Logic
  // ========================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const html = document.documentElement;

  // Sync body class with html class (set by blocking script in <head>)
  if (html.classList.contains('light-theme')) {
    body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.checked = true;
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      // Add transition class for smooth theme switch
      body.style.transition = 'background-color 0.5s ease, color 0.4s ease';

      if (themeToggle.checked) {
        html.classList.add('light-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.remove('light-theme');
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }

      // Remove transition override after animation
      setTimeout(() => {
        body.style.transition = '';
      }, 600);
    });
  }

  // ========================
  // Intersection Observer - Animate on Scroll
  // ========================
  if ('IntersectionObserver' in window) {
    var animateElements = document.querySelectorAll(
      '.repo-list-item, .boxed-group, .post-directory, .list-group-item, .article-content > h2, .article-content > h3'
    );

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  }

  // ========================
  // Smooth Scroll for Anchor Links
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================
  // Typing effect for subtitle (home page only)
  // ========================
  var subtitleEl = document.getElementById('sub-title');
  if (subtitleEl) {
    var spanEl = subtitleEl.querySelector('span');
    if (spanEl) {
      var text = spanEl.textContent;
      spanEl.textContent = '';
      spanEl.style.borderRight = '2px solid rgba(0, 229, 255, 0.7)';
      var charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          spanEl.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 80 + Math.random() * 40);
        } else {
          // Blink cursor then remove
          setTimeout(function() {
            spanEl.style.borderRight = 'none';
          }, 2000);
        }
      }

      // Small delay before starting
      setTimeout(typeChar, 500);
    }
  }

  // ========================
  // Card tilt effect on hover (subtle parallax)
  // ========================
  var cards = document.querySelectorAll('.repo-list-item');
  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / 30;
      var rotateY = (centerX - x) / 30;

      card.style.transform = 'translateY(-4px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
    });
  });
});
