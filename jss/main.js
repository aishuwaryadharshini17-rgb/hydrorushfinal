
console.log('HydroRush JavaScript loaded successfully');

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const progressBars = document.querySelectorAll(".skill-track span[data-progress]");
const statValues = document.querySelectorAll(".stat-card strong");
const aboutHighlightValues = document.querySelectorAll(".about-highlight-item strong, .about-highlight-card strong");
const galleryTrack = document.querySelector(".gallery-track");
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const faqItems = document.querySelectorAll(".faq-item");
const heroVideo = document.querySelector("#heroVideo");
const videoToggle = document.querySelector("#videoToggle");
const muteToggle = document.querySelector("#muteToggle");
const themeToggle = document.querySelector("#themeToggle");
const dirToggle = document.querySelector("#dirToggle");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");
const navActions = document.querySelector(".nav-actions");
const navTools = document.querySelector(".nav-tools");
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialPrev = document.querySelector(".testimonial-prev");
const testimonialNext = document.querySelector(".testimonial-next");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const feedbacksTrack = document.querySelector(".feedbacks-track");
const feedbackCards = document.querySelectorAll(".feedback-card");
const feedbacksPrev = document.querySelector(".feedbacks-prev");
const feedbacksNext = document.querySelector(".feedbacks-next");
const feedbackDots = document.querySelectorAll(".feedbacks-dot");
const pricingTabs = document.querySelectorAll(".pricing-tab");
const pricingPanels = document.querySelectorAll(".pricing-panel");
const scrollTopBtn = document.querySelector("#scrollTopBtn");
const passwordToggle = document.querySelector("[data-password-toggle]");
const passwordField = document.querySelector("[data-password-field]");
const mobileNavActionsBreakpoint = 360;
const mobileDropdownBreakpoint = 992;
const navActionsOriginalParent = navActions?.parentElement ?? null;
const navActionsOriginalNextSibling = navActions?.nextSibling ?? null;
const topLevelNavItems = navLinks ? Array.from(navLinks.children) : [];
const navHomePrimaryItem = topLevelNavItems.find((item) => item.querySelector('a[href="index.html"]')) ?? null;
const navHomeSecondaryItem = topLevelNavItems.find((item) => item.querySelector('a[href="home2.html"]')) ?? null;
let navMobileActionsItem = null;
let navHomeDropdownItem = null;
const revealTargets = document.querySelectorAll(`
    .reveal,
    .reveal-left,
    .reveal-right,
    .section-heading,
    .trust-item,
    .promo-card,
    .service-tile,
    .gallery-slide,
    .package-card,
    .faq-item,
    .wash-intro-media,
    .wash-intro-content,
    .popular-services-heading,
    .about-story-heading,
    .about-story-grid,
    .about-story-media,
    .about-story-content,
    .about-highlight-item,
    .about-highlight-card,
    .about-difference-heading,
    .about-difference-grid,
    .about-difference-item,
    .service-why-copy,
    .service-why-grid,
    .service-why-point,
    .testimonial-slider,
    .popular-service-card,
    .why-copy,
    .why-card,
    .booking-step,
    .contact-booking-card,
    .location-card,
    .testimonial-slide,
    .login-card,
    .register-card,
    .pricing-header,
    .pricing-card,
    .pricing-offer,
    .service-card,
    .experts-panel,
    .stat-card,
    .footer-brand,
    .footer-column,
    .pricing-banner-content,
    .services-header,
    .service-tabs,
    .svc-card,
    .gallery-controls,
    .g-tile,
    .pw-process-header,
    .pw-step,
    .cta-text,
    .cta-image,
    .drive-card,
    .before,
    .after,
    .drive-cta-inner,
    .price-table-section,
    .table-header,
    .table-wrapper,
    .offer-card,
    .contact-header,
    .contact-card,
    .map-content,
    .gallery-category-card,
    .featured-project-card,
    .before-after-item,
    .gallery-heading,
    .service-gallery-section .container,
    .before-after-section .container,
    .featured-projects-section .container,
    .gallery-categories-section .container,
    .service-gallery-card,
    .before-after-heading,
    .featured-projects-heading,
    .gallery-categories-heading,
    .gallery-filters,
    .gallery-item,
    .gallery-cta,
    .home2-why-copy,
    .home2-why-grid,
    .home2-why-card
`);
document.documentElement.classList.add("hr-reveal-ready");

let index = 0;
let galleryIndex = 0;
let testimonialIndex = 0;
let feedbackIndex = 0;

function closeMobileDropdowns(exceptDropdown = null) {
    if (!navLinks) return;

    Array.from(navLinks.children)
        .filter((item) => item.classList?.contains("dropdown"))
        .forEach((dropdown) => {
            if (dropdown === exceptDropdown) return;

            dropdown.classList.remove("mobile-open");

            const toggleLink = dropdown.firstElementChild;
            if (toggleLink?.tagName === "A") {
                toggleLink.setAttribute("aria-expanded", "false");
            }
        });
}

function closeMobileNavigation() {
    if (!navLinks) return;

    navLinks.classList.remove("active");
    closeMobileDropdowns();
    navToggle?.setAttribute("aria-expanded", "false");

    const icon = navToggle?.querySelector("i");
    if (icon) {
        icon.className = "fa-solid fa-bars";
    }
}

function syncMobileHomeDropdown() {
    if (!navLinks || !navHomePrimaryItem || !navHomeSecondaryItem) return;

    const shouldGroupHomeLinks = window.innerWidth <= mobileDropdownBreakpoint;

    if (shouldGroupHomeLinks) {
        if (!navHomeDropdownItem) {
            navHomeDropdownItem = document.createElement("li");
            navHomeDropdownItem.className = "dropdown nav-home-dropdown";

            const homeToggle = document.createElement("a");
            homeToggle.href = "#";
            homeToggle.innerHTML = '<span>Home</span><span class="dropdown-arrow" aria-hidden="true"></span>';

            const homeMenu = document.createElement("ul");
            homeMenu.className = "dropdown-menu";

            navHomeDropdownItem.append(homeToggle, homeMenu);
        }

        const homeMenu = navHomeDropdownItem.querySelector(".dropdown-menu");
        if (!homeMenu) return;

        if (!navHomeDropdownItem.parentElement) {
            navLinks.insertBefore(navHomeDropdownItem, navLinks.firstElementChild);
        }

        if (navHomePrimaryItem.parentElement !== homeMenu) {
            homeMenu.appendChild(navHomePrimaryItem);
        }

        if (navHomeSecondaryItem.parentElement !== homeMenu) {
            homeMenu.appendChild(navHomeSecondaryItem);
        }

        const homeToggle = navHomeDropdownItem.firstElementChild;
        const hasActiveChild = Boolean(homeMenu.querySelector("a.active"));
        if (homeToggle?.tagName === "A") {
            homeToggle.classList.toggle("active", hasActiveChild);
        }

        return;
    }

    if (!navHomeDropdownItem) return;

    if (navHomeSecondaryItem.parentElement) {
        navLinks.insertBefore(navHomeSecondaryItem, navHomeDropdownItem);
    }

    if (navHomePrimaryItem.parentElement) {
        navLinks.insertBefore(navHomePrimaryItem, navHomeSecondaryItem);
    }

    navHomeDropdownItem.remove();
}

function syncMobileDropdownState() {
    if (!navLinks) return;

    const isMobileDropdownView = window.innerWidth <= mobileDropdownBreakpoint;

    Array.from(navLinks.children)
        .filter((item) => item.classList?.contains("dropdown"))
        .forEach((dropdown) => {
            const toggleLink = dropdown.firstElementChild;
            if (toggleLink?.tagName !== "A") return;

            if (!isMobileDropdownView) {
                dropdown.classList.remove("mobile-open");
                toggleLink.removeAttribute("aria-expanded");
                toggleLink.removeAttribute("aria-haspopup");
                return;
            }

            toggleLink.setAttribute("aria-haspopup", "true");
            toggleLink.setAttribute("aria-expanded", dropdown.classList.contains("mobile-open") ? "true" : "false");
        });
}

function syncCompactNavActions() {
    if (!navActions || !navLinks || !navActionsOriginalParent) return;

    const shouldMoveIntoDropdown = window.innerWidth <= mobileNavActionsBreakpoint;

    if (shouldMoveIntoDropdown) {
        if (!navMobileActionsItem) {
            navMobileActionsItem = document.createElement("li");
            navMobileActionsItem.className = "nav-mobile-actions";
        }

        if (!navMobileActionsItem.parentElement) {
            navLinks.appendChild(navMobileActionsItem);
        }

        if (navActions.parentElement !== navMobileActionsItem) {
            navMobileActionsItem.appendChild(navActions);
        }

        return;
    }

    if (navActions.parentElement !== navActionsOriginalParent) {
        if (navActionsOriginalNextSibling && navActionsOriginalNextSibling.parentElement === navActionsOriginalParent) {
            navActionsOriginalParent.insertBefore(navActions, navActionsOriginalNextSibling);
        } else {
            navActionsOriginalParent.appendChild(navActions);
        }
    }

    if (navMobileActionsItem?.parentElement) {
        navMobileActionsItem.remove();
    }
}

function applyInnerPageBannerOverlay() {
    const pricingBanners = document.querySelectorAll(".pricing-banner");
    const aboutBanners = document.querySelectorAll(".about-banner-section");

    if (!pricingBanners.length && !aboutBanners.length) return;

    if (!document.querySelector("#innerPageBannerOverlayStyles")) {
        const style = document.createElement("style");
        style.id = "innerPageBannerOverlayStyles";
        style.textContent = `
            .pricing-banner,
            .about-banner-section {
                isolation: isolate;
            }

            .about-banner-image,
            .pricing-banner img {
                z-index: 1;
            }

            .about-banner-overlay,
            .pricing-banner-overlay {
                position: absolute;
                inset: 0;
                z-index: 2;
                pointer-events: none;
                background: linear-gradient(135deg, rgba(2, 12, 24, 0.78) 0%, rgba(6, 36, 70, 0.72) 48%, rgba(14, 111, 191, 0.58) 100%) !important;
            }

            .about-banner-content,
            .pricing-banner-content {
                position: relative;
                z-index: 3;
            }

            body.theme-dark .about-banner-overlay,
            body.theme-dark .pricing-banner-overlay,
            body.theme-dark .contact-banner .pricing-banner-overlay {
                background: linear-gradient(135deg, rgba(1, 8, 18, 0.88) 0%, rgba(6, 31, 61, 0.82) 52%, rgba(10, 90, 162, 0.68) 100%) !important;
            }
        `;

        document.head.appendChild(style);
    }

    const isDarkTheme = document.body.classList.contains("theme-dark");
    const defaultOverlay = isDarkTheme
        ? "linear-gradient(135deg, rgba(1, 8, 18, 0.88) 0%, rgba(6, 31, 61, 0.82) 52%, rgba(10, 90, 162, 0.68) 100%)"
        : "linear-gradient(135deg, rgba(2, 12, 24, 0.78) 0%, rgba(6, 36, 70, 0.72) 48%, rgba(14, 111, 191, 0.58) 100%)";
    const contactOverlay = isDarkTheme
        ? "linear-gradient(135deg, rgba(0, 8, 18, 0.9) 0%, rgba(5, 28, 54, 0.84) 50%, rgba(14, 97, 171, 0.72) 100%)"
        : "linear-gradient(135deg, rgba(4, 18, 36, 0.82) 0%, rgba(8, 47, 90, 0.76) 48%, rgba(20, 122, 208, 0.62) 100%)";

    function styleBannerOverlay(banner, overlay, image, content) {
        if (!overlay) return;

        banner.style.isolation = "isolate";

        if (image) {
            image.style.zIndex = "1";
        }

        overlay.style.setProperty("position", "absolute");
        overlay.style.setProperty("inset", "0");
        overlay.style.setProperty("z-index", "2");
        overlay.style.setProperty("pointer-events", "none");
        overlay.style.setProperty(
            "background",
            banner.classList.contains("contact-banner") ? contactOverlay : defaultOverlay,
            "important"
        );

        if (content) {
            content.style.setProperty("position", "relative");
            content.style.setProperty("z-index", "3");
        }
    }

    pricingBanners.forEach((banner) => {
        let overlay = banner.querySelector(".pricing-banner-overlay");
        const content = banner.querySelector(".pricing-banner-content");
        const image = banner.querySelector("img");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "pricing-banner-overlay";

            if (content) {
                banner.insertBefore(overlay, content);
            } else {
                banner.appendChild(overlay);
            }
        }

        styleBannerOverlay(banner, overlay, image, content);
    });

    aboutBanners.forEach((banner) => {
        let overlay = banner.querySelector(".about-banner-overlay");
        const content = banner.querySelector(".about-banner-content");
        const image = banner.querySelector(".about-banner-image, img");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "about-banner-overlay";

            if (content) {
                banner.insertBefore(overlay, content);
            } else {
                banner.appendChild(overlay);
            }
        }

        styleBannerOverlay(banner, overlay, image, content);
    });
}

applyInnerPageBannerOverlay();

function applyHomePageCardAlignment() {
    const hasHomeSlider = document.querySelector(".hero-slider");
    const featureBoxes = document.querySelectorAll(".app-features .feature-box");
    const packageCards = document.querySelectorAll(".packages-grid .package-card");

    if (!hasHomeSlider || (!featureBoxes.length && !packageCards.length)) return;

    if (document.querySelector("#homePageCardAlignmentStyles")) return;

    const style = document.createElement("style");
    style.id = "homePageCardAlignmentStyles";
    style.textContent = `
        .app-features {
            align-items: stretch;
        }

        .app-features .feature-box {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .app-features .feature-box p {
            flex: 1;
        }

        .app-features .feature-box a {
            margin-top: auto;
            justify-content: center;
        }

        .packages-grid {
            align-items: stretch;
        }

        .packages-grid .package-card {
            box-sizing: border-box;
            height: 100%;
            padding: 34px 20px 24px !important;
        }

        .packages-grid .package-card-featured {
            transform: none !important;
            padding: 34px 20px 24px !important;
        }

        .packages-grid .package-badge {
            top: -16px;
        }

        .packages-grid .package-label {
            min-height: 20px;
        }

        .packages-grid .package-card h3 {
            min-height: 58px;
        }

        .packages-grid .package-summary {
            min-height: 64px;
        }

        .packages-grid .package-meta {
            min-height: 44px;
        }

        .packages-grid .package-btn {
            margin-top: 0;
        }

        .packages-grid .package-list {
            margin-top: auto;
        }
    `;

    document.head.appendChild(style);
}

applyHomePageCardAlignment();

function applyHeaderLoginButtonStyle() {
    const loginButtons = document.querySelectorAll('.header .nav-actions .btn.secondary[href="login.html"]');

    if (!loginButtons.length) return;

    if (!document.querySelector("#headerLoginButtonStyles")) {
        const style = document.createElement("style");
        style.id = "headerLoginButtonStyles";
        style.textContent = `
            .header .nav-actions .btn.secondary.site-login-btn {
                display: inline-flex !important;
                min-height: 48px;
                padding: 0 28px;
                border: none !important;
                border-radius: 999px;
                background: linear-gradient(135deg, #0a66d6 0%, #00c6ff 100%) !important;
                color: #ffffff !important;
                font-weight: 800;
                letter-spacing: 0.01em;
                line-height: 1;
                text-align: center !important;
                align-items: center !important;
                justify-content: center !important;
                white-space: nowrap;
                box-shadow: 0 12px 28px rgba(0, 198, 255, 0.28);
                transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
            }

            .header .nav-actions .btn.secondary.site-login-btn:hover,
            .header .nav-actions .btn.secondary.site-login-btn:focus-visible {
                transform: translateY(-2px);
                box-shadow: 0 18px 36px rgba(0, 198, 255, 0.36);
                filter: brightness(1.03);
            }

            body.theme-dark .header .nav-actions .btn.secondary.site-login-btn {
                background: linear-gradient(135deg, #1180d8 0%, #0a64b7 100%) !important;
                color: #ffffff !important;
            }
        `;

        document.head.appendChild(style);
    }

    loginButtons.forEach((button) => {
        button.classList.add("site-login-btn");
    });
}

applyHeaderLoginButtonStyle();

function applyFooterYear() {
    const footerYears = document.querySelectorAll(".footer-year");

    if (!footerYears.length) return;

    const currentYear = String(new Date().getFullYear());

    footerYears.forEach((footerYear) => {
        footerYear.textContent = currentYear;
    });
}

applyFooterYear();

function applyHome2SectionSpacing() {
    if (!document.body.classList.contains("home2-page")) return;
    if (!document.querySelector(".booking-process-section") || !document.querySelector(".testimonials-section")) return;
    if (document.querySelector("#home2SectionSpacingStyles")) return;

    const style = document.createElement("style");
    style.id = "home2SectionSpacingStyles";
    style.textContent = `
        body.home2-page .contact-section {
            padding-bottom: 124px !important;
        }

        body.home2-page .testimonials-section {
            padding-top: 28px !important;
        }

        @media (max-width: 768px) {
            body.home2-page .contact-section {
                padding-bottom: 96px !important;
            }

            body.home2-page .testimonials-section {
                padding-top: 22px !important;
            }
        }
    `;

    document.head.appendChild(style);
}

applyHome2SectionSpacing();

function applyPressureWashingProcessTextColor() {
    if (!document.querySelector(".pw-process-section")) return;
    if (document.querySelector("#pwProcessTextColorStyles")) return;

    const style = document.createElement("style");
    style.id = "pwProcessTextColorStyles";
    style.textContent = `
        .pw-process-section .section-kicker,
        .pw-process-section .pw-process-header h2,
        .pw-process-section .pw-process-header p,
        .pw-process-section .pw-step-number,
        .pw-process-section .pw-step h3,
        .pw-process-section .pw-step p {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }

        .pw-process-section .pw-process-header p,
        .pw-process-section .pw-step p {
            opacity: 1 !important;
        }
    `;

    document.head.appendChild(style);
}

applyPressureWashingProcessTextColor();

function applyServicesSectionTabStyle() {
    if (!document.querySelector(".services-section")) return;
    if (document.querySelector("#servicesSectionTabStyles")) return;

    const style = document.createElement("style");
    style.id = "servicesSectionTabStyles";
    style.textContent = `
        .services-section .services-header h2 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }

        .services-section .service-tabs,
        .services-section .service-tabs-inner {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border: none !important;
            gap: 12px;
        }

        .services-section .service-tabs .tab {
            background: transparent !important;
            color: #ffffff !important;
            border: 1.5px solid rgba(255, 255, 255, 0.46) !important;
            box-shadow: none !important;
        }

        .services-section .service-tabs .tab.active {
            background: linear-gradient(135deg, #0a66d6 0%, #00c6ff 100%) !important;
            color: #ffffff !important;
            border-color: transparent !important;
        }

        .services-section .service-tabs .tab:not(.active):hover {
            background: rgba(255, 255, 255, 0.08) !important;
            border-color: rgba(255, 255, 255, 0.64) !important;
        }

        .services-section .services-container {
            align-items: stretch;
        }

        .services-section .service-card {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .services-section .service-card.hide {
            display: none !important;
        }

        .services-section .service-content {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: flex-start;
            padding: 22px 20px;
        }

        .services-section .service-content h3 {
            min-height: 48px;
            margin-bottom: 10px;
        }

        .services-section .service-content p {
            flex: 1;
            margin-bottom: 20px;
        }

        .services-section .service-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            min-height: 42px;
            margin-top: auto;
        }

        .services-section .service-footer a {
            display: inline-flex;
            align-items: center;
            min-height: 42px;
            line-height: 1;
        }

        .services-section .service-footer .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .services-section .service-footer .icon i {
            display: block;
            line-height: 1;
            font-size: 1rem;
        }
    `;

    document.head.appendChild(style);
}

applyServicesSectionTabStyle();

function applyBeforeAfterTickRemoval() {
    if (!document.querySelector(".before-after-points")) return;
    if (document.querySelector("#beforeAfterTickRemovalStyles")) return;

    const style = document.createElement("style");
    style.id = "beforeAfterTickRemovalStyles";
    style.textContent = `
        .before-after-points {
            list-style: none;
            padding-left: 0;
            margin: 0 0 20px;
        }

        .before-after-points li {
            padding-left: 0;
        }

        .before-after-points li i {
            display: none !important;
        }
    `;

    document.head.appendChild(style);
}

applyBeforeAfterTickRemoval();

function applyExteriorWorkHeadingAlignment() {
    if (!document.querySelector(".exterior-work-section .gallery-controls")) return;
    if (document.querySelector("#exteriorWorkHeadingStyles")) return;

    const style = document.createElement("style");
    style.id = "exteriorWorkHeadingStyles";
    style.textContent = `
        .exterior-work-section .gallery-controls {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: end;
            gap: 24px 40px;
        }

        .exterior-work-section .gallery-controls > div:first-child {
            justify-self: start;
            width: 100%;
            max-width: 760px;
        }

        .exterior-work-section .gallery-controls > div:first-child .section-kicker,
        .exterior-work-section .gallery-controls > div:first-child .section-heading,
        .exterior-work-section .gallery-controls > div:first-child h2 {
            text-align: left !important;
            justify-content: flex-start !important;
            margin-left: 0 !important;
            margin-right: auto !important;
        }

        .exterior-work-section .gallery-controls > div:first-child h2 {
            max-width: 720px;
        }

        @media (max-width: 900px) {
            .exterior-work-section .gallery-controls {
                grid-template-columns: 1fr;
                align-items: start;
            }

            .exterior-work-section .gallery-controls > div:last-child {
                justify-self: start;
            }

            .exterior-work-section .gallery-count {
                text-align: left !important;
            }
        }
    `;

    document.head.appendChild(style);
}

applyExteriorWorkHeadingAlignment();

function applyRoofServicesHeadingStyle() {
    if (!document.querySelector(".roof-services-section .services-header h2")) return;
    if (document.querySelector("#roofServicesHeadingStyles")) return;

        const style = document.createElement("style");
        style.id = "roofServicesHeadingStyles";
        style.textContent = `
        .roof-services-section .services-header h2 {
            font-size: clamp(2.2rem, 4.4vw, 3.4rem) !important;
            font-weight: 900 !important;
            line-height: 1.08 !important;
            letter-spacing: -0.02em;
        }
    `;

    document.head.appendChild(style);
}

applyRoofServicesHeadingStyle();

function applyDrivewayCtaIcons() {
    const featureItems = document.querySelectorAll(".drive-cta .cta-features div");

    if (!featureItems.length) return;

    featureItems.forEach((item) => {
        const text = item.textContent.replace(/\s+/g, " ").trim().toLowerCase();
        let iconClass = "";

        if (text.includes("fast service")) {
            iconClass = "fa-solid fa-bolt";
        } else if (text.includes("safe cleaning")) {
            iconClass = "fa-solid fa-shield-halved";
        } else if (text.includes("guaranteed results")) {
            iconClass = "fa-solid fa-circle-check";
        }

        if (!iconClass) return;

        let icon = item.querySelector("i");

        if (!icon) {
            icon = document.createElement("i");
            item.insertBefore(icon, item.firstChild);
        }

        icon.className = iconClass;
        icon.setAttribute("aria-hidden", "true");
    });
}

applyDrivewayCtaIcons();

function applyPricingPlanPointAlignment() {
    if (!document.querySelector(".pricing-section .price-card")) return;
    if (document.querySelector("#pricingPlanPointAlignmentStyles")) return;

    const style = document.createElement("style");
    style.id = "pricingPlanPointAlignmentStyles";
    style.textContent = `
        .pricing-section .price-card ul {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: max-content;
            max-width: 100%;
            margin: 30px auto 35px;
            text-align: left;
        }

        .pricing-section .price-card li {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            text-align: left;
        }

        .pricing-section .price-card li i {
            width: 18px;
            min-width: 18px;
            text-align: center;
            margin-right: 10px;
        }

        html[dir="rtl"] .pricing-section .price-card ul {
            align-items: flex-end;
            text-align: right;
        }

        html[dir="rtl"] .pricing-section .price-card li {
            text-align: right;
        }

        html[dir="rtl"] .pricing-section .price-card li i {
            margin-right: 0;
            margin-left: 10px;
        }
    `;

    document.head.appendChild(style);
}

applyPricingPlanPointAlignment();

function applyPricingOffersContrast() {
    if (!document.querySelector(".offers-section .offer-card")) return;
    if (document.querySelector("#pricingOffersContrastStyles")) return;

    const style = document.createElement("style");
    style.id = "pricingOffersContrastStyles";
    style.textContent = `
        .offers-section .offer-card {
            background: linear-gradient(135deg, #07264a 0%, #0d5fb0 52%, #1498fb 100%) !important;
            color: #ffffff !important;
        }

        .offers-section .offer-card h3 {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            font-weight: 800;
            text-shadow: 0 1px 10px rgba(0, 0, 0, 0.12);
        }

        .offers-section .offer-card p {
            color: rgba(255, 255, 255, 0.96) !important;
            opacity: 1 !important;
        }

        body.theme-dark .offers-section .offer-card {
            background: linear-gradient(135deg, #091a30 0%, #10345f 55%, #145ea5 100%) !important;
        }
    `;

    document.head.appendChild(style);
}

applyPricingOffersContrast();

function applyContactPageFixes() {
    const isContactPage = document.querySelector(".contact-banner") && document.querySelector(".contact-section") && document.querySelector(".map-section");

    if (!isContactPage) return;
    if (document.querySelector("#contactPageFixStyles")) return;

    const style = document.createElement("style");
    style.id = "contactPageFixStyles";
    style.textContent = `
        .contact-section .contact-item,
        .map-section .location-card {
            display: grid !important;
            grid-template-columns: 56px minmax(0, 1fr);
            align-items: start;
            gap: 16px;
            padding: 24px 22px;
        }

        .contact-section .contact-icon,
        .map-section .location-icon {
            width: 48px !important;
            height: 48px !important;
            min-width: 48px;
            border-radius: 14px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            align-self: start !important;
            background: linear-gradient(135deg, rgba(10, 102, 214, 0.12) 0%, rgba(0, 198, 255, 0.16) 100%) !important;
            color: #0a66d6 !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .contact-section .contact-icon i,
        .map-section .location-icon i {
            font-size: 1.05rem !important;
            line-height: 1 !important;
            color: #0a66d6 !important;
            margin: 0 !important;
        }

        .contact-section .contact-content,
        .map-section .location-content {
            min-width: 0;
        }

        .contact-section .contact-content h3,
        .map-section .location-content h3 {
            margin-bottom: 8px;
            color: #081a33 !important;
            -webkit-text-fill-color: #081a33 !important;
            font-size: 1.08rem;
            font-weight: 800;
            line-height: 1.25;
        }

        .contact-section .contact-content p,
        .contact-section .contact-content span,
        .map-section .location-content p,
        .map-section .location-content span,
        .map-section .map-header p,
        .contact-section .contact-header p {
            color: #4f6278 !important;
            -webkit-text-fill-color: #4f6278 !important;
            opacity: 1 !important;
            line-height: 1.7;
        }

        .map-section .location-content p {
            font-size: 0.96rem;
        }

        body.theme-dark .contact-section .contact-content h3,
        body.theme-dark .map-section .location-content h3 {
            color: #eef7ff !important;
            -webkit-text-fill-color: #eef7ff !important;
        }

        body.theme-dark .contact-section .contact-content p,
        body.theme-dark .contact-section .contact-content span,
        body.theme-dark .map-section .location-content p,
        body.theme-dark .map-section .location-content span,
        body.theme-dark .map-section .map-header p,
        body.theme-dark .contact-section .contact-header p {
            color: rgba(231, 243, 255, 0.84) !important;
            -webkit-text-fill-color: rgba(231, 243, 255, 0.84) !important;
        }

        body.theme-dark .contact-section .contact-icon,
        body.theme-dark .map-section .location-icon {
            background: linear-gradient(135deg, rgba(17, 128, 216, 0.18) 0%, rgba(10, 100, 183, 0.24) 100%) !important;
        }

        body.theme-dark .contact-section .contact-icon i,
        body.theme-dark .map-section .location-icon i {
            color: #7fd6ff !important;
        }

        .site-footer .footer-brand p,
        .site-footer .footer-column h3,
        .site-footer .footer-column a,
        .site-footer .footer-column li,
        .site-footer .footer-contact li,
        .site-footer .footer-contact span,
        .site-footer .footer-bottom,
        .site-footer .footer-bottom a {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            opacity: 1 !important;
        }

        .site-footer .footer-column a,
        .site-footer .footer-contact li,
        .site-footer .footer-contact span,
        .site-footer .footer-brand p {
            text-shadow: 0 1px 12px rgba(0, 0, 0, 0.14);
        }

        .site-footer .footer-contact li {
            gap: 10px;
            align-items: flex-start;
        }

        .site-footer .footer-contact i {
            margin-top: 3px;
            min-width: 16px;
            font-size: 0.95rem;
            color: #ffffff !important;
        }

        @media (max-width: 768px) {
            .contact-section .contact-item,
            .map-section .location-card {
                grid-template-columns: 48px minmax(0, 1fr);
                gap: 14px;
                padding: 20px 18px;
            }

            .contact-section .contact-icon,
            .map-section .location-icon {
                width: 42px !important;
                height: 42px !important;
                min-width: 42px;
                border-radius: 12px !important;
            }

            .contact-section .contact-icon i,
            .map-section .location-icon i {
                font-size: 0.98rem !important;
            }
        }
    `;

    document.head.appendChild(style);
}

applyContactPageFixes();

function syncHeaderDirection(direction) {
    if (!navbar || !logo || !navLinks || !navActions) return;

    const isRTL = direction === "rtl";

    navbar.style.flexDirection = isRTL ? "row-reverse" : "row";
    navbar.style.justifyContent = "flex-start";

    logo.style.order = isRTL ? "3" : "1";
    navLinks.style.order = isRTL ? "2" : "2";
    navActions.style.order = isRTL ? "1" : "3";

    navLinks.style.flexDirection = isRTL ? "row-reverse" : "row";
    navLinks.style.justifyContent = "center";

    navActions.style.flexDirection = isRTL ? "row-reverse" : "row";
    navActions.style.marginLeft = isRTL ? "0" : "auto";
    navActions.style.marginRight = isRTL ? "auto" : "0";

    if (navTools) {
        navTools.style.flexDirection = isRTL ? "row-reverse" : "row";
    }

    if (navToggle) {
        navToggle.style.order = "4";
        navToggle.style.marginLeft = isRTL ? "12px" : "0";
        navToggle.style.marginRight = isRTL ? "0" : "12px";
    }

    if (window.innerWidth <= 992) {
        logo.style.order = "1";
        if (navToggle) {
            navToggle.style.order = "2";
        }
        navActions.style.order = isRTL ? "3" : "3";
        navLinks.style.order = "4";

        navbar.style.flexDirection = isRTL ? "row-reverse" : "row";
        navActions.style.marginLeft = isRTL ? "0" : "auto";
        navActions.style.marginRight = isRTL ? "auto" : "0";
        navLinks.style.flexDirection = "column";
    }

    syncMobileHomeDropdown();
    syncCompactNavActions();
    syncMobileDropdownState();
}

function syncEnglishContentDirection(direction) {
    const isRTL = direction === "rtl";
    const selectors = [
        ".hero-slider .content",
        ".slide .content",
        ".hero-video-content",
        ".pricing-banner-content",
        ".about-banner-content",
        ".hero-gallery-content",
        ".banner-content",
        ".section-heading",
        ".services-header",
        ".app-header",
        ".table-header",
        ".faq-header",
        ".map-header",
        ".contact-header",
        ".pricing-header",
        ".about-story-heading",
        ".about-story-content",
        ".about-story-quote",
        ".about-difference-heading",
        ".about-difference-item > div",
        ".service-why-copy",
        ".service-why-point",
        ".why-copy",
        ".why-card",
        ".wash-intro-content",
        ".home2-why-copy",
        ".home2-why-card",
        ".benefits-header",
        ".benefit-text",
        ".cta-text",
        ".gallery-cta",
        ".trust-item > div",
        ".promo-copy",
        ".service-tile-card",
        ".feature-box",
        ".package-card",
        ".price-card",
        ".offer-card",
        ".pricing-card",
        ".pricing-offer",
        ".service-card .service-content",
        ".svc-body",
        ".drive-text",
        ".drive-card",
        ".contact-content",
        ".location-content",
        ".testimonial-slide",
        ".feedback-card",
        ".booking-step",
        ".pw-process-header",
        ".pw-step",
        ".experts-copy",
        ".dw-copy",
        ".dw-results-copy",
        ".dw-cta-copy",
        ".dw-card",
        ".dw-state",
        ".dw-step",
        ".dw-trust article",
        ".dw-cta-side article",
        ".footer-brand",
        ".footer-column",
        ".footer-contact li",
    ];

    document.querySelectorAll(selectors.join(",")).forEach((element) => {
        if (isRTL) {
            element.setAttribute("dir", "ltr");
        } else if (element.getAttribute("dir") === "ltr") {
            element.removeAttribute("dir");
        }
    });
}

function syncInteractiveTrackDirection(direction) {
    const isRTL = direction === "rtl";
    const tracks = [galleryTrack, testimonialTrack, feedbacksTrack];

    tracks.forEach((track) => {
        if (!track) return;

        if (isRTL) {
            track.setAttribute("dir", "ltr");
            track.style.flexDirection = "row";
        } else {
            if (track.getAttribute("dir") === "ltr") {
                track.removeAttribute("dir");
            }
            track.style.flexDirection = "row";
        }
    });
}

function applyDirection(direction) {
    const nextDirection = direction === "rtl" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", nextDirection);
    document.body.classList.toggle("rtl-mode", nextDirection === "rtl");
    localStorage.setItem("hydrorush-direction", nextDirection);

    const label = dirToggle?.querySelector(".dir-label");
    if (label) {
        label.textContent = nextDirection.toUpperCase();
    }

    syncHeaderDirection(nextDirection);
    syncEnglishContentDirection(nextDirection);
    syncInteractiveTrackDirection(nextDirection);
    updateGallery();
    updateTestimonials();
    updateFeedbacks();
}

function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
    localStorage.setItem("hydrorush-theme", nextTheme);

    const icon = themeToggle?.querySelector("i");
    if (icon) {
        icon.className = nextTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
}

function showSlide(i) {
    if (!slides.length) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

applyTheme(localStorage.getItem("hydrorush-theme"));

const initialDirection = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
const directionPreferenceVersion = "2026-04-13-rtl-default";

if (localStorage.getItem("hydrorush-direction-version") !== directionPreferenceVersion) {
    localStorage.setItem("hydrorush-direction", initialDirection);
    localStorage.setItem("hydrorush-direction-version", directionPreferenceVersion);
}

const savedDirection = localStorage.getItem("hydrorush-direction");
applyDirection(savedDirection ?? initialDirection);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("theme-dark");
        applyTheme(isDark ? "light" : "dark");
    });
}

if (dirToggle) {
    dirToggle.addEventListener("click", () => {
        const currentDirection = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
        applyDirection(currentDirection === "rtl" ? "ltr" : "rtl");
    });
}

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        const icon = navToggle.querySelector("i");
        if (isOpen) {
            icon.className = "fa-solid fa-times";
        } else {
            icon.className = "fa-solid fa-bars";
            closeMobileDropdowns();
        }
    });

    navLinks.addEventListener("click", (event) => {
        const clickedLink = event.target.closest("a");
        if (!clickedLink || !navLinks.contains(clickedLink)) return;

        const parentItem = clickedLink.parentElement;
        const isMobileDropdownToggle = window.innerWidth <= mobileDropdownBreakpoint
            && parentItem?.classList?.contains("dropdown")
            && parentItem.parentElement === navLinks;

        if (isMobileDropdownToggle) {
            event.preventDefault();
            event.stopPropagation();

            const shouldOpen = !parentItem.classList.contains("mobile-open");
            closeMobileDropdowns(parentItem);
            parentItem.classList.toggle("mobile-open", shouldOpen);
            clickedLink.setAttribute("aria-expanded", String(shouldOpen));
            return;
        }

        closeMobileNavigation();
    });
}

window.addEventListener("resize", () => {
    const currentDirection = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    syncHeaderDirection(currentDirection);

    if (window.innerWidth > 992 && navLinks?.classList.contains("active")) {
        closeMobileNavigation();
    }
});

if (passwordToggle && passwordField) {
    passwordToggle.addEventListener("click", () => {
        const isPasswordHidden = passwordField.type === "password";
        passwordField.type = isPasswordHidden ? "text" : "password";
        passwordToggle.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");

        const passwordIcon = passwordToggle.querySelector("i");
        if (passwordIcon) {
            passwordIcon.className = isPasswordHidden ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
    });
}

const registerPasswordToggle = document.querySelector("#registerPasswordToggle");
const registerPasswordField = document.querySelector("#registerPassword");

if (registerPasswordToggle && registerPasswordField) {
    registerPasswordToggle.addEventListener("click", () => {
        const isPasswordHidden = registerPasswordField.type === "password";
        registerPasswordField.type = isPasswordHidden ? "text" : "password";
        registerPasswordToggle.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");

        const passwordIcon = registerPasswordToggle.querySelector("i");
        if (passwordIcon) {
            passwordIcon.className = isPasswordHidden ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        }
    });
}

if (slides.length && next && prev) {
    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 5000);
}

function getGalleryPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function updateGallery() {
    if (!galleryTrack || !gallerySlides.length || !galleryPrev || !galleryNext) return;

    const perView = getGalleryPerView();
    const maxIndex = Math.max(0, gallerySlides.length - perView);
    galleryIndex = Math.min(galleryIndex, maxIndex);

    const slideWidth = gallerySlides[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(galleryTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const offset = galleryIndex * (slideWidth + gap);

    galleryTrack.style.transform = `translateX(-${offset}px)`;
    galleryPrev.disabled = galleryIndex === 0;
    galleryNext.disabled = galleryIndex >= maxIndex;
}

if (galleryTrack && gallerySlides.length && galleryPrev && galleryNext) {
    galleryPrev.addEventListener("click", () => {
        galleryIndex -= 1;
        updateGallery();
    });

    galleryNext.addEventListener("click", () => {
        galleryIndex += 1;
        updateGallery();
    });

    window.addEventListener("resize", updateGallery);
    updateGallery();
}

function updateTestimonials() {
    if (!testimonialTrack || !testimonialSlides.length) return;

    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

    testimonialSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === testimonialIndex);
    });

    testimonialDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === testimonialIndex);
    });
}

function getFeedbacksPerView() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function updateFeedbacks() {
    if (!feedbacksTrack || !feedbackCards.length || !feedbacksPrev || !feedbacksNext) return;

    const perView = getFeedbacksPerView();
    const maxIndex = Math.max(0, feedbackCards.length - perView);
    feedbackIndex = Math.min(feedbackIndex, maxIndex);

    const slideWidth = feedbackCards[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(feedbacksTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const offset = feedbackIndex * (slideWidth + gap);

    feedbacksTrack.style.transform = `translateX(-${offset}px)`;
    feedbacksPrev.disabled = feedbackIndex === 0;
    feedbacksNext.disabled = feedbackIndex >= maxIndex;

    feedbackDots.forEach((dot, dotIndex) => {
        dot.hidden = dotIndex > maxIndex;
        dot.classList.toggle("active", dotIndex === feedbackIndex);
    });
}

if (testimonialTrack && testimonialSlides.length && testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        updateTestimonials();
    });

    testimonialNext.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        updateTestimonials();
    });

    testimonialDots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            testimonialIndex = dotIndex;
            updateTestimonials();
        });
    });

    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        updateTestimonials();
    }, 6000);

    updateTestimonials();
}

if (feedbacksTrack && feedbackCards.length && feedbacksPrev && feedbacksNext) {
    feedbacksPrev.addEventListener("click", () => {
        feedbackIndex -= 1;
        updateFeedbacks();
    });

    feedbacksNext.addEventListener("click", () => {
        feedbackIndex += 1;
        updateFeedbacks();
    });

    feedbackDots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            feedbackIndex = dotIndex;
            updateFeedbacks();
        });
    });

    window.addEventListener("resize", updateFeedbacks);

    setInterval(() => {
        const perView = getFeedbacksPerView();
        const maxIndex = Math.max(0, feedbackCards.length - perView);
        feedbackIndex = feedbackIndex >= maxIndex ? 0 : feedbackIndex + 1;
        updateFeedbacks();
    }, 5000);

    updateFeedbacks();
}

if (pricingTabs.length && pricingPanels.length) {
    pricingTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.priceTab;

            pricingTabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            pricingPanels.forEach((panel) => {
                panel.classList.toggle("active", panel.dataset.pricePanel === target);
            });
        });
    });
}

function updateScrollTopVisibility() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle("is-visible", window.scrollY > 280);
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    updateScrollTopVisibility();
}

function updateVideoButtons() {
    if (!heroVideo) return;

    const videoIcon = videoToggle?.querySelector("i");
    const muteIcon = muteToggle?.querySelector("i");

    if (videoToggle && videoIcon) {
        videoToggle.setAttribute("aria-label", heroVideo.paused ? "Play video" : "Pause video");
        videoIcon.className = heroVideo.paused ? "fa-solid fa-play" : "fa-solid fa-pause";
    }

    if (muteToggle && muteIcon) {
        muteToggle.setAttribute("aria-label", heroVideo.muted ? "Unmute video" : "Mute video");
        muteIcon.className = heroVideo.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    }
}

if (heroVideo && videoToggle && muteToggle) {
    videoToggle.addEventListener("click", () => {
        if (heroVideo.paused) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }

        updateVideoButtons();
    });

    muteToggle.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        updateVideoButtons();
    });

    heroVideo.addEventListener("play", updateVideoButtons);
    heroVideo.addEventListener("pause", updateVideoButtons);
    heroVideo.addEventListener("volumechange", updateVideoButtons);
    updateVideoButtons();
}

if (faqItems.length) {
    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const icon = button?.querySelector("i");

        if (!button) return;

        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach((faqItem) => {
                const faqButton = faqItem.querySelector(".faq-question");
                const faqIcon = faqButton?.querySelector("i");

                faqItem.classList.remove("active");
                faqButton?.setAttribute("aria-expanded", "false");

                if (faqIcon) {
                    faqIcon.classList.remove("fa-minus");
                    faqIcon.classList.add("fa-plus");
                }
            });

            if (!isActive) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });
    });
}

revealTargets.forEach((element, index) => {
    if (!element.classList.contains("reveal-left") && !element.classList.contains("reveal-right")) {
        element.classList.add("reveal");
    }

    element.classList.add(`reveal-delay-${index % 4}`);
});

progressBars.forEach((bar) => {
    bar.style.width = "0%";
});

function animateCounter(element, target) {
    const duration = 1800;
    const startTime = performance.now();
    const originalText = element.dataset.originalText || element.textContent.trim();
    const prefixMatch = originalText.match(/^[^0-9]*/);
    const suffixMatch = originalText.match(/[^0-9]*$/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const suffix = suffixMatch ? suffixMatch[0] : "";

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);

        element.textContent = `${prefix}${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

const expertsSection = document.querySelector(".experts-section");
const statsSection = document.querySelector(".stats-section");
const aboutHighlightsSection = document.querySelector(".about-highlights-strip");

function runSectionCounters(target) {
    if (target.classList.contains("experts-section")) {
        progressBars.forEach((bar) => {
            const progressTarget = Number(bar.dataset.progress || 0);
            bar.style.width = `${progressTarget}%`;
        });
    }

    if (target.classList.contains("stats-section")) {
        statValues.forEach((stat) => {
            const counterTarget = Number(stat.textContent.replace(/[^0-9]/g, ""));

            if (!Number.isNaN(counterTarget)) {
                animateCounter(stat, counterTarget);
            }
        });
    }

    if (target.classList.contains("about-highlights-strip")) {
        aboutHighlightValues.forEach((stat) => {
            stat.dataset.originalText = stat.textContent.trim();
            const counterTarget = Number(stat.textContent.replace(/[^0-9]/g, ""));

            if (!Number.isNaN(counterTarget)) {
                animateCounter(stat, counterTarget);
            }
        });
    }
}

function revealElement(element) {
    element.classList.add("is-visible");
    element.classList.add("in");
}

const revealObserverTargets = [
    expertsSection,
    statsSection,
    aboutHighlightsSection,
    ...Array.from(document.querySelectorAll(".reveal, .reveal-left, .reveal-right")),
].filter((element, index, list) => element && list.indexOf(element) === index);

if ("IntersectionObserver" in window) {
    const animatedSections = new WeakSet();
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting || animatedSections.has(entry.target)) return;

                animatedSections.add(entry.target);
                runSectionCounters(entry.target);
                revealElement(entry.target);
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealObserverTargets.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealObserverTargets.forEach((element) => {
        runSectionCounters(element);
        revealElement(element);
    });
}

const pressureTabs = document.querySelectorAll(".tab[data-type]");
const pressureCards = document.querySelectorAll(".service-card");
const serviceTabs = document.querySelectorAll(".tab[data-tab]");
const serviceCards = document.querySelectorAll(".svc-card");

if (pressureTabs.length && pressureCards.length) {
    pressureTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            pressureTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const type = tab.getAttribute("data-type");

            pressureCards.forEach(card => {
                const category = card.getAttribute("data-category");
                card.classList.toggle("hide", category !== type);
            });
        });
    });
}

if (serviceTabs.length && serviceCards.length) {
    serviceTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            serviceTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            serviceCards.forEach(card => {
                card.classList.toggle("hidden-card", target !== "all" && card.dataset.cat !== target);
            });
        });
    });
}

/* rain drops */
const dc = document.getElementById('dropsContainer');
if (dc) {
  for(let i=0;i<30;i++){
    const d=document.createElement('div');d.className='drop';
    d.style.cssText=`left:${Math.random()*100}%;width:${1+Math.random()*2}px;height:${10+Math.random()*14}px;opacity:${.2+Math.random()*.4};animation-duration:${1.6+Math.random()*2.4}s;animation-delay:${Math.random()*3}s`;
    dc.appendChild(d);
  }
}

/* gallery filter functionality */
const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryTabs = document.querySelectorAll('.g-tab');
const galleryTiles = document.querySelectorAll('.g-tile');
const galleryCountValue = document.querySelector('#gCount');

if (galleryFilterBtns.length && galleryItems.length) {
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const matches = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                item.classList.toggle('is-hidden', !matches);

                if (matches) {
                    item.classList.remove('in');
                    setTimeout(() => item.classList.add('in'), 50);
                }
            });
        });
    });
}

if (galleryTabs.length && galleryTiles.length) {
    const updateGalleryCount = (count) => {
        if (galleryCountValue) {
            galleryCountValue.textContent = String(count);
        }
    };

    galleryTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach((item) => item.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.g || 'all';
            let visibleCount = 0;

            galleryTiles.forEach((tile) => {
                const matches = target === 'all' || tile.dataset.g === target;
                tile.classList.toggle('is-hidden', !matches);

                if (matches) {
                    visibleCount += 1;
                    tile.classList.remove('in');
                    setTimeout(() => tile.classList.add('in'), 40);
                }
            });

            updateGalleryCount(visibleCount);
        });
    });

    updateGalleryCount(galleryTiles.length);
}

/* lightbox */
const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbT=document.getElementById('lbTitle');
const lbD=document.getElementById('lbDesc');

if (lb && lbImg && lbT && lbD) {
  document.querySelectorAll('.g-tile').forEach(tile=>{
    tile.addEventListener('click',()=>{
      lbImg.src=tile.dataset.img;
      lbImg.alt=tile.dataset.title;
      lbT.textContent=tile.dataset.title;
      lbD.textContent=tile.dataset.desc;
      lb.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
}

const closeLb = () => {
  if (lb) {
    lb.classList.remove('open');
  }
  document.body.style.overflow = '';
};

const lbClose = document.getElementById('lbClose');
if (lbClose) {
  lbClose.addEventListener('click', closeLb);
}

if (lb) {
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLb();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLb();
});
