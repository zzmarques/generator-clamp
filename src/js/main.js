const form = document.querySelector('form');
const btn = document.querySelector('.btn');
const inputs = document.querySelectorAll('input');

const gerarClamp = () => {
    const minFont = +document.querySelector('#min-px').value;
    const maxFont = +document.querySelector('#max-px').value;
    const minViewport = +document.querySelector('#min-viewport').value;
    const maxViewport = +document.querySelector('#max-viewport').value;

    const valorWP = ((maxFont - minFont) / (maxViewport - minViewport)) * 100;
    const base = minFont - (valorWP * minViewport) / 100;

    const clampStr = `clamp(${minFont}px, ${valorWP.toFixed(2)}vw + ${base.toFixed(2)}px, ${maxFont}px)`;
    document.getElementById('resultado').innerText = clampStr;
};

const showError = (input) => {
    input.classList.add('erro');
    const span = document.createElement('span');
    span.textContent = 'adicione um valor';
    span.classList.add('error');
    input.parentNode.appendChild(span);
};

const hiddenError = (input) => {
    const spans = input.parentNode.querySelectorAll('.error');

    if (!input.classList.contains('erro')){
        return;
    };

    input.classList.remove('erro');

    spans.forEach(span => {
        if (span) span.remove();      
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    gerarClamp();
});

btn.addEventListener('click', () => {
    inputs.forEach(input => {
        if (input.value === '') {
            showError(input);
            btn.type = 'button';
        } else {
            hiddenError(input);
        }
    });

    const allInputs = [...inputs].every(i => i.value !== '');
    allInputs ?   btn.type = 'submit' : '';
    
});

