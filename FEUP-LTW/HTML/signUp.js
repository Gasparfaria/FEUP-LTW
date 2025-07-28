const form = document.getElementById('signup-form');

form.addEventListener('submit', (event) => {
  // Impede que o formulário seja enviado diretamente para o servidor.
  event.preventDefault();

  // Valida os dados do formulário.
  const name = form.elements['name'].value;
  const username = form.elements['username'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const confirm_password = form.elements['confirm_password'].value;
  const avatarElement = document.querySelector('input[name="avatar"]:checked');
  const avatar = avatarElement ? avatarElement.value : null;

  if (name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '' || confirm_password.trim() === '' || avatar === null) {
    alert('All fields are mandatory!');
    return;
  }

  if (password !== confirm_password) {
    alert('Passwords do not match');
    return;
  }
  // Se todos os dados estiverem corretos, envia o formulário para o servidor.
  HTMLFormElement.prototype.submit.call(form)
});
