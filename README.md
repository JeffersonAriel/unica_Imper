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
composer install

# Rode as migrations para criar o banco (SQLite por padrão local)
php artisan migrate

# Crie um usuário admin (caso ainda não tenha criado)
php artisan make:filament-user

# Inicie o servidor da API e CMS
php artisan serve
\`\`\`
O painel administrativo estará disponível em \`http://localhost:8000/admin\`.

---

## 🚀 Guia de Deploy para HostGator

O site foi preparado com **Static HTML Export** do Next.js e deploy automatizado via **GitHub Actions** (CI/CD). A cada `git push` na branch `main`, o GitHub compila o site e envia os arquivos otimizados diretamente para o `public_html` da sua HostGator via FTP/FTPS.

### 1. Configurando o Deploy Automático via GitHub Actions

Para ativar o deploy automático:

1. No seu repositório no GitHub, acesse: **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
2. Adicione os seguintes Secrets:
   - `FTP_SERVER`: Endereço do servidor FTP da HostGator (ex: `ftp.unicaimper.com.br` ou o IP/Hostname do servidor cPanel).
   - `FTP_USERNAME`: Usuário FTP da HostGator (ex: `usuario@unicaimper.com.br` ou o usuário principal do cPanel).
   - `FTP_PASSWORD`: Senha do usuário FTP.
   - `FTP_SERVER_DIR` *(opcional)*: Caminho da pasta no servidor (padrão: `./public_html/`).
   - `FTP_PORT` *(opcional)*: Porta do FTP (padrão: `21`).
   - `NEXT_PUBLIC_SITE_URL` *(opcional)*: URL do site (padrão: `https://unicaimper.com.br`).
   - `NEXT_PUBLIC_API_URL` *(opcional)*: URL da API Laravel (padrão: `https://api.unicaimper.com.br`).

3. Agora basta fazer um push para a branch `main`:
   ```bash
   git add .
   git commit -m "Deploy automático HostGator"
   git push origin main
   ```
4. Acompanhe a execução na aba **Actions** do GitHub. O deploy leva aproximadamente 1 a 2 minutos!

---

### 2. Deploy Manual (Alternativa via Gerenciador de Arquivos do cPanel)

Caso precise subir manualmente sem o GitHub Actions:
1. No terminal raiz do projeto, execute:
   ```bash
   npm run build
   ```
2. O Next.js irá compilar todo o site para arquivos HTML estáticos na pasta `/out`.
3. Acesse o **Gerenciador de Arquivos** no cPanel da HostGator.
4. Navegue até a pasta `public_html` (do domínio `unicaimper.com.br`).
5. Faça o upload do conteúdo da pasta `/out` (incluindo o arquivo `.htaccess`).
6. *Pronto! O front-end estático já estará online, super rápido e cacheado.*

---

### 3. Subindo o Backend (Laravel)
O Laravel precisa ser isolado da pasta pública por questões de segurança.
1. No cPanel, crie um subdomínio para a API (ex: `api.unicaimper.com.br`) apontando para `public_html/api`.
2. Crie outro subdomínio para o CMS (ex: `control.unicaimper.com.br`) apontando para `public_html/control`.
3. Compacte a pasta `backend/` do seu computador em um ZIP.
4. Faça o upload do ZIP para a **RAIZ** da sua hospedagem (um nível ACIMA do `public_html`, por exemplo, `/home/unicaimper/backend`). Extraia o arquivo.
5. Copie o arquivo `backend/.env.example` para `backend/.env` e preencha com as credenciais do MySQL gerado no cPanel:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=unicaimp_banco
   DB_USERNAME=unicaimp_user
   DB_PASSWORD=sua-senha-aqui
   APP_URL=https://api.unicaimper.com.br
   FRONTEND_URL=https://unicaimper.com.br
   ```
6. Peça suporte ou utilize o terminal do cPanel para rodar `php artisan migrate` no servidor e gerar as tabelas do MySQL.

*(Nota: Como alternativa mais simples, você pode mapear os subdomínios `api` e `control` diretamente para a pasta `/home/unicaimper/backend/public` nas configurações de domínio do cPanel).*
