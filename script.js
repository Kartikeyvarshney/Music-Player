
const song = document.getElementById("songAudio")
const image = document.querySelector('img');
const tittle =document.getElementById("tittle");
const artist = document.getElementById('artist');
const play = document.getElementById("play");
const previous = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
let  currentTime = document.getElementById('currentDuration');
let duration = document.getElementById('maxDuration'); 
const volume_bar =document.getElementById('volume'); 
const volume_icon = document.getElementById('volume-icon');
let isPlaying = false;
let ismute = false;

const songsinfo = [
    {
        name: 'Dekhte Dekhte',
        tittle: 'Dekhte Dekhte',
        artist:'Atif Aslam'
    },
    {
        name: 'Enna Sona',
        tittle: 'Enna Sona',
        artist:'Arijit Singh'
    },
    {
        name: 'Ghungroo',
        tittle: 'Ghungroo',
        artist:'Arijit Singh'
    },
    {
        name:'Flowers',
        tittle:'Flowers',
        artist:'Miley Cyrus'
    },
    {
        name: 'Jai Jai Shivshankar',
        tittle: 'Jai-Jai-Shivshankar',
        artist:'Vishal & Shekhar'
    },
    {
        name: 'Malang Sajna',
        tittle: 'Malang Sajna',
        artist:'Sachet & Parampara'
    }
]
/* For pause the song */
    const Puasesong = () =>
    {
        isPlaying = false;
        song.pause();
        play.classList.replace(  'fa-pause' , 'fa-play');
        image.classList.remove("anime");
        image.classList.add('ForPause')
        play.title = 'Play'
    }
/* For play in song */
    const Playsong = () =>
{
    isPlaying=true;
    song.play();
    play.classList.replace('fa-play' , 'fa-pause');
    image.classList.remove('ForPause');
    image.classList.add("anime");
    play.title='Pause'
    setInterval(()=>
    {
        progress.value = song.currentTime;
    },500);
   
}
/*For play and pause song  */
play.addEventListener('click' , ()=>
{
   !isPlaying ? Playsong() : Puasesong();
})

// For changing the info of song
let songIndex = 0;
const loadSonginfo = (songsinfo) =>
{
    tittle.textContent = songsinfo.tittle;
    artist.textContent =songsinfo.artist;
    song.src =`Songs/${songsinfo.name}.mp3`;
    image.src =`Posters/${songsinfo.name}.jpg`;
}
// For play the next song
const nextSong=()=>
{
    songIndex = (songIndex+1)%songsinfo.length;
    loadSonginfo(songsinfo[songIndex]);
    Playsong(); 
}
// For play the previous song
const prevSong=()=>
{
    songIndex = (songIndex - 1 + songsinfo.length)%songsinfo.length;
    loadSonginfo(songsinfo[songIndex]);
    Playsong(); 
}
next.addEventListener('click', nextSong);
previous.addEventListener('click',prevSong);

//For progress bar
song.onloadedmetadata = function()
{
    progress.max = song.duration;
    progress.value=song.currentTime;
}


progress.onchange = function()
{
    Playsong();
    song.currentTime = progress.value;
}

// For volume bar

// For mute and unmute the song

let currentVolume = song.volume;
function muteAndUnmuteTheSong()
{
    if(ismute == false)
    {
        ismute=true;
        currentVolume = song.volume;
        song.volume = 0;
        volume_bar.value = 0;
        volume_icon.classList.add('fa-volume-xmark');
        volume_icon.title="Unmute";
    }
    else if (ismute == true)
    {
        ismute=false;
        song.volume = currentVolume;
        volume_bar.value = (song.volume*100);
        volume_icon.title="Mute";
        if(volume_bar.value>=10 && volume_bar.value<=40)
        {
        volume_icon.classList.add('fa-volume-low');
        volume_icon.classList.remove('fa-volume');
        volume_icon.classList.remove('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume-high');
        }
        else if(volume_bar.value>40 && volume_bar.value<=100)
        {
        volume_icon.classList.add('fa-volume');
        volume_icon.classList.remove('fa-volume-low');
        volume_icon.classList.remove('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume-high');
        }
    }
    
}

volume_icon.addEventListener('click',muteAndUnmuteTheSong) 
volume_bar.onchange =function setVolumIcon(){
   
    if(volume_bar.value==0)
    {
        volume_icon.classList.add('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume-high');
        volume_icon.classList.remove('fa-volume-low');
        volume_icon.classList.remove('fa-volume');
    }
    else if(volume_bar.value>=10 && volume_bar.value<=30)
    {
        volume_icon.classList.add('fa-volume-low');
        volume_icon.classList.remove('fa-volume');
        volume_icon.classList.remove('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume-high');
    }
    // I can add this icon because it is not free for use 😭😭😭 if you have a pro account of fontawesome then you can use it just paste you kit link in header of html and uhcomment this section.
    else if(volume_bar.value>30 && volume_bar.value<=60)
    {
        volume_icon.classList.add('fa-volume');
        volume_icon.classList.remove('fa-volume-low');
        volume_icon.classList.remove('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume-high');
    }
    else if(volume_bar.value>60 && volume_bar.value<=100)
    {
        volume_icon.classList.add('fa-volume-high');
        volume_icon.classList.remove('fa-volume-low');
        volume_icon.classList.remove('fa-volume-xmark');
        volume_icon.classList.remove('fa-volume');
    }
    song.volume = volume_bar.value/100;
}
// To convert the single digits number to double digits like 1 => 01.
function PrependNumber( number)
{
    if(number<9)
    {
        return "0"+number;
    }
    else
    {
        return number;
    }
}
song.addEventListener('timeupdate' ,()=>
{
    const CurrentTime = song.currentTime;
    const Duration = song.duration;
    let min_duration =PrependNumber(Math.floor(Duration/60));
    let sec_duration = PrependNumber(Math.floor(Duration%60));
    duration.textContent=`${min_duration}:${sec_duration}`
    let curr_min_duration = PrependNumber(Math.floor(CurrentTime/60));
    let curr_sec_duration = PrependNumber(Math.floor(CurrentTime%60));
    currentTime.textContent=`${curr_min_duration}:${curr_sec_duration}`
    /* For automaticlly play next song after one is finish */
    if(CurrentTime===Duration)
    {
        nextSong();
    }
})

document.body.onkeyup = function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32 || e.keyCode == 75)
    {
        if(isPlaying==true)
        {
            Puasesong();
        }
        else if (isPlaying==false)
        {
            Playsong();
        }
    }
    else if( e.keyCode == 74)
    {
        prevSong();
    }
    else if (e.keyCode == 76)
    {
        nextSong();
    }
    else if(e.keyCode==77)
    {
        muteAndUnmuteTheSong();
    }
  }
