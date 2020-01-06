var dbPromised = idb.open("football-info", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("standings", {keyPath: "competition.id"});
    articlesObjectStore.createIndex("standing", "competition.name", { unique: false });
});

function saveForLater(compe) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("standings", "readwrite");
        var store = tx.objectStore("standings");
        store.add(compe);
        return tx.complete;
    })
    .then(function() {
        console.log("Standings berhasil di simpan.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
    dbPromised
        .then(function(db) {
        var tx = db.transaction("standings", "readonly");
        var store = tx.objectStore("standings");
        return store.getAll();
        })
        .then(function(standings) {
        resolve(standings);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
    dbPromised
        .then(function(db) {
        var tx = db.transaction("standings", "readonly");
        var store = tx.objectStore("standings");
        id=parseInt(id);
        return store.get(id);
        })
        .then(function(standings) {
        resolve(standings);
        });
    });
}

function deleteCompe(compe){
    dbPromised.then(function(db) {
        var tx = db.transaction('standings', 'readwrite');
        var store = tx.objectStore('standings');
        store.delete(compe);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
    });
}