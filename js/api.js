var base_url = "https://api.football-data.org/v2/";
var TOKEN_API = 'a7ee32cb33fe456396308d3f4ada7d9d';
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getCompetitions() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML = "";
          data.competitions.forEach(function(compe) {
            if(compe.id === 2001||compe.id === 2002||compe.id === 2003||compe.id === 2021||compe.id === 2014||compe.id === 2015){
              let compeImage = compe.emblemUrl;
              if(compe.id === 2021){
                compeImage = "images/PL.png";
              }else if(compe.id === 2015){
                compeImage = "images/L1.png";
              }else if(compe.id === 2002){
                compeImage = "images/BL.png";
              }else if(compe.id === 2003){
                compeImage = "images/ER.png";
              }else if(compe.id === 2014){
                compeImage = "images/PD.jpg";
              }else if(compeImage === null){
                compeImage = "images/football.jpg";
              }
              standingsHTML += `
                    <div class="card">
                      <a href="./standings.html?id=${compe.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${compeImage}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${compe.name}</span>
                      </div>
                    </div>
                  `;
            }
          });
          // Sisipkan komponen card ke dalam elemen dengan id #body-content
          document.getElementById("body-content").innerHTML = standingsHTML;
        })
      }
    })
  }
  
  fetch(base_url + "competitions/",{headers:{'X-Auth-Token':TOKEN_API}})
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.competitions.forEach(function(compe) {
        if(compe.id === 2001||compe.id === 2002||compe.id === 2003||compe.id === 2021||compe.id === 2014||compe.id === 2015){
          let compeImage = compe.emblemUrl;
          if(compe.id === 2021){
            compeImage = "images/PL.png";
          }else if(compe.id === 2015){
            compeImage = "images/L1.png";
          }else if(compe.id === 2002){
            compeImage = "images/BL.png";
          }else if(compe.id === 2003){
            compeImage = "images/ER.png";
          }else if(compe.id === 2014){
            compeImage = "images/PD.jpg";
          }else if(compeImage === null){
            compeImage = "images/football.jpg";
          }
          standingsHTML += `
                <div class="card">
                  <a href="./standings.html?id=${compe.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${compeImage}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${compe.name}</span>
                  </div>
                </div>
              `;
        }
      });
      // Sisipkan komponen card ke dalam elemen dengan id #standing-list
      document.getElementById("standing-list").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getCompeById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    let idCompe = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "competitions/"+ idCompe +"/standings",{headers:{'X-Auth-Token':TOKEN_API}}).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var compeName = data.competition.name;
            var standingsHTML = "";
            standingsHTML += `<h1>${compeName}</h1>`;
            data.standings.forEach(function(compe) {
              if(idCompe == 2001){
                var groupName = compe.group;
                groupName = groupName.replace("_"," ");
              }else{
                groupName = compeName;
              }
              if(compe.type === "TOTAL"){
                standingsHTML += `
                <div class="col s12 m7">
                <h3 style="text-align:center">${groupName}</h3>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Points</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                      </tr>
                    </thead>

                `;
                compe.table.forEach(function(teams) {
                  standingsHTML += `
                    <tbody>
                      <tr>
                        <td>${teams.position}</td>
                        <td>
                            <img src="${teams.team.crestUrl}" width="100px" height="100px" />
                            <p>${teams.team.name}</p>
                        </td>
                        <td>${teams.playedGames}</td>
                        <td>${teams.won}</td>
                        <td>${teams.draw}</td>
                        <td>${teams.lost}</td>
                        <td>${teams.points}</td>
                        <td>${teams.goalsFor}</td>
                        <td>${teams.goalsAgainst}</td>
                        <td>${teams.goalDifference}</td>
                      </tr>
                    </tbody>
                    `;
                });
                standingsHTML += `</div>`;
              }
            });
            document.getElementById("saved-standings").innerHTML = standingsHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetch(base_url + "competitions/"+ idCompe +"/standings",{headers:{'X-Auth-Token':TOKEN_API}})
      .then(status)
      .then(json)
      .then(function(data) {
        var compeName = data.competition.name;
        var standingsHTML = "";
        standingsHTML += `<h1>${compeName}</h1>`;
        data.standings.forEach(function(compe) {
          if(idCompe == 2001){
            var groupName = compe.group;
            groupName = groupName.replace("_"," ");
          }else{
            groupName = compeName;
          }
          if(compe.type === "TOTAL"){
            standingsHTML += `
            <div class="col s12 m7">
            <h3 style="text-align:center">${groupName}</h3>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Games Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                  </tr>
                </thead>

            `;
            compe.table.forEach(function(teams) {
              standingsHTML += `
                <tbody>
                  <tr>
                    <td>${teams.position}</td>
                    <td>
                        <img src="${teams.team.crestUrl}" width="100px" height="100px" />
                        <p>${teams.team.name}</p>
                    </td>
                    <td>${teams.playedGames}</td>
                    <td>${teams.won}</td>
                    <td>${teams.draw}</td>
                    <td>${teams.lost}</td>
                    <td>${teams.points}</td>
                    <td>${teams.goalsFor}</td>
                    <td>${teams.goalsAgainst}</td>
                    <td>${teams.goalDifference}</td>
                  </tr>
                </tbody>
                `;
            });
            standingsHTML += `</div>`;
          }
        });
        
        document.getElementById("saved-standings").innerHTML = standingsHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedCompe() {
  getAll().then(function(data) {
    var standingsHTML = "";
    data.forEach(function(compe) {
      let compeImage = compe.emblemUrl;
      if(compe.competition.id === 2021){
        compeImage = "images/PL.png";
      }else if(compe.competition.id === 2001){
        compeImage = "images/UCL.png";
      }else if(compe.competition.id === 2015){
        compeImage = "images/L1.png";
      }else if(compe.competition.id === 2002){
        compeImage = "images/BL.png";
      }else if(compe.competition.id === 2003){
        compeImage = "images/ER.png";
      }else if(compe.competition.id === 2014){
        compeImage = "images/PD.jpg";
      }else if(compeImage === null){
        compeImage = "images/football.jpg";
      }
        standingsHTML += `
              <div class="card">
                <a href="./standings.html?id=${compe.competition.id}&saved=true">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="responsive-img" src="${compeImage}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${compe.competition.name}</span>
                </div>
              </div>
            `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saved-standings").innerHTML = standingsHTML;
  });
}

function getSavedCompeById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  return new Promise(function(resolve, reject) {
  getById(idParam).then(function(data) {
    var compeName = data.competition.name;
    var standingsHTML = "";
    standingsHTML += `<h1>${compeName}</h1>`;
    data.standings.forEach(function(compe) {
      if(idParam == 2001){
        var groupName = compe.group;
        groupName = groupName.replace("_"," ");
      }else{
        groupName = compeName;
      }
      if(compe.type === "TOTAL"){
        standingsHTML += `
        <div class="col s12 m7">
        <h3 style="text-align:center">${groupName}</h3>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Games Played</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Points</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
              </tr>
            </thead>

        `;
        compe.table.forEach(function(teams) {
          standingsHTML += `
            <tbody>
              <tr>
                <td>${teams.position}</td>
                <td>
                    <img src="${teams.team.crestUrl}" width="100px" height="100px" />
                    <p>${teams.team.name}</p>
                </td>
                <td>${teams.playedGames}</td>
                <td>${teams.won}</td>
                <td>${teams.draw}</td>
                <td>${teams.lost}</td>
                <td>${teams.points}</td>
                <td>${teams.goalsFor}</td>
                <td>${teams.goalsAgainst}</td>
                <td>${teams.goalDifference}</td>
              </tr>
            </tbody>
            `;
        });
        standingsHTML += `</div>`;
      }
    });
    document.getElementById("saved-standings").innerHTML = standingsHTML;
    resolve(data);
  });
  });
}