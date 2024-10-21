const popupBg = document.querySelector(".popup-bg");

const popupFunction = (btn, popupBg, popup) => {
  btn.onclick = () => {
    popupBg.classList.add("active");
    popup.classList.add("active");
    popup.querySelector(".cancel").onclick = () => {
      popupBg.classList.remove("active");
      popup.classList.remove("active");
    };
  };
};

/* RENDER GOAL */

const goalSection = document.querySelector(".goals-section");
const addToGoal = document.querySelector(".goals-head");
const addGoalPopup = document.querySelector(".add-to-goal");
const secondPopup = document.querySelector(".add-to-goal.add_2");
const addGoalForm = document.querySelector(".add-goal-form");

let goalLocalStorage =
  JSON.parse(localStorage.getItem("goalLocalStorage")) || [];

for (let i = 0; i < goalLocalStorage.length; i++) {
  const goal = goalLocalStorage[i];
  const div = document.createElement("div");
  div.className = "goal light";
  div.innerHTML = `
            <p class="light-text">${goal.goal}</p>
            <div class="goal-control">
              <input type="checkbox" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path fill="currentColor" d="M140 176a4 4 0 0 1-4 4a12 12 0 0 1-12-12v-40a4 4 0 0 0-4-4a4 4 0 0 1 0-8a12 12 0 0 1 12 12v40a4 4 0 0 0 4 4a4 4 0 0 1 4 4m-16-84a8 8 0 1 0-8-8a8 8 0 0 0 8 8m104 36A100 100 0 1 1 128 28a100.11 100.11 0 0 1 100 100m-8 0a92 92 0 1 0-92 92a92.1 92.1 0 0 0 92-92"/></svg>
            </div>`;
  goalSection.appendChild(div);

  const lastModifiedDate = document.querySelector(".modified-date");
  lastModifiedDate.textContent = `modified ${goal.dateSet}`;

  if (goal.checked === true) {
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
    goal.checked = true;
    localStorage.setItem("goalLocalStorage", JSON.stringify(goalLocalStorage));
  };

  /* GOAL DETAIL POPUP */

  const goalDetail = document.querySelector(".goal-popup");
  const info = div.querySelector(".goal-control svg");
  info.onclick = () => {
    goalDetail.querySelector(".goal-popup-head div p").innerHTML = goal.goal;
    goalDetail.querySelector(".reason p:last-child").innerHTML = goal.reason;
    goalDetail.querySelector(".goal-date-set").innerHTML = goal.dateSet;
    popupFunction(info, popupBg, goalDetail);
    const deleteGoal = goalDetail.querySelector("div svg");
    deleteGoal.onclick = () => {
      const userConfirmed = confirm("This action cannot be undone");
      if (userConfirmed === true) {
        goalLocalStorage.splice(i, 1);
        localStorage.setItem(
          "goalLocalStorage",
          JSON.stringify(goalLocalStorage)
        );
        location.reload();
      } else {
        location.reload();
      }
    };
  };
}

/* ADD GOAL */

addToGoal.onclick = () => {
  if (goalLocalStorage.length >= 3) {
    const thePush = document.querySelector(".the-push");
    thePush.textContent = "We recommend 3 at a time :)";
    setTimeout(() => {
      thePush.textContent = "One step at a time";
    }, 3000);
  } else {
    popupBg.classList.add("active");
    addGoalPopup.classList.add("active");

    addGoalPopup.querySelector("button").onclick = () => {
      addGoalPopup.classList.remove("active");
      const newGoal = addGoalPopup.querySelector("input").value;
      // SECOND STEP
      secondPopup.classList.add("active");
      addGoalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const reason = secondPopup.querySelector("textarea").value; // SAVE TO SERVER. WHERE WE WILL RETRIEVE AND DISPLAY ON THE TODO DETAILS
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        const dateSet = `${month}/${day}/${year}`;

        const newGoalObj = {
          goal: newGoal,
          reason: reason,
          checked: false,
          dateSet: dateSet,
        };
        goalLocalStorage.push(newGoalObj);
        localStorage.setItem(
          "goalLocalStorage",
          JSON.stringify(goalLocalStorage)
        );
        location.reload();
      });
    };
  }
};

/* DATE */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const fullDate = `${days[currentDate.getDay()]} ${
  months[month]
} ${day}, ${year}`;

const date = document.querySelector(".date");

date.innerHTML = fullDate;

// COLOR THEME

const body = document.querySelector("body");
const lighter = document.querySelector(".lighter");
const light = document.querySelectorAll(".light");
const dark = document.querySelectorAll(".dark");
const lightText = document.querySelectorAll(".light-text");
const darkText = document.querySelectorAll(".dark-text");

/* SETTINGS POPUP */

const settings = popupBg.querySelector(".setting");
const settingIcon = document.querySelector(".setting-icon");

popupFunction(settingIcon, popupBg, settings);

const themes = settings.querySelectorAll(".theme ul li");
themes.forEach((theme) => {
  theme.onclick = () => {
    themes.forEach((theme) => {
      theme.className = "";
    });
    theme.className = "active";
    if (theme.id === "black-theme") {
      body.style.background = "var(--BG-COLOR-BLACK)";
      lighter.style.background = "var(--CP-BG-COLOR)";
      light.forEach((light) => {
        light.style.background = "var(--CP-BG-COLOR-BLACK)";
        light.style.color = "black";
      });
      dark.forEach((dark) => {
        dark.style.background = "var(--MAIN-BG-COLOR-BLACK)";
      });
      lightText.forEach((text) => {
        text.style.color = "black";
      });
      darkText.forEach((text) => {
        text.style.color = "var(--MAIN-BG-COLOR-BLACK)";
      });
    } else if (theme.id === "green-theme") {
      body.style.background = "var(--BG-COLOR-GREEN)";
      lighter.style.background = "transparent";
      light.forEach((light) => {
        light.style.background = "var(--CP-BG-COLOR-GREEN)";
        light.style.color = "white";
      });
      dark.forEach((dark) => {
        dark.style.background = "var(--MAIN-BG-COLOR-GREEN)";
      });
      lightText.forEach((text) => {
        text.style.color = "white";
      });
      darkText.forEach((text) => {
        text.style.color = "var(--MAIN-BG-COLOR-GREEN)";
      });
    } else if (theme.id === "blue-theme") {
      body.style.background = "var(--BG-COLOR-BLUE)";
      lighter.style.background = "transparent";
      light.forEach((light) => {
        light.style.background = "var(--CP-BG-COLOR-BLUE)";
        light.style.color = "white";
      });
      dark.forEach((dark) => {
        dark.style.background = "var(--MAIN-BG-COLOR-BLUE)";
      });
      lightText.forEach((text) => {
        text.style.color = "white";
      });
      darkText.forEach((text) => {
        text.style.color = "var(--MAIN-BG-COLOR-BLUE)";
      });
    } else if (theme.id === "orange-theme") {
      body.style.background = "var(--BG-COLOR-ORANGE)";
      lighter.style.background = "transparent";
      light.forEach((light) => {
        light.style.background = "var(--CP-BG-COLOR-ORANGE)";
        light.style.color = "white";
      });
      dark.forEach((dark) => {
        dark.style.background = "var(--MAIN-BG-COLOR-ORANGE)";
      });
      lightText.forEach((text) => {
        text.style.color = "white";
      });
      darkText.forEach((text) => {
        text.style.color = "var(--MAIN-BG-COLOR-ORANGE)";
      });
    }
  };
});
