const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

fadeInElements.forEach(el => observer.observe(el));

const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const produtos = document.querySelector('.produtos');

let index = 0;
let totalItems = produtos.children.length;

// Clona os itens para permitir looping visual
function cloneItems() {
    const items = Array.from(produtos.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        produtos.appendChild(clone);
    });
    totalItems = produtos.children.length;
}

cloneItems(); // Chama logo no início

function updateCarousel() {
    const itemWidth = produtos.children[0].offsetWidth + 20; // Inclui o gap
    produtos.style.transition = 'transform 0.3s ease';
    produtos.style.transform = `translateX(-${index * itemWidth}px)`;
}

// Botão para voltar
prevButton.addEventListener('click', () => {
    const itemWidth = produtos.children[0].offsetWidth + 20;

    if (index === 0) {
        index = totalItems / 2; // Volta para o "final visual"
        produtos.style.transition = 'none';
        produtos.style.transform = `translateX(-${index * itemWidth}px)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                index--;
                updateCarousel();
            });
        });
    } else {
        index--;
        updateCarousel();
    }
});

// Botão para avançar
nextButton.addEventListener('click', () => {
    const itemWidth = produtos.children[0].offsetWidth + 20;

    index++;
    updateCarousel();

    if (index >= totalItems / 2) {
        setTimeout(() => {
            produtos.style.transition = 'none';
            index = 0;
            produtos.style.transform = `translateX(0px)`;
        }, 310);
    }
});
