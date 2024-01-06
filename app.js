document.getElementById('passwordGeneratorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвратить обычную отправку формы

    const length = document.getElementById('length').value;
    const sets = document.getElementById('sets').value;
    const quantity = document.getElementById('quantity').value;

    let passwords = generatePasswords(length, sets, quantity);
    displayPasswords(passwords);
});

function generatePasswords(length, sets, quantity) {
    const numberChars = "0123456789";
    const letterChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let chars = '';
    if (sets === 'numbers') chars += numberChars;
    if (sets === 'letters') chars += letterChars;
    if (sets === 'symbols') chars += symbolChars;

    let passwords = [];
    for (let i = 0; i < quantity; i++) {
        let password = '';
        for (let j = 0; j < length; j++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        passwords.push(password);
    }
    return passwords;
}

function downloadPasswords(passwords) {
    // Создание текстового представления паролей
    const text = passwords.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');

    anchor.download = 'passwords.txt'; // Название скачиваемого файла
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click(); // Инициирование скачивания

    window.URL.revokeObjectURL(anchor.href); // Очистка ресурса
}


function displayPasswords(passwords) {
    // Отображение паролей
    const container = document.getElementById('passwords');
    container.innerHTML = '';
    passwords.forEach(password => {
        container.innerHTML += `<p>${password}</p>`;
    });

    // Скачивание паролей в файл
    downloadPasswords(passwords);
}
