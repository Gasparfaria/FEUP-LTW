const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  // Impede que o formulário seja enviado diretamente para o servidor.
  event.preventDefault();

  // Valida os dados do formulário.
  const username = form.elements['username'].value;
  const password = form.elements['password'].value;

  if (username.trim() === '' || password.trim() === '') {
    alert('Please enter your username and password');
    return;
  }

  // Se todos os dados estiver
  HTMLFormElement.prototype.submit.call(form)
});