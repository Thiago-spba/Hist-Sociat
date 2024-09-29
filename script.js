// Efeito de digitação retrô para os títulos
function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(() => {
            elemento.innerHTML += letra;
            if (i === textoArray.length - 1) {
                elemento.setAttribute('aria-label', elemento.textContent);
            }
        }, 75 * i);
    });
}

// Aplicar efeito de digitação aos títulos
document.addEventListener('DOMContentLoaded', () => {
    const titulos = document.querySelectorAll('h1, h2');
    titulos.forEach(titulo => {
        titulo.setAttribute('aria-label', titulo.textContent);
        typeWriter(titulo);
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            targetElement.focus({ preventScroll: true });
        }
    });
});

// Animação de fade-in para os artigos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.setAttribute('aria-hidden', 'false');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.artigo-card').forEach(card => {
    card.setAttribute('aria-hidden', 'true');
    observer.observe(card);
});

// Melhorar a acessibilidade do teclado
function handleFirstTab(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

// Carregar artigos dinamicamente (exemplo)
function carregarArtigo(artigoId) {
    fetch(`/api/artigos/${artigoId}`)
        .then(response => response.json())
        .then(artigo => {
            // Atualizar a seção de conteúdo com os dados recebidos
        });
}

function criarArtigoElement(artigo) {
    const article = document.createElement('article');
    article.className = 'artigo-card';
    article.innerHTML = `
        <h3>${artigo.titulo}</h3>
        <p>${artigo.resumo}</p>
        <a href="artigos/${artigo.slug}.html" class="btn-ler">Ler mais</a>
    `;
    return article;
}

// Chamar a função para carregar artigos quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarArtigos);
// ... (código existente para efeito de digitação e smooth scroll)

// Lidar com cliques nos links dos artigos
document.querySelectorAll('.btn-ler').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Obter o ID do artigo
        mostrarArtigo(targetId);
    });
});

// Função para mostrar o artigo
function mostrarArtigo(artigoId) {
    // Ocultar todos os artigos
    document.querySelectorAll('.artigo-conteudo').forEach(artigo => {
        artigo.style.display = 'none';
    });

    // Exibir o artigo clicado
    const artigoSelecionado = document.getElementById(artigoId);
    if (artigoSelecionado) {
        artigoSelecionado.style.display = 'block';
    }
}