from web import app
from flask import render_template, request
import os
from werkzeug.utils import secure_filename
from PIL import Image
import filtros

UPLOAD_FOLDER = 'static/processed'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('upload.html')

@app.route('/process', methods=['POST'])
def process():
    files = request.files.getlist('images')
    selected_filters = request.form.getlist('filters')
    processed_images = {filtro: [] for filtro in selected_filters}
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            img_original = Image.open(file.stream).convert('RGB')
            for filtro in selected_filters:
                img = img_original.copy()
                if filtro == 'filter1':
                    img = filtros.filtro_negativo(img)
                elif filtro == 'filter2':
                    img = filtros.filtro_blur2(img)
                elif filtro == 'filter3':
                    img = filtros.filtro_blur3(img)
                elif filtro == 'filter4':
                    img = filtros.filtro_escala_cinza(img)
                elif filtro == 'filter5':
                    img = filtros.filtro_preto_branco(img)
                # Nome do arquivo: filtro_nomeoriginal.ext
                name, ext = os.path.splitext(filename)
                filtered_filename = f"{filtro}_{name}{ext}"
                save_path = os.path.join(UPLOAD_FOLDER, filtered_filename)
                img.save(save_path)
                processed_images[filtro].append(filtered_filename)
    # Mapeamento para nomes legíveis
    filter_names = {
        'filter1': 'Filtro Negativo',
        'filter2': 'Filtro da Mediana',
        'filter3': 'Filtro Gaussiano',
        'filter4': 'Filtro Escala de Cinza',
        'filter5': 'Filtro Preto e Branco',
    }
    return render_template('result.html', images=processed_images, filter_names=filter_names)