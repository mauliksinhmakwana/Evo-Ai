document.addEventListener('DOMContentLoaded', () => {
    // Star background animation
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    };

    const initStars = () => {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.2,
                speed: Math.random() * 0.2 + 0.05,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    // View switching
    window.setView = (view) => {
        document.getElementById('home-view').style.display = view === 'home' ? 'block' : 'none';
        document.getElementById('privacy-view').style.display = view === 'privacy' ? 'block' : 'none';
        document.getElementById('about-view').style.display = view === 'about' ? 'block' : 'none';
        window.scrollTo(0, 0);
    };

    // Scroll to section (ensures home view is active)
    window.scrollToSection = (id) => {
        if (document.getElementById('home-view').style.display !== 'block') {
            setView('home');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll to top
    window.scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});
