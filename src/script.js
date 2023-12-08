document.getElementById("find-champsBtn").addEventListener("click", function () {
    showView("start-view");
});

document.getElementById("my-teamBtn").addEventListener("click", function () {
    showView("my-team-view");
});

function showView(viewId) {
    // Dölj alla vyer först
    var views = document.querySelectorAll('.start-view, .my-team-view');
    views.forEach(function (view) {
        view.classList.add('hidden');
    });

    // Visa den valda vyn
    var selectedView = document.querySelector('.' + viewId);
    selectedView.classList.remove('hidden');
}
