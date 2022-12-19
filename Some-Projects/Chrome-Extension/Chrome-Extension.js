const saveInputButton = document.getElementById('input-btn');
let myLeads = [];
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteButton = document.getElementById('delete-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const saveTab = document.getElementById('tab-btn');

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};

saveTab.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `
    };

    ulEl.innerHTML = listItems;
};

deleteButton.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

saveInputButton.addEventListener('click', () => {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
});