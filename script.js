console.log("hello ");
let current_song = new Audio();

let current_folder;
let songs 



function convertSecondsToMinutes(seconds) {

  if (isNaN(seconds) || seconds < 0) return "00 :00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);


  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');

  return `${formattedMins} :${formattedSecs}`;
}


async function get_songs(folder) {

  current_folder = folder;

  let a = await fetch(`/${folder}/`);

  let response = await a.text();



  let div = document.createElement("div");

  div.innerHTML = response;

  let as = div.getElementsByTagName("a");



  songs = [];

  for (let index = 0; index < as.length; index++) {

    const element = as[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1])
    }

  }
  let songUL = document.querySelector(".song_list").getElementsByTagName("ul")[0];

  songUL.innerHTML = "";

  for (const song of songs) {

    songUL.innerHTML = songUL.innerHTML + `<li> 
    
         <img class="invert" src="music.svg">
                            <div class="info">
                              <div>${song.replace(/%20/g, " ")}</div>
                                <div>Rohit</div>
                            </div>
                            <span class="PlayNow">PlayNow</span>
                            <img class="invert" src="play/play.svg" alt="">
    
   </li>`;

  }

  Array.from(document.querySelector(".song_list").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
     
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    }

    )

  }

  )

return songs;
}


const playMusic = (track, pause = false) => {

  current_song.src = `/${current_folder}/${track}`;
  if (!pause) {
    current_song.play()
    play.src = "play/pause.svg";
  }


  document.querySelector(".song_info").innerHTML = decodeURI(track);
  document.querySelector(".song_time").innerHTML = "00:00/ 00 ";



};

async function displayAlbums() {
 
  let as = await fetch(`/songs/`);

  let response = await as.text();

let div = document.createElement("div")
  div.innerHTML = response;

  let anchors = div.getElementsByTagName("a")


    let cardContainer = document.querySelector(".cart-container")
    let array = Array.from(anchors)

      for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
      
      if(e.href.includes("/songs")){
      let folder = e.href.split("/").slice(-2)[0]

      //get the meta data
        let as = await fetch(`/songs/${folder}/info.json`);

        let response = await as.json();
        console.log(response)

        cardContainer.innerHTML = cardContainer.innerHTML + `\<div data-folder="${folder}" class="cart">
                           <div class="playing">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19"
                                fill="none">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="#000000" stroke-width="1.5" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpeg" alt="vele" class="vele">
                        <h2>${response.title} </h2>
                        <p>${response.description}
                            
                             </p>
                    </div>`

      }
    }
   

  Array.from(document.getElementsByClassName("cart")).forEach(e => {
    e.addEventListener("click", async item => {

      songs = await get_songs(`songs/${item.currentTarget.dataset.folder}`)
      playMusic(songs[0])

    })
  })
 

}


async function main() {



  await get_songs("songs/ncs")

  playMusic(songs[0], true)

  displayAlbums()

  play.addEventListener("click", () => {
    if (current_song.paused) {
      current_song.play();
      play.src = "play/pause.svg";
    }
    else {
      current_song.pause();
      play.src = "play/play.svg";
    }
  }

  )

  current_song.addEventListener("timeupdate", () => {



    document.querySelector(".song_time").innerHTML = `${convertSecondsToMinutes(current_song.currentTime)}/
  ${convertSecondsToMinutes(current_song.duration)}`

    document.querySelector(".circle").style.left = (current_song.currentTime / current_song.duration) * 100 + "%";

  }

  )

  document.querySelector(".seek-bar").addEventListener("click", e => {
    let persent = e.offsetX / e.target.getBoundingClientRect().width * 100;
    document.querySelector(".circle").style.left = (persent + "%");
    current_song.currentTime = ((current_song.duration) * persent) / 100;
  }

  )

  document.querySelector(".hum").addEventListener("click", () => {
    document.querySelector(".left-side").style.left = "0";
  }

  )
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left-side").style.left = "-120%";
  }

  )

  preivos.addEventListener("click", () => {
    
    let index = songs.indexOf(current_song.src.split("/").slice(-1)[0])

    if ((index - 1) >= 0) {
      playMusic(songs[index - 1])
    }
  }

  )

  

  next.addEventListener("click", () => {
    
    let index = songs.indexOf(current_song.src.split("/").slice(-1)[0])

    if ((index + 1) < songs.length) {
      playMusic(songs[index + 1])
    }


  }

  )

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

    current_song.volume = parseInt(e.target.value) / 100;
  }

  )


  document.querySelector(".volume>img").addEventListener("click", e=>{

if(e.target.src.includes("volume.svg")){
  e.target.src= e.target.src.replace("volume.svg","mute.svg")
  current_song.volume = 0
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0
}
else{
 e.target.src=  e.target.src.replace("mute.svg","volume.svg")
     current_song.volume = .10
       document.querySelector(".range").getElementsByTagName("input")[0].value = 10
}
  })


}

main();