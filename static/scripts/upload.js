const dropzone = document.getElementById('dropzone');
const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');

// Clique no input ao clicar no dropzone
dropzone.addEventListener('click', () => imageUpload.click());

// Estilo ao arrastar arquivos
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('bg-light');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('bg-light');
});

// Gerenciar arquivos arrastados
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('bg-light');
    const files = Array.from(e.dataTransfer.files).filter(file => validateFile(file));
    imageUpload.files = createFileList(files);
    displayPreview(files);
});

// Gerenciar arquivos selecionados
imageUpload.addEventListener('change', () => {
    const files = Array.from(imageUpload.files).filter(file => validateFile(file));
    imageUpload.files = createFileList(files);
    displayPreview(files);
});

// Função para validar arquivos
function validateFile(file) {
    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
        alert(`O arquivo ${file.name} não é válido. Apenas arquivos PNG e JPG são permitidos.`);
        return false;
    }
    return true;
}

// Função para criar uma nova FileList
function createFileList(files) {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
}

// Função para exibir pré-visualização
function displayPreview(files) {
    preview.innerHTML = ''; // Limpa a pré-visualização anterior
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const col = document.createElement('div');
            col.classList.add('card-thumbnail', 'align-items-center', 'd-flex', 'justify-content-center', 'position-relative', 'shadow');
            col.innerHTML = `
                <img src="${e.target.result}" class="img-fluid rounded" style="max-width: 100%; max-height: 100%" alt="Imagem">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Excluir"></button>
            `;
            preview.appendChild(col);

            // Adiciona evento para excluir a imagem
            const deleteButton = col.querySelector('.btn-close');
            deleteButton.addEventListener('click', () => {
                col.remove();
                const updatedFiles = Array.from(imageUpload.files).filter((_, i) => i !== index);
                imageUpload.files = createFileList(updatedFiles);
            });
        };
        reader.readAsDataURL(file);
    });
}