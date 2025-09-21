// Ouve o evento 'DOMContentLoaded', que garante que todo o HTML foi carregado
// antes de qualquer código JavaScript ser executado. É uma boa prática.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Selecionando todos os elementos que vamos usar ---
    const telaAbertura = document.getElementById('abertura');
    const menuPrincipal = document.getElementById('menu-principal');
    const menuItems = document.querySelectorAll('#menu-principal a'); // Pega TODOS os links do menu
    const  voltarButton = document.getElementById('voltar');

    // Selecionando os áudios que você criou
    const somHover = document.getElementById('hover_sfx');
    const somConfirmar = document.getElementById('press_sfx');
    const musicaFundo = document.getElementById('musica_fundo');


    // --- 2. Variável de "Estado" ---
    // Esta variável vai "lembrar" qual opção do menu está selecionada.
    // Começa em 0, que é o primeiro item da lista.
    let itemSelecionadoIndex = 0;


    // --- 3. A Função Principal: Mostrar o Menu ---
    function mostrarMenu() {
        // Esconde a tela de abertura
        telaAbertura.style.display = 'none';

        // Mostra o menu (removendo a classe que o esconde)
        menuPrincipal.classList.remove('escondido');

        // Toca os sons!
        somConfirmar.play();
        musicaFundo.volume = 1; // Define o volume para 30% (ajuste a gosto)
        musicaFundo.play();

        // Define a primeira opção do menu como selecionada por padrão
        atualizarSelecaoDoMenu();

        // IMPORTANTE: Remove os "ouvintes" para que esta função não seja chamada de novo
        document.removeEventListener('click', mostrarMenu);
        document.removeEventListener('keydown', teclaPressionada);
        
        // Adiciona um novo "ouvinte" que só funciona DEPOIS que o menu apareceu
        document.addEventListener('keydown', navegarPeloMenu);
    }


    // --- 4. Funções de Suporte ---

    // Função que atualiza o visual da seleção no menu
    function atualizarSelecaoDoMenu() {
        // Primeiro, remove a classe 'selecionado' de TODOS os itens
        menuItems.forEach(item => {
            item.classList.remove('selecionado');
        });

        // Depois, adiciona a classe 'selecionado' APENAS no item correto
        menuItems[itemSelecionadoIndex].classList.add('selecionado');
    }

    // Função que lida com as teclas ANTES do menu aparecer
    function teclaPressionada(event) {
        // Se qualquer tecla for pressionada, mostra o menu
        mostrarMenu();
    }

    // Função que lida com as teclas DEPOIS que o menu apareceu
    function navegarPeloMenu(event) {
        switch (event.key) {
            case 'ArrowDown': // Seta para baixo
                somHover.currentTime = 0; // Reinicia o som
                somHover.play();
                itemSelecionadoIndex++; // Move para o próximo item
                if (itemSelecionadoIndex >= menuItems.length) {
                    itemSelecionadoIndex = 0; // Se passar do último, volta pro primeiro
                }
                atualizarSelecaoDoMenu();
                break;

            case 'ArrowUp': // Seta para cima
                somHover.currentTime = 0;
                somHover.play();
                itemSelecionadoIndex--; // Move para o item anterior
                if (itemSelecionadoIndex < 0) {
                    itemSelecionadoIndex = menuItems.length - 1; // Se passar do primeiro, vai pro último
                }
                atualizarSelecaoDoMenu();
                break;
            
            case 'Enter': // Tecla Enter
                somConfirmar.play();
                // Redireciona o navegador para a página do link selecionado
                window.location.href = menuItems[itemSelecionadoIndex].href;
                break;
        }
    }


    // --- 5. Adicionando os "Ouvintes" de Eventos Iniciais ---

    // Ouve por um clique em qualquer lugar da tela
    document.addEventListener('click', mostrarMenu);
    
    // Ouve por uma tecla pressionada em qualquer lugar da tela
    document.addEventListener('keydown', teclaPressionada);
    
    // Ouve o mouse passando por cima de cada item do menu para tocar o som de hover
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            somHover.currentTime = 0;
            somHover.play();
            
            // Atualiza a seleção para seguir o mouse também
            itemSelecionadoIndex = index;
            atualizarSelecaoDoMenu();
        });
          setTimeout(() => {
                window.location.href = targetUrl;
            }, 300); 
    });

});