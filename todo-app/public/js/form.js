function handleForm() {
  const form = document.getElementsByTagName('form')[0];

  //form.addEventListener('submit', saveTodo);
}

function saveTodo(event) {
  event.preventDefault();
  fetch('http://localhost:4000/todos', {
    body: JSON.stringify({
      todo: event.target[0].value
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'POST'
  }).then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error '+ response.status);
    }
  }).catch((error) => {
    console.error('Form error', error);
  });
}

handleForm();
