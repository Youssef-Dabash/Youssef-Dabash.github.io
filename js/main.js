// دالة تبديل الثيم المباشرة
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  
  // تبديل كلاس dark
  const isDark = html.classList.toggle('dark');

  // تغيير الأيقونة
  if (icon) {
    if (isDark) {
      icon.className = 'fa-solid fa-sun text-amber-400 text-sm pointer-events-none';
    } else {
      icon.className = 'fa-solid fa-moon text-slate-700 text-sm pointer-events-none';
    }
  }

  // حفظ الاختيار بأمان دون أن يتوقف الكود إذا كان المتصفح يمنع التخزين المحلي
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // تجاهل في حالة فتح الملف كـ file://
  }
}

// قراءة الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      if (icon) icon.className = 'fa-solid fa-moon text-slate-700 text-sm pointer-events-none';
    } else {
      document.documentElement.classList.add('dark');
      if (icon) icon.className = 'fa-solid fa-sun text-amber-400 text-sm pointer-events-none';
    }
  } catch (e) {
    // افتراضي داكن
    document.documentElement.classList.add('dark');
  }

  // تفعيل أنيميشن AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  // قائمة الهاتف (Mobile Menu)
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon   = document.getElementById('menu-icon');

  if (menuToggle && mobileMenu && menuIcon) {
    menuToggle.addEventListener('click', () => {
      const willOpen = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      menuIcon.className = willOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  // زر العودة للأعلى
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 450;
      backToTop.classList.toggle('opacity-0', !show);
      backToTop.classList.toggle('pointer-events-none', !show);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});