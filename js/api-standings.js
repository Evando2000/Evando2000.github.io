document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var getId = parseInt(urlParams.get("id"));
    var isFromSaved = urlParams.get("saved");
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("btn-delete");

    if (isFromSaved) {
        // Hide button save jika dimuat dari indexed db
        btnSave.style.display = 'none';
        // ambil artikel lalu tampilkan
        var item = getSavedCompeById();
    } else {
        // Hide button delete jika dimuat dari server
        btnDelete.style.display = 'none';
        // ambil artikel lalu tampilkan
        var item = getCompeById();
    }

    btnSave.onclick = function() {
        alert("Berhasil Tersimpan");
        item.then(function(standing) {
            saveForLater(standing);
        });
    };

    btnDelete.onclick = function() {
        alert("Berhasil Terhapus");
        item.then(function(standing) {
            deleteCompe(getId);
        });
    };
});