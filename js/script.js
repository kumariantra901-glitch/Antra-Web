/* =============================================================
   ANTRA-WEB — SHARED SCRIPT
   Runs on every page. Reads all brand/content data from
   ANTRA_CONFIG (js/config.js), which must load before this file.
   ============================================================= */
(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init(){
    setYear();
    setActiveNav();
    initHeaderScroll();
    initMobileNav();
    initBackToTop();
    initScrollReveal();
    wireWhatsApp();
    wireEmailButtons();
    initFaq();
    initPortfolio();
    renderFeaturedWork();
    initInquiryForm();
  }

  /* ---------- footer year ---------- */
  function setYear(){
    document.querySelectorAll("[data-year]").forEach(function(el){
      el.textContent = ANTRA_CONFIG.brand.year;
    });
  }

  /* ---------- active nav link ---------- */
  function setActiveNav(){
    var page = (document.body.getAttribute("data-page") || "").toLowerCase();
    document.querySelectorAll("[data-nav-link]").forEach(function(link){
      if(link.getAttribute("data-nav-link") === page){
        link.classList.add("is-active");
      }
    });
  }

  /* ---------- sticky header ---------- */
  function initHeaderScroll(){
    var header = document.querySelector(".site-header");
    if(!header) return;
    function onScroll(){
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {passive:true});
  }

  /* ---------- mobile nav ---------- */
  function initMobileNav(){
    var toggle = document.querySelector("[data-hamburger]");
    var panel = document.querySelector("[data-mobile-nav]");
    var closeBtn = document.querySelector("[data-mobile-nav-close]");
    if(!toggle || !panel) return;

    var lockedScrollY = 0;
    var isOpen = false;

    function lockBodyScroll(){
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = (-lockedScrollY) + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }
    function unlockBodyScroll(){
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, lockedScrollY);
    }

    function open(){
      if(isOpen) return;
      isOpen = true;
      lockBodyScroll();
      panel.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded","true");
      document.body.classList.add("nav-open");
      // Move focus into the panel for keyboard/screen-reader users.
      if(closeBtn) closeBtn.focus({preventScroll:true});
    }
    function close(opts){
      if(!isOpen) return;
      isOpen = false;
      panel.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded","false");
      document.body.classList.remove("nav-open");
      unlockBodyScroll();
      if(!opts || opts.returnFocus !== false) toggle.focus({preventScroll:true});
    }
    toggle.addEventListener("click", function(){
      isOpen ? close() : open();
    });
    if(closeBtn) closeBtn.addEventListener("click", function(){ close(); });
    panel.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ close({returnFocus:false}); });
    });
    window.addEventListener("keydown", function(e){ if(e.key === "Escape") close(); });

    // Simple focus trap while the panel is open.
    panel.addEventListener("keydown", function(e){
      if(e.key !== "Tab" || !isOpen) return;
      var focusable = panel.querySelectorAll('a[href], button:not([disabled])');
      if(!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault(); last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault(); first.focus();
      }
    });

    // Keep the panel usable if a rotation/resize pushes it past the
    // large-screen breakpoint while open (desktop nav takes over).
    window.addEventListener("resize", function(){
      if(isOpen && window.innerWidth > 900) close({returnFocus:false});
    });
  }

  /* ---------- back to top ---------- */
  function initBackToTop(){
    var btn = document.querySelector("[data-back-to-top]");
    if(!btn) return;
    window.addEventListener("scroll", function(){
      btn.classList.toggle("is-visible", window.scrollY > 700);
    }, {passive:true});
    btn.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---------- scroll reveal ---------- */
  function initScrollReveal(){
    var items = document.querySelectorAll("[data-reveal]");
    if(!items.length) return;
    if(!("IntersectionObserver" in window)){
      items.forEach(function(el){ el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:"0px 0px -60px 0px"});
    items.forEach(function(el){ io.observe(el); });

    document.querySelectorAll("[data-reveal-stagger]").forEach(function(group){
      Array.prototype.forEach.call(group.children, function(child, i){
        child.style.setProperty("--i", i);
      });
    });
  }

  /* ---------- WhatsApp CTA ---------- */
  function buildWhatsAppLink(packageName){
    var base = "Hi Antra-Web! I found your website and I'd like to discuss a website project for my business.";
    var msg = packageName
      ? "Hi Antra-Web! I found your website and I'd like to discuss the \"" + packageName + "\" package for my business."
      : base;
    return "https://wa.me/" + ANTRA_CONFIG.contact.whatsappNumber + "?text=" + encodeURIComponent(msg);
  }
  function wireWhatsApp(){
    document.querySelectorAll("[data-whatsapp-link]").forEach(function(el){
      var pkg = el.getAttribute("data-package") || null;
      el.setAttribute("href", buildWhatsAppLink(pkg));
      el.setAttribute("target","_blank");
      el.setAttribute("rel","noopener");
    });
    document.querySelectorAll("[data-whatsapp-display]").forEach(function(el){
      el.textContent = ANTRA_CONFIG.contact.whatsappDisplay;
    });
  }

  /* ---------- email / social buttons ---------- */
  function wireEmailButtons(){
    document.querySelectorAll("[data-email-link]").forEach(function(el){
      el.setAttribute("href", "mailto:" + ANTRA_CONFIG.contact.email);
    });
    document.querySelectorAll("[data-email-display]").forEach(function(el){
      el.textContent = ANTRA_CONFIG.contact.email;
    });
    document.querySelectorAll("[data-instagram-link]").forEach(function(el){
      el.setAttribute("href", ANTRA_CONFIG.contact.instagramUrl);
      el.setAttribute("target","_blank"); el.setAttribute("rel","noopener");
    });
    document.querySelectorAll("[data-facebook-link]").forEach(function(el){
      el.setAttribute("href", ANTRA_CONFIG.contact.facebookUrl);
      el.setAttribute("target","_blank"); el.setAttribute("rel","noopener");
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq(){
    document.querySelectorAll(".faq-item").forEach(function(item){
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if(!q || !a) return;
      a.style.maxHeight = "0px";
      q.addEventListener("click", function(){
        var isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach(function(other){
          if(other !== item){
            other.classList.remove("is-open");
            other.querySelector(".faq-a").style.maxHeight = "0px";
            other.querySelector(".faq-q").setAttribute("aria-expanded","false");
          }
        });
        if(isOpen){
          item.classList.remove("is-open");
          a.style.maxHeight = "0px";
          q.setAttribute("aria-expanded","false");
        } else {
          item.classList.add("is-open");
          a.style.maxHeight = a.scrollHeight + 40 + "px";
          q.setAttribute("aria-expanded","true");
        }
      });
    });
  }

  /* ---------- portfolio grid + filters + modal ---------- */
  var THEME_MAP = {
    "Food & Beverage": "food",
    "Fitness": "fitness",
    "Beauty": "beauty",
    "Home Services": "home",
    "Creative": "creative",
    "Business": "business",
    "Professional Services": "pro"
  };

  function themeBody(category){
    var theme = THEME_MAP[category] || "business";
    switch(theme){
      case "food":
        return '<div class="mock-theme theme-food">' +
          '<div class="row"><div class="chip-round"></div><div class="mock-line w-60"></div><div class="price"></div></div>' +
          '<div class="row"><div class="chip-round"></div><div class="mock-line w-40"></div><div class="price"></div></div>' +
          '<div class="row"><div class="chip-round"></div><div class="mock-line w-80"></div><div class="price"></div></div>' +
        '</div>';
      case "fitness":
        return '<div class="mock-theme theme-fitness">' +
          '<div class="mock-line w-40"></div>' +
          '<div class="stat-row"><div class="stat"><i></i></div><div class="stat"><i></i></div><div class="stat"><i></i></div></div>' +
        '</div>';
      case "beauty":
        return '<div class="mock-theme theme-beauty">' +
          '<div class="mock-line w-60"></div>' +
          '<div class="slot-row"><div class="slot"></div><div class="slot is-picked"></div><div class="slot"></div><div class="slot"></div></div>' +
          '<div class="mock-block" style="height:44px;"></div>' +
        '</div>';
      case "home":
        return '<div class="mock-theme theme-home">' +
          '<div class="check-row"><div class="check"></div><div class="mock-line w-80"></div></div>' +
          '<div class="check-row"><div class="check"></div><div class="mock-line w-60"></div></div>' +
          '<div class="check-row"><div class="check"></div><div class="mock-line w-40"></div></div>' +
        '</div>';
      case "creative":
        return '<div class="mock-theme theme-creative">' +
          '<div class="block-a"></div>' +
          '<div class="stack-b"><div></div><div></div></div>' +
        '</div>';
      case "pro":
        return '<div class="mock-theme theme-pro">' +
          '<div class="appt-row"><div class="dot"></div><div class="mock-line w-80"></div></div>' +
          '<div class="appt-row"><div class="dot"></div><div class="mock-line w-60"></div></div>' +
          '<div class="mock-block" style="height:40px;"></div>' +
        '</div>';
      default:
        return '<div class="mock-theme theme-business">' +
          '<div class="kpi-row"><div class="kpi"></div><div class="kpi"></div></div>' +
          '<div class="trend"><svg viewBox="0 0 100 30" preserveAspectRatio="none"><polyline points="0,26 15,18 30,22 45,10 60,14 75,4 100,8" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent)"/></svg></div>' +
        '</div>';
    }
  }

  function portfolioThumbMarkup(p){
    var bar = '<div class="mock-bar"><span></span><span></span><span></span><span class="url">' + p.title.toLowerCase().replace(/\s+/g,'-') + '.site</span></div>';
    var fallback = '<div class="p-thumb-body">' + themeBody(p.category) + '</div>';
    var img = p.image ? '<img class="p-shot" data-id="' + p.id + '" src="' + p.image + '" alt="' + p.title + ' website preview" loading="lazy" onload="this.classList.add(\'is-loaded\')" onerror="this.remove()">' : '';
    return img + bar + fallback;
  }

  function renderPortfolioGrid(){
    var grid = document.querySelector("[data-portfolio-grid]");
    if(!grid) return;
    var items = ANTRA_CONFIG.portfolio;
    grid.innerHTML = items.map(function(p, i){
      return (
        '<article class="p-card" data-reveal data-category="' + p.category + '" data-index="' + i + '">' +
          '<div class="p-thumb">' + portfolioThumbMarkup(p) + '</div>' +
          '<div class="p-body">' +
            '<span class="p-cat">' + p.category + '</span>' +
            '<h3 class="p-title">' + p.title + '</h3>' +
            '<p class="p-desc">' + p.description + '</p>' +
            '<div class="p-tags">' + p.tags.map(function(t){ return '<span class="p-tag">'+t+'</span>'; }).join('') + '</div>' +
            '<a class="p-link" href="' + p.url + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">View Live Website ' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>' +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll(".p-card").forEach(function(card){
      card.addEventListener("click", function(){
        openProjectModal(items[parseInt(card.getAttribute("data-index"),10)]);
      });
    });
    initScrollReveal();
  }

  function renderFilterBar(){
    var bar = document.querySelector("[data-filter-bar]");
    if(!bar) return;
    bar.innerHTML = ANTRA_CONFIG.portfolioFilters.map(function(f, i){
      return '<button class="filter-chip' + (i===0 ? ' is-active' : '') + '" data-filter="' + f + '">' + f + '</button>';
    }).join('');
    bar.querySelectorAll(".filter-chip").forEach(function(chip){
      chip.addEventListener("click", function(){
        bar.querySelectorAll(".filter-chip").forEach(function(c){ c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        applyFilter(chip.getAttribute("data-filter"));
      });
    });
  }

  function applyFilter(filter){
    document.querySelectorAll("[data-portfolio-grid] .p-card").forEach(function(card){
      var match = filter === "All" || card.getAttribute("data-category") === filter;
      card.classList.toggle("is-hidden", !match);
    });
  }

  function openProjectModal(project){
    var overlay = document.querySelector("[data-project-modal]");
    if(!overlay) return;
    overlay.querySelector("[data-modal-cat]").textContent = project.category;
    overlay.querySelector("[data-modal-title]").textContent = project.title;
    overlay.querySelector("[data-modal-desc]").textContent = "A " + project.category.toLowerCase() + " website concept designed to give " + project.title.toLowerCase() + "-style businesses a clean, modern, and trustworthy online presence.";
    overlay.querySelector("[data-modal-features]").innerHTML = project.tags.map(function(t){ return '<li>'+t+'</li>'; }).join('');
    overlay.querySelector("[data-modal-link]").setAttribute("href", project.url);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeProjectModal(){
    var overlay = document.querySelector("[data-project-modal]");
    if(!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initPortfolio(){
    if(!document.querySelector("[data-portfolio-grid]")) return;
    renderFilterBar();
    renderPortfolioGrid();

    var overlay = document.querySelector("[data-project-modal]");
    if(overlay){
      overlay.addEventListener("click", function(e){ if(e.target === overlay) closeProjectModal(); });
      var closeBtn = overlay.querySelector("[data-modal-close]");
      if(closeBtn) closeBtn.addEventListener("click", closeProjectModal);
      window.addEventListener("keydown", function(e){ if(e.key === "Escape") closeProjectModal(); });
    }
  }

  function renderFeaturedWork(){
    var grid = document.querySelector("[data-featured-grid]");
    if(!grid) return;
    var items = ANTRA_CONFIG.portfolio.filter(function(p){ return p.featured; });
    if(items.length < 6){
      ANTRA_CONFIG.portfolio.forEach(function(p){
        if(items.length < 6 && items.indexOf(p) === -1) items.push(p);
      });
    }
    grid.innerHTML = items.slice(0,6).map(function(p, i){
      return (
        '<article class="p-card" data-reveal style="--i:' + i + '">' +
          '<div class="p-thumb">' + portfolioThumbMarkup(p) + '</div>' +
          '<div class="p-body">' +
            '<span class="p-cat">' + p.category + '</span>' +
            '<h3 class="p-title">' + p.title + '</h3>' +
            '<p class="p-desc">' + p.description + '</p>' +
            '<div class="p-tags">' + p.tags.map(function(t){ return '<span class="p-tag">'+t+'</span>'; }).join('') + '</div>' +
            '<a class="p-link" href="' + p.url + '" target="_blank" rel="noopener">View Live Website ' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>' +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    initScrollReveal();
  }

  /* ---------- inquiry form ---------- */
  function initInquiryForm(){
    var form = document.querySelector("[data-inquiry-form]");
    if(!form) return;

    // Pre-select package from URL (?package=Starter) set by "Choose X" buttons.
    var params = new URLSearchParams(window.location.search);
    var pkgParam = params.get("package");
    if(pkgParam){
      var select = form.querySelector('[name="package"]');
      if(select){
        Array.prototype.forEach.call(select.options, function(opt){
          if(opt.value.toLowerCase() === pkgParam.toLowerCase()) select.value = opt.value;
        });
      }
    }

    // "Do you already have a website?" — reveal the URL field only on Yes.
    var hasWebsiteRadios = form.querySelectorAll('[name="hasWebsite"]');
    var currentWebsiteField = form.querySelector('[data-conditional="currentWebsite"]');
    if(hasWebsiteRadios.length){
      hasWebsiteRadios.forEach(function(r){
        r.addEventListener("change", function(){
          hasWebsiteRadios.forEach(function(other){
            var pill = other.closest(".radio-pill");
            if(pill) pill.classList.toggle("is-checked", other.checked);
          });
          if(currentWebsiteField){
            currentWebsiteField.classList.toggle("is-visible", r.value === "Yes" && r.checked);
          }
        });
      });
    }

    // "Send Inquiry via WhatsApp" — builds a short prefilled message from
    // whatever the visitor has filled in so far (no need to submit first).
    var waInquiryBtn = form.querySelector("[data-whatsapp-inquiry]");
    if(waInquiryBtn){
      waInquiryBtn.addEventListener("click", function(){
        var get = function(name){
          var el = form.querySelector('[name="' + name + '"]');
          return el ? el.value.trim() : "";
        };
        var checked = form.querySelector('[name="hasWebsite"]:checked');
        var lines = ["Hi Antra-Web! I'd like to start a project."];
        if(get("fullName")) lines.push("Name: " + get("fullName"));
        if(get("businessName")) lines.push("Business: " + get("businessName"));
        if(get("projectType")) lines.push("Service needed: " + get("projectType"));
        if(get("package")) lines.push("Package: " + get("package"));
        if(get("details")) lines.push("Details: " + get("details"));
        window.open("https://wa.me/" + ANTRA_CONFIG.contact.whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      });
    }

    var statusBox = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-form-submit]");

    form.addEventListener("submit", function(e){
      e.preventDefault();
      clearErrors(form);

      var errors = validateForm(form);
      if(errors.length){
        errors.forEach(function(fieldName){
          var field = form.querySelector('[name="' + fieldName + '"]');
          if(field) field.closest(".field").classList.add("has-error");
        });
        showStatus(statusBox, "error", "Please fix the highlighted fields before sending.");
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if(firstError) firstError.focus();
        return;
      }

      var endpoint = ANTRA_CONFIG.form.endpoint;
      if(!endpoint){
        showStatus(statusBox, "error", "This form isn't connected to a backend yet. Add a Formspree or Web3Forms endpoint in js/config.js (ANTRA_CONFIG.form.endpoint) to start receiving inquiries.");
        return;
      }

      showStatus(statusBox, "loading", "Sending your inquiry…");
      submitBtn.setAttribute("disabled","true");

      var formData = new FormData(form);
      if(ANTRA_CONFIG.form.web3formsAccessKey){
        formData.append("access_key", ANTRA_CONFIG.form.web3formsAccessKey);
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      }).then(function(res){
        if(res.ok){
          showStatus(statusBox, "success", "Thank you! Your inquiry has been received. I'll get back to you as soon as possible.");
          form.reset();
        } else {
          return res.json().then(function(data){
            throw new Error((data && data.error) || "Submission failed");
          }).catch(function(){
            throw new Error("Submission failed");
          });
        }
      }).catch(function(){
        showStatus(statusBox, "error", "Something went wrong sending your inquiry. Please try again, or reach out directly via email or WhatsApp.");
      }).finally(function(){
        submitBtn.removeAttribute("disabled");
      });
    });
  }

  function validateForm(form){
    var errors = [];
    var required = ["fullName","email","phone","businessName","businessType","projectType","package","hasWebsite","details","consent"];
    required.forEach(function(name){
      var field = form.querySelector('[name="' + name + '"]');
      if(!field) return;
      if(field.type === "checkbox"){
        if(!field.checked) errors.push(name);
        return;
      }
      if(field.type === "radio"){
        if(!form.querySelector('[name="' + name + '"]:checked')) errors.push(name);
        return;
      }
      if(!field.value || !field.value.trim()) errors.push(name);
    });
    var emailField = form.querySelector('[name="email"]');
    if(emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)){
      if(errors.indexOf("email") === -1) errors.push("email");
    }
    var phoneField = form.querySelector('[name="phone"]');
    if(phoneField && phoneField.value && !/^[\d\s()+-]{7,}$/.test(phoneField.value)){
      errors.push("phone");
    }
    return errors;
  }

  function clearErrors(form){
    form.querySelectorAll(".field.has-error").forEach(function(f){ f.classList.remove("has-error"); });
  }

  function showStatus(box, type, message){
    if(!box) return;
    box.className = "form-status is-visible is-" + type;
    box.innerHTML = (type === "loading" ? '<span class="spinner"></span>' : "") + message;
    box.scrollIntoView({behavior:"smooth", block:"nearest"});
  }

})();
