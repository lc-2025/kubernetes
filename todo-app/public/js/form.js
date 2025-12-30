function handleTodo() {
  const done = document.querySelectorAll('.form__input--done');

  done.forEach((button) => {
    button.addEventListener('click', markTodo);
  });
}

function markTodo(event) {
  event.preventDefault();
  fetch(`http://localhost:4000/todos/${event.target.dataset.id}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'PUT'
  }).then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error '+ response.status);
    }

    window.location.reload();
  }).catch((error) => {
    console.error('Form error', error);
  });
}

handleTodo();
