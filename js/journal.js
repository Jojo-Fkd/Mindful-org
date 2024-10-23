/* ADD TO JOURNAL */

let journalLocalStorage =
  JSON.parse(localStorage.getItem("journalLocalStorage")) || [];
const addBtn = document.querySelector(".add_to_journal");
const addJournalForm = document.querySelector(".journal-form");
const addJournalPopup = document.querySelector(".add-to-journal");
const secondPopupJournal = popupBg.querySelector(".add-to-journal.add_2");
const journalContainer = document.querySelector(".journal-container");

/* RENDERING JOURNAL PAGE */

const journalHead = document.querySelector(".journal-head h3");
journalHead.innerHTML = `Jonathan's Journals (${journalLocalStorage.length})`;

for (let i = 0; i < journalLocalStorage.length; i++) {
  const journal = journalLocalStorage[i];
  const div = document.createElement("div");
  div.className = "journal";
  div.innerHTML = `
          <p>${journal.date}</p>
          <p>"${journal.journalName}"</p>
            <button>Read</button>`;
  journalContainer.firstChild.parentElement.insertBefore(
    div,
    journalContainer.firstChild
  );

  /* VIEW JOURNAL */

  const viewJournal = document.querySelector(".journal-view");
  const journalBtn = document.querySelectorAll(".journal button");

  journalBtn.forEach((btn) => {
    const viewHead = viewJournal.querySelector(".view-head");
    viewHead.querySelector("p:first-child").innerHTML = journal.date;
    viewHead.querySelector("p:last-child").innerHTML = journal.journalName;
    const journalField = viewJournal.querySelector(".journal-field div");
    journalField.innerHTML = journal.journalText;
    popupFunction(btn, popupBg, viewJournal);
  });
}

addBtn.onclick = () => {
  popupBg.classList.add("active");
  addJournalPopup.classList.add("active");
  addJournalPopup.querySelector(".close").onclick = () => {
    popupBg.classList.remove("active");
    addJournalPopup.classList.remove("active");
  };
  addJournalPopup.querySelector("button").onclick = () => {
    addJournalPopup.classList.remove("active");

    const journalDate = new Date();

    const journalYear = journalDate.getFullYear();
    const journalMonth = String(journalDate.getMonth() + 1).padStart(2, "0");
    const journalDay = String(journalDate.getDate()).padStart(2, "0");

    const date = `${journalDay}/${journalMonth}/${journalYear}`;

    // SECOND STEP

    secondPopupJournal.classList.add("active");

    secondPopupJournal.querySelector(".add-head p:first-child").innerHTML =
      date;

    addJournalForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const journalName = addJournalPopup.querySelector("input").value;
      const journalText = secondPopupJournal.querySelector("textarea").value;

      const newJournalObj = {
        journalName: journalName,
        date: date,
        journalText: journalText,
      };

      journalLocalStorage.push(newJournalObj);
      localStorage.setItem(
        "journalLocalStorage",
        JSON.stringify(journalLocalStorage)
      );
      location.reload();
    });
  };
};
