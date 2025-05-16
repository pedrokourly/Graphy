# Graphy

Graphy é uma plataforma web para aplicar filtros de computação gráfica em imagens de forma simples, rápida e gratuita. Desenvolvido como trabalho para a disciplina de Computação Gráfica (docente André Luiz Batista Franca).

## ✨ Funcionalidades
- Upload de múltiplas imagens (JPG, PNG)
- Aplicação de filtros gráficos clássicos:
  - Filtro Negativo
  - Filtro da Mediana
  - Filtro Gaussiano
  - Filtro Escala de Cinza
  - Filtro Preto e Branco
- Visualização e download das imagens processadas
- Interface intuitiva e responsiva

## 🚀 Como usar
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/graphy.git
   cd graphy
   ```
2. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Execute o app:**
   ```bash
   python web.py
   ```
4. **Acesse no navegador:**
   - http://localhost:5000

## 📁 Estrutura do Projeto
- `web.py` — Inicialização do Flask
- `routes.py` — Rotas e lógica de upload/processamento
- `filtros.py` — Implementação dos filtros de imagem
- `static/` — Imagens, CSS e JS
- `templates/` — Páginas HTML (Jinja2)

## 🖼️ Exemplos de Filtros
Veja exemplos de cada filtro na página inicial do app.

## 🤝 Contribuição
Pull requests são bem-vindos! Sinta-se à vontade para propor melhorias ou novos filtros.

## 📄 Licença
Este projeto está sob a licença MIT.

---
Desenvolvido para fins educacionais.
