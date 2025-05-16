FROM python:3.12-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY requirements.txt ./

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código para o container
COPY . .

# Expõe a porta padrão do Flask
EXPOSE 5000

# Define a variável de ambiente para o Flask
ENV FLASK_APP=web.py
ENV FLASK_RUN_HOST=0.0.0.0

# Comando para rodar o app
CMD ["python", "web.py"]
