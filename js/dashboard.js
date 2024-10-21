/* ASPECT RENDERING */

let aspectLocalStorage =
  JSON.parse(localStorage.getItem("aspectLocalStorage")) || [];

const addAspect = document.querySelector(".add_aspect");
const aspectContainer = document.querySelector(".aspect-container");
const aspectWelcome = document.querySelector(".aspect-welcome");
const aspectAddPopup = document.querySelector(".add-to-aspect");
const addTodoPopup = document.querySelector(".add-to-todo");

for (let i = 0; i < aspectLocalStorage.length; i++) {
  const newAspect = aspectLocalStorage[i];
  const div = document.createElement("div");
  div.className = "aspect";
  div.innerHTML = `
            <h4 class="aspect-head">
              <p class="add-todo dark-text">Aspect(${newAspect.todos.length}): ${newAspect.aspectName} +</p>
              <p>Created ${newAspect.dateSet}</p>
            </h4>
            <section class="todo-container"></section>
            <div class="delete-option">Delete</div>
            `;
  aspectContainer.appendChild(div);

  if (aspectContainer.children.length === 0) {
    const aspectWelcome = document.querySelector(".aspect-welcome");
    aspectWelcome.style.display = "block";
  } else {
    aspectWelcome.style.display = "none";
  }
  const deleteOptionAspect = div.querySelector(".delete-option");
  deleteOptionAspect.onclick = () => {
    const userConfirmedDeletion = confirm("This action cannot be reversed");
    if (userConfirmedDeletion === true) {
      aspectLocalStorage.splice(i, 1);
      localStorage.setItem(
        "aspectLocalStorage",
        JSON.stringify(aspectLocalStorage)
      );
      location.reload();
    } else {
      location.reload();
    }
  };

  /* RENDER TODO */

  const todoContainer = div.querySelector(".todo-container");
  for (let i = 0; i < newAspect.todos.length; i++) {
    const todo = newAspect.todos[i];
    const div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `<p class="light-text">${todo.newTodo}</p>
                <div class="todo-control">
                  <input type="checkbox" />
                     <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
            >
              <path
                fill="black"
                fill-rule="evenodd"
                d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zM9 2H6v1h3zM4 13h7V4H4zm2-8H5v7h1zm1 0h1v7H7zm2 0h1v7H9z"
                clip-rule="evenodd"
              />
            </svg>`;
    todoContainer.appendChild(div);

    if (todo.checked === true) {
      div.style.opacity = "0.8";
      div.querySelector("p").style.textDecoration = "line-through";
      div.querySelector("input").checked = true;
      div.querySelector("input").disabled = true;
    }

    const goalCheckBox = div.querySelector("input");

    goalCheckBox.onclick = () => {
      div.style.opacity = "0.8";
      div.querySelector("p").style.textDecoration = "line-through";
      div.querySelector("input").checked = true;
      div.querySelector("input").disabled = true;
      todo.checked = true;
      localStorage.setItem(
        "aspectLocalStorage",
        JSON.stringify(aspectLocalStorage)
      );
    };

    const deleteOptionTodo = div.querySelector("svg");
    deleteOptionTodo.onclick = () => {
      const userConfirmedTodoDeletion = confirm(
        "This action cannot be reversed"
      );
      if (userConfirmedTodoDeletion === true) {
        newAspect.todos.splice(i, 1);
        localStorage.setItem(
          "aspectLocalStorage",
          JSON.stringify(aspectLocalStorage)
        );
        location.reload();
      } else {
        location.reload();
      }
    };
  }
  /* ADD TODO */

  const addTodo = div.querySelector(".add-todo");
  addTodo.onclick = () => {
    popupBg.classList.add("active");
    addTodoPopup.classList.add("active");
    addTodoPopup.querySelector(".close").onclick = () => {
      popupBg.classList.remove("active");
      addTodoPopup.classList.remove("active");
    };
    addTodoPopup.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTodo = addTodoPopup.querySelector("input").value;
      const newTodoObj = {
        newTodo: newTodo,
        checked: false,
      };
      newAspect.todos.push(newTodoObj);
      localStorage.setItem(
        "aspectLocalStorage",
        JSON.stringify(aspectLocalStorage)
      );
      location.reload();
    });
  };
}

/* ADD ASPECT */

if (aspectLocalStorage.length === 0) {
  aspectWelcome.style.display = "block";
} else {
  aspectWelcome.style.display = "none";
}

addAspect.onclick = () => {
  if (aspectLocalStorage.length >= 4) {
    aspectWelcome.style.display = "block";
    aspectWelcome.textContent = "We recommend 4 aspects at a time :)";
    setTimeout(() => {
      aspectWelcome.style.display = "none";
    }, 3000);
  } else {
    popupBg.classList.add("active");
    aspectAddPopup.classList.add("active");
    aspectAddPopup.querySelector(".close").onclick = () => {
      popupBg.classList.remove("active");
      aspectAddPopup.classList.remove("active");
    };
    aspectAddPopup.addEventListener("submit", (event) => {
      event.preventDefault();
      const newAspect = aspectAddPopup.querySelector("input").value;
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const dateSet = `${month}/${day}/${year}`;
      const aspect = {
        aspectName: newAspect,
        todos: [],
        dateSet: dateSet,
      };
      aspectLocalStorage.push(aspect);
      localStorage.setItem(
        "aspectLocalStorage",
        JSON.stringify(aspectLocalStorage)
      );

      location.reload();
    });
  }
};
