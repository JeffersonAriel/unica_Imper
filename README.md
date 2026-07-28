# Única Impermeabilização e Pisos Especiais

Projeto institucional completo desenvolvido com Next.js 15 (Frontend) e Laravel 12 (Backend CMS).

## Tecnologias Utilizadas
- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Framer Motion, GSAP, Lenis (Smooth Scroll).
- **Backend/API**: Laravel 12, Filament PHP (CMS), SQLite/MySQL.

---

## 🛠️ Ambiente Local de Desenvolvimento

### 1. Rodando o Frontend (Next.js)
\`\`\`bash
# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
\`\`\`
O site estará disponível em \`http://localhost:3000\`.

### 2. Rodando o Backend (Laravel + Filament CMS)
Abra um segundo terminal e navegue para a pasta \`backend/\`:
\`\`\`bash
cd backend

# Instale as dependências do PHP (se ainda não instaladas)
php composer.phar install

# Rode as migrations para criar o banco (SQLite por padrão local)
php artisan migrate

# Crie um usuário admin (caso ainda não tenha criado)
php artisan make:filament-user

# Inicie o servidor da API e CMS
php artisan serve
\`\`\`
O painel administrativo estará disponível em \`http://localhost:8000/admin\`.

---

## 🚀 Guia de Deploy para HostGator (Compartilhada)

Como a hospedagem compartilhada da HostGator (cPanel) não roda Node.js nativamente para SSR, a arquitetura foi planejada em duas partes separadas.

### 1. Exportando e Subindo o Frontend (Next.js)
1. No terminal raiz do projeto, rode:
   \`\`\`bash
   npm run build
   \`\`\`
2. O Next.js irá compilar todo o site para arquivos HTML estáticos na pasta \`/out\`.
3. Acesse o **Gerenciador de Arquivos** no cPanel da HostGator.
4. Navegue até a pasta \`public_html\` (do domínio \`unicaimper.com.br\`).
5. Faça o upload do conteúdo da pasta \`/out\` (incluindo o arquivo \`.htaccess\`).
6. *Pronto! O front-end estático já estará online, super rápido e cacheado.*

### 2. Subindo o Backend (Laravel)
O Laravel precisa ser isolado da pasta pública por questões de segurança.
1. No cPanel, crie um subdomínio para a API (ex: \`api.unicaimper.com.br\`) apontando para \`public_html/api\`.
2. Crie outro subdomínio para o CMS (ex: \`control.unicaimper.com.br\`) apontando para \`public_html/control\`.
3. Compacte a pasta \`backend/\` do seu computador em um ZIP.
4. Faça o upload do ZIP para a **RAIZ** da sua hospedagem (um nível ACIMA do \`public_html\`, por exemplo, \`/home/unicaimper/backend\`). Extraia o arquivo.
5. Edite as variáveis no arquivo \`.env\` do Laravel com os dados do MySQL da HostGator:
   \`\`\`env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=unicaimp_banco
   DB_USERNAME=unicaimp_user
   DB_PASSWORD=sua-senha-aqui
   APP_URL=https://api.unicaimper.com.br
   FRONTEND_URL=https://unicaimper.com.br
   \`\`\`
6. Peça suporte ou utilize o terminal do cPanel para rodar \`php artisan migrate\` no servidor e gerar as tabelas do MySQL.

*(Nota: Como alternativa mais simples, você pode mapear os subdomínios \`api\` e \`control\` diretamente para a pasta \`/home/unicaimper/backend/public\` nas configurações de domínio do cPanel).*
