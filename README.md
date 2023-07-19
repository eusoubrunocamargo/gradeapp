<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Grade+</h1>
    <p>Grade+ é um web app desenvolvivo para auxiliar os estudantes a organizarem sua rotina universitária. O app fornece diversas ferramentas para aumentar a produtividade e o desempenho acadêmico.</p>
    <h2>Features</h2>
    <h2>Funcionalidades</h2>
    <ul>
        <li>Painel: O painel fornece uma visão geral rápida das funcionalidades.</li>
        <li>Matérias: Os usuários podem adicionar e gerenciar suas matérias, incluindo o acompanhamento de seu progresso e notas.</li>
        <li>Minha Semana: Este recurso permite que os usuários planejem sua semana, incluindo sessões de estudo, intervalos e outras atividades.</li>
        <li>Lembretes: Os usuários podem definir lembretes para tarefas importantes e prazos.</li>
        <li>Flashcards: Os usuários podem criar flashcards para revisão rápida de conceitos e fatos-chave.</li>
        <li>Modo Foco: Este recurso fornece um ambiente livre de distrações para sessões de estudo focadas.</li>
        <li>Modo Escuro: Os usuários podem alternar para o modo escuro para uma experiência de visualização mais confortável em condições de pouca luz.</li>
        <li>Temas Personalizáveis: Os usuários podem personalizar a aparência da aplicação alterando o tema de cor principal.</li>
    </ul>
    <h2>Instalação</h2>
    <ol>
        <li>Clone o repositório: <code>git clone https://github.com/Brunocrzz/gradeapp.git</code></li>
        <li>Navegue até o diretório do projeto: <code>cd gradeapp</code></li>
        <li>Instale as dependências: <code>npm install</code></li>
        <li>Inicie o servidor de desenvolvimento: <code>npm run dev</code></li>
    </ol>
    <h2>Configuração das Variáveis de Ambiente</h2>
        <p>Este projeto usa o Supabase para gerenciar o banco de dados e requer algumas variáveis de ambiente para a conexão. As variáveis de ambiente são definidas no arquivo <code>supabase.js</code>.</p>
        <p>As seguintes variáveis de ambiente são necessárias:</p>
        <ul>
            <li><code>SUPABASE_URL</code>: A URL do seu banco de dados Supabase.</li>
            <li><code>SUPABASE_KEY</code>: A chave de acesso ao seu banco de dados Supabase.</li>
        </ul>
        <p>Para definir essas variáveis de ambiente em um ambiente de desenvolvimento, você pode criar um arquivo <code>.env.local</code> na raiz do seu projeto e adicionar as variáveis lá. Por exemplo:</p>
        <pre>
        <code>
        SUPABASE_URL=seu_url_supabase
        SUPABASE_KEY=sua_chave_supabase
        </code>
        </pre>
        <p>Em um ambiente de produção, você deve configurar essas variáveis de ambiente no seu provedor de hospedagem.</p>
        <p><strong>Nota:</strong> Nunca cometa seu arquivo <code>.env.local</code> ou qualquer outro arquivo que contenha suas chaves secretas no controle de versão.</p>
        

  <h2>Uso</h2>
    <ol>
        <li>Registre-se ou faça login em sua conta.</li>
        <li>Adicione suas matérias e comece a acompanhar seu progresso.</li>
        <li>Use o recurso "Minha Semana" para ver os horários e local de aula.</li>
        <li>Defina lembretes para tarefas importantes e prazos.</li>
        <li>Crie flashcards para revisão rápida de conceitos-chave.</li>
        <li>Use o "Modo Foco" para sessões de estudo sem distrações.</li>
        <li>Personalize o tema de acordo com sua preferência.</li>
    </ol>
    <h2>Contribuindo</h2>
    <p>Agradecemos as contribuições da comunidade. Se você deseja contribuir, faça um fork do repositório e faça suas alterações, depois abra um pull request para propor suas alterações.</p>
    <h2>Licença</h2>
    <p>Este projeto está licenciado sob a Licença MIT.</p>
</body>
</html>
