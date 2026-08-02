document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('exhibitTrack');
    const prevBtn = document.getElementById('exhibitPrev');
    const nextBtn = document.getElementById('exhibitNext');
  
    if (!track || !prevBtn || !nextBtn) return;
  
    const getScrollAmount = () => {
      const card = track.querySelector('.exhibit__card');
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      return card.offsetWidth + gap;
    };
  
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  });