
const myTeamView = document.querySelector(".my-team-view");
window.onload = function () {
    myTeamView.classList.add('hidden');
};

const startView = document.querySelector(".start-view");
const findChampsBtn = document.querySelector("#find-champsBtn");
findChampsBtn.addEventListener("click", () => {
    startView.classList.remove('hidden');
    myTeamView.classList.add('hidden');
});
const myTeamBt = document.querySelector("#my-teamBtn")
myTeamBt.addEventListener("click", () => {
    startView.classList.add('hidden');
    myTeamView.classList.remove('hidden');
});
