function handleForm() {
  const form = document.getElementsByTagName('form')[0];

  form.addEventListener('submit', saveTodo);
}

function saveTodo(event) {
  event.preventDefault();
  console.log('foo');
}

handleForm();
