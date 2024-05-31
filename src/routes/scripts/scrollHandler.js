export function handleScroll() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    const onScroll = () => {
        const scrollTop = window.scrollY;
        const maxScroll = 750;
        const opacity = Math.min(scrollTop / maxScroll, 1);
        header.style.backgroundColor = `rgba(255, 240, 225, ${opacity * 1})`; 
        footer.style.backgroundColor = `rgba(255, 240, 225, ${opacity * 1})`; 
    };

    window.addEventListener('scroll', onScroll);

    return () => {
        window.removeEventListener('scroll', onScroll);
    };
}