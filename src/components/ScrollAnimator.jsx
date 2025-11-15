import { useEffect } from 'react';


export default function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('in-view');
          } else {
            
            el.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    const els = document.querySelectorAll('.scroll-animate');
    els.forEach((el) => observer.observe(el));

    
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            if (n.classList && n.classList.contains('scroll-animate')) observer.observe(n);
           
            n.querySelectorAll && n.querySelectorAll('.scroll-animate').forEach((c) => observer.observe(c));
          }
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
