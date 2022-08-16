console.log('Выполнено всё, поэтому опишу нюансы, которые могут быть трактованы как отклонение от тз. соответственно, оценивайте как считатете правильным:\n\nТЗ --- выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) --- обработал пустую стоку как отмену ввода, а вместо вывода ошибки не даю инпуту закрыться и крашу в красный\n\nТЗ --- при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) --- у меня русских цитат буквально штук 8, если подряд вам выпало 2 или 3 раза одна и таже, это просто потому что их мало) можете проверить на англ. языке, что рандом работает корректно\n\nТЗ --- можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте --- вместо этого плэй/пауза по нажатую на сам трек. иконку не сложно добавить, но так кравсивее, на мой взгляд\n\nТЗ --- в качестве источника изображений может использоваться Flickr API --- я из Алматы учусь, тут заблокирован фликер. Я его через VPN вроде как сделал, но если вы проверяете из Казахстана, то проверяйте тоже с включенным впн');


// import
import musicList from '../momentum_for_chrome/playlist.js';
// const

const time = document.querySelector('.time')
const hoursAndMinutes = document.querySelector('.hoursAndMinutes')
const seconds = document.querySelector('.seconds')
const myDate = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const greetingDayTime = document.querySelector('.greetingDayTime')
const yourName = document.querySelector('.yourName')
const popupYourName = document.querySelector('.popupYourName')
const yourNameFormJS = document.forms.yourNameForm
const yourNameInputJS = yourNameFormJS.yourNameInput
const sliderButton = document.querySelectorAll('.mainSliderButton')
const backgrounds = document.querySelector('.backgrounds')
const backgrounds3 = document.querySelector('.backgrounds3')
const weatherIcon = document.querySelector('.weatherIcon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weatherDescription')
const feelsLike = document.querySelector('.feelsLike')
const windSpeed = document.querySelector('.windSpeed')
const humidity = document.querySelector('.humidity')
const weather = document.querySelector('.weather')
const weatherCity = document.querySelector('.weatherCity')
const changeCityForm = document.forms.changeCityForm
const changeCityInput = changeCityForm.changeCityInput
const quote = document.querySelector('.quote')
const quoteText = document.querySelector('.quoteText')
const quoteAuthor = document.querySelector('.quoteAuthor')
const refreshQuote = document.querySelector('.refreshQuote')
const audio = document.querySelector('audio');
const mainMusicButton = document.querySelector('.mainMusicButton');
const previousTrack = document.querySelector('.previousTrack');
const nextTrack = document.querySelector('.nextTrack');
const playlist = document.querySelector('.playlist');
const playerSize = document.querySelector('.playerSize')
const player = document.querySelector('.player')
const wrapper = document.querySelector('.wrapper')
const muteButton = document.querySelector('.mute')
const volumeValue = document.querySelector('.volumeValue')
const currentTrack = document.querySelector('.currentTrack')
const progressMax = document.querySelector('.progressMax')
const currentProgress = document.querySelector('.currentProgress')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progressContainer')
const volume = document.querySelector('.volume')
const volumeContainer = document.querySelector('.volumeContainer')
const volumeMin = document.querySelector('.volumeMin')
const volumeMax = document.querySelector('.volumeMax')
const settingsButton = document.querySelector('.settingsButton')
const backgrounds4 = document.querySelector('.backgrounds4')
const settings = document.forms.settings
const checkboxes = settings.querySelectorAll('.checkbox')
const settingsCloseButton = document.querySelector('.settingsCloseButton')
const displayElements = document.querySelector('.displayElements')
const languageSelector = document.querySelector('.languageSelect')
const yourNameAnswer = document.querySelector('.yourNameAnswer')
const tagsBlock = document.querySelector('.tagsBlock')
const imagesSelector = document.querySelector('.imagesSelect')
const photoSrc = document.querySelector('.photoSrc')
const photoAuthor = document.querySelector('.photoAuthor')
const photoInfo = document.querySelector('.photoInfo')
const settingsTextInput = document.querySelector('.settingsTextInput')
const errorBlock = document.querySelector('.errorBlock')
const errorTagBlock = document.querySelector('.errorTagBlock')
const toDoButton = document.querySelector('.toDoButton')
const toDoList = document.querySelector('.toDoList')
const toDoCloseButton = document.querySelector('.toDoCloseButton')
const toDoListForm = document.forms.toDoListForm
const toDo = document.querySelector('.toDo')
const titleToDoButton = document.querySelector('.titleToDoButton')
const titleDoneButton = document.querySelector('.titleDoneButton')
const cleanToDoText = document.querySelector('.cleanToDoText')
const cleanDoneText = document.querySelector('.cleanDoneText')
const doneWrapper = document.querySelector('.doneWrapper')
const toDoWrapper = document.querySelector('.toDoWrapper')
const done = document.querySelector('.done')
const cleanButton = document.querySelector('.cleanButton')
const testButton = document.querySelector('.testButton')

const settingList = {
  language: 'ru',
  photoSource: 'github',
  toDo: [],
  done: [],
  tags: 'nature',
  viewBlocks: ['time', 'greeting', 'quote', 'weather', 'player', 'toDoButton',]
}

let randomNumb = 0
let weatherCitySet = 'Минск'
let weatherToSave = 'Минск'
let musicPlay = false
let trackNumber = 0
let pSize = 'mini'
let muted = false


// functions

function getLocalStorage() {
  if(localStorage.getItem('username') !== '') {
    yourNameInputJS.value = localStorage.getItem('username')
  }
  if (localStorage.getItem('weatherCity') ) {
  weatherCitySet = localStorage.getItem('weatherCity') 
  }
  if (localStorage.getItem('volume')) {
  audio.volume = localStorage.getItem('volume')
  } else {
    audio.volume = 0.5
  }
  if (localStorage.getItem('languageSelect')) {
  settingList.language = localStorage.getItem('languageSelect')
  }
  if (localStorage.getItem('viewBlocks')) {
  settingList.viewBlocks = localStorage.getItem('viewBlocks').split(',')
  }
  if (localStorage.getItem('photoSelect')) {
  settingList.photoSource = localStorage.getItem('photoSelect')
  }
  if (localStorage.getItem('tags') !== null) {
  settingList.tags = localStorage.getItem('tags')
  }
  if (localStorage.getItem('toDo') !== null) {
 settingList.toDo = JSON.parse(localStorage.getItem('toDo'))
 }
  if (localStorage.getItem('done') !== null) {
 settingList.done = JSON.parse(localStorage.getItem('done'))
 }
}
getLocalStorage()

function getRandomNumb() {
  randomNumb = Math.floor(Math.random() * 20) + 1
}
getRandomNumb()

function getPicturesNumber () {
  let answer = randomNumb.toString()
  if (answer.length < 2) {
  answer = '0' + answer
  }
  return answer
}

function setToDoList () {
  if (settingList.toDo !== null) {
  hideCleanToDoSectionFast()
  settingList.toDo.forEach((value => {
    pushToDo(value)
  }))
  }
}
setToDoList()

function setDoneList () {
  if (settingList.done !== null) {
  hideCleanDoneSection()
  settingList.done.forEach((value => {
    pushDone(value)
  }))
  }
  const newDoneLi = document.querySelectorAll('.doneLi')
  newDoneLi.forEach((value) => {
    value.children[0].children[0].children[0].checked = true;
  })
}
setDoneList()

function changeTags () {
  if (settings.tagsInput.value !== '') {
    settingList.tags = settings.tagsInput.value 
  } else {
    settingList.tags = 'nature'
  }
  setBg()
}

function toggleTagsBlock () {
  if (settings.imagesSelect.value === 'unsplash' || settings.imagesSelect.value === 'flickr') {
    tagsBlock.classList.remove('hide')
    settings.tagsInput.removeAttribute('disabled', 'disabled');
  } else {
    tagsBlock.classList.add('hide')
    settings.tagsInput.setAttribute('disabled', 'disabled');
  }
}

function changePictures () {
  settingList.photoSource = settings.imagesSelect.value
  setBg ()
  toggleTagsBlock ()
}

function setPictures () {
  settings.imagesSelect.value = settingList.photoSource
  settings.tagsInput.value = settingList.tags
  setBg ()
  toggleTagsBlock ()
}
setPictures()


function translateMenu () {
  if (settingList.language === 'ru') {
    document.body.classList.replace('en', 'ru')
    settings.tagsInput.setAttribute('placeholder', 'Введите теги')
    toDoListForm.newToDo.setAttribute('placeholder', 'Новое дело')

  } else {
    document.body.classList.replace('ru', 'en')
    settings.tagsInput.setAttribute('placeholder', 'Enter tags')
    toDoListForm.newToDo.setAttribute('placeholder', 'New ToDo')
  }
}

function setLanguage () {
  settings.languageSelect.value = settingList.language
  getWeather()
  setUsername ()
  showGreetingDayTime ()
  setYourNameAnswerLanguage ()
  translateMenu()
  showQuote()
}
setLanguage()

function changeLanguage () {
  settingList.language = settings.languageSelect.value
  getWeather()
  setUsername ()
  showGreetingDayTime ()
  setYourNameAnswerLanguage ()
  translateMenu()
  showQuote()
}

function viewOrHideBlock () {
if (settingList.viewBlocks.includes('time')) {
  time.classList.add('visible')
  setTimeout(() => {
  time.classList.add('opacity')  
  }, 50);
} else {
  time.classList.remove('opacity') 
  setTimeout(() => {
  time.classList.remove('visible')  
  }, 500);
}
if (settingList.viewBlocks.includes('weather')) {
  weather.classList.add('visible')
  setTimeout(() => {
  weather.classList.add('opacity')  
  }, 50);
} else {
  weather.classList.remove('opacity') 
  setTimeout(() => {
  weather.classList.remove('visible')  
  }, 500);
}
if (settingList.viewBlocks.includes('greeting')) {
  greeting.classList.add('visible')
  setTimeout(() => {
  greeting.classList.add('opacity')  
  }, 50);
} else {
  greeting.classList.remove('opacity') 
  setTimeout(() => {
  greeting.classList.remove('visible')  
  }, 500);
}
if (settingList.viewBlocks.includes('quote')) {
  quote.classList.add('visible')
  setTimeout(() => {
  quote.classList.add('opacity')  
  }, 50);
} else {
  quote.classList.remove('opacity') 
  setTimeout(() => {
  quote.classList.remove('visible')  
  }, 500);
}
if (settingList.viewBlocks.includes('player')) {
  player.classList.add('visible')
  setTimeout(() => {
  player.classList.add('opacity')  
  }, 50);
} else {
  player.classList.remove('opacity') 
  setTimeout(() => {
  player.classList.remove('visible')  
  }, 500);
}
if (settingList.viewBlocks.includes('toDoButton')) {
  toDoButton.classList.add('visible')
  setTimeout(() => {
  toDoButton.classList.add('opacity')  
  }, 50);
} else {
  toDoButton.classList.remove('opacity') 
  setTimeout(() => {
  toDoButton.classList.remove('visible')  
  }, 500);
}
}

function changeSettingBlocks () {
  checkboxes.forEach((value) => {
    if (value.checked === true) {
      if (!settingList.viewBlocks.includes(value.value)) {
        settingList.viewBlocks.push(value.value)
      }
    } else {
        if (settingList.viewBlocks.includes(value.value)) {
        settingList.viewBlocks = settingList.viewBlocks.filter((n) => {return n != value.value})
      }
    }    
  }) 
  viewOrHideBlock ()
}

function setSettings () {
  checkboxes.forEach((value) => {
    if (settingList.viewBlocks.includes(value.value)) {
      value.checked = true
    }
  })
  viewOrHideBlock()
}
setSettings()

function showHoursAndMinutes () {
  const date = new Date()
  const a = date.toLocaleTimeString();
  hoursAndMinutes.innerHTML = a.slice(0, 5)
  setTimeout(showHoursAndMinutes, 1000)
  }
 showHoursAndMinutes ()



function showSecondsAndDate () {
  const date = new Date()
  const sec = date.toLocaleTimeString();
  seconds.innerHTML = sec.slice(6, 8)
  const options = {month: 'numeric', day: 'numeric', weekday: 'short'};
  const dat = date.toLocaleDateString(`${settingList.language}-${settingList.language.toUpperCase()}`, options);
  myDate.innerHTML = dat.slice(0, 2) + dat.slice(3)
  setTimeout(showSecondsAndDate, 1000)
  }
 showSecondsAndDate ()



 function showGreetingDayTime () {
  const date = new Date()
  const hours = date.getHours();
  let greetingText = ''

  if (settingList.language === 'ru') {
  if(hours >= 0 && hours < 6) {
    greetingText = 'Доброй ночи, '
  }
  if (hours >= 6 && hours < 12) {
    greetingText = 'Доброе утро, '
  }
  if(hours >= 12 && hours < 18) {
    greetingText = 'Доброго дня, '
  }
  if(hours >= 18 && hours < 24) {
    greetingText = 'Добрый вечер, '
  }
} else {
   if(hours >= 0 && hours < 6) {
    greetingText = 'Good night, '
  }
  if (hours >= 6 && hours < 12) {
    greetingText = 'Good morning, '
  }
  if(hours >= 12 && hours < 18) {
    greetingText = 'Good afternoon, '
  }
  if(hours >= 18 && hours < 24) {
    greetingText = 'Good evening, '
  }
}
  greetingDayTime.innerHTML = greetingText
  setTimeout(showGreetingDayTime, 1000)
 }

 function setYourNameAnswerLanguage () {
  if (settingList.language === 'ru') {
    yourNameAnswer.innerHTML = 'Как к вам обращаться?'
  } else {
    yourNameAnswer.innerHTML = 'How can I call you?'
  }
 }

function showPopupYourName () {
  setTimeout(()=>yourNameInputJS.focus(), 500);
  popupYourName.classList.add('active')
  yourNameFormJS.classList.add('active')
  document.body.classList.add('block')
  wrapper.classList.add('shrink')
  player.classList.add('shrink')
}

function hidePopupYourName () {
  document.body.classList.remove('block')
  popupYourName.classList.remove('active')
  yourNameFormJS.classList.remove('active')
  wrapper.classList.remove('shrink')
  player.classList.remove('shrink')
}

function setUsername () {
  if(yourNameInputJS.value !== '') {
    yourName.innerHTML = yourNameInputJS.value
    yourName.classList.add('active')
  } else {
    if (settingList.language === 'ru') {
    yourName.innerHTML = 'Дорогой друг';
    } else {
      yourName.innerHTML = 'Dear friend'
    }
    yourName.classList.remove('active')
  }  
}


function getTimeOfDay () {
  const date = new Date()
  const hours = date.getHours();

 if(hours >= 0 && hours < 6) {
    return 'night'
  }
  if (hours >= 6 && hours < 12) {
    return 'morning'
  }
  if(hours >= 12 && hours < 18) {
    return 'afternoon'
  }
  if(hours >= 18 && hours < 24) {
    return 'evening'
  } 
}

function showErrorBlock () {
  errorBlock.classList.remove('hide')
}

function hideErrorBlock () {
  errorBlock.classList.add('hide')
}

function showTagErrorBlock () {
  errorTagBlock.classList.remove('hide')
}

function hideTagErrorBlock () {
  errorTagBlock.classList.add('hide')
}

  async function setUnsplashBg () {
    try {
  const source = `https://api.unsplash.com/photos/random?orientation=landscape&query=${settingList.tags}&client_id=dqGZrvB8muVeoynFvWsmEIkrCoxN6S7kzw0gkxb4EUQ`
  const res = await fetch(source)
  const data = await res.json()
  const img = new Image()

  img.src = data.urls.regular
  photoAuthor.innerHTML = data.user.name
  photoAuthor.href = data.user.portfolio_url
  photoSrc.href = 'https://unsplash.com/'
  photoSrc.innerHTML = 'photo from Unsplash'
  photoInfo.classList.replace('invisible', 'visible')
  img.addEventListener('load', function() {
  backgrounds.style.backgroundImage = `url(${img.src}`;
 })
    } catch (error) {
    if (error.name === 'SyntaxError') {
      settingList.photoSource = 'github'
      settings.imagesSelect.value = 'github'
      toggleTagsBlock()
      showErrorBlock()
      setTimeout(hideErrorBlock, 10000);
    }
    if (error.name === 'TypeError') {
      showSettings()
      showTagErrorBlock()
      setTimeout(hideTagErrorBlock, 10000);
    }
  }
}

async function setFlickrBg () {

  try {
  const source = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=671e92f94045a27ec727017d8c840063&tags=${settingList.tags}&extras=url_l&format=json&nojsoncallback=1`
  const res = await fetch(source)
  const data = await res.json()

  let randomPicture = Math.floor(Math.random() * 99)

  const img = new Image()
  img.src = data.photos.photo[randomPicture].url_l
  img.addEventListener('load', function() {
  backgrounds.style.backgroundImage = `url(${img.src}`;
 })

  photoSrc.href = 'https://www.flickr.com/'
  photoSrc.innerHTML = 'photo from Flickr'
  photoInfo.classList.replace('invisible', 'visible')
  photoAuthor.innerHTML = ''
  photoAuthor.href = '#'

  } catch (error) {
    if (error.name === 'TypeError') {
      showSettings()
      showTagErrorBlock()
      setTimeout(hideTagErrorBlock, 10000);
    }
  }
}


function setBg () {
  if (settingList.photoSource === 'github') {
  let folder = getTimeOfDay()
  let pictureNumber = getPicturesNumber()
  const img = new Image()

  img.src = `https://github.com/lexarudak/stage1-tasks/blob/assets/images/${folder}/${pictureNumber}.jpg?raw=true`

  img.addEventListener('load', function() {
  backgrounds.style.backgroundImage = `url(${img.src}`;
  })
  photoInfo.classList.replace('visible', 'invisible')
  }

  if (settingList.photoSource === 'unsplash') {
  setUnsplashBg ()
  }
  if (settingList.photoSource === 'flickr') {
  setFlickrBg ()
  }
}

  
function slideToRight () {  
  if (randomNumb === 20) {
    randomNumb = 1
  } else {
    randomNumb = randomNumb + 1
  }
  setBg()
}

function slideToLeft () {  
  if (randomNumb === 1) {
    randomNumb = 20
  } else {
    randomNumb = randomNumb - 1
  }
  setBg()
}


async function getWeather() {
  if (weatherCitySet === '') {
    weatherCitySet = weatherToSave
  }
  
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCitySet.trim()}&lang=${settingList.language}&appid=634c66fd8b59cabf7dc4c1b944afc036&units=metric`
  const res = await fetch(link)

  if (res.ok === false) {
    changeCityInput.classList.add('error')
    showChangeCity()
  }

   if (res.ok === true) {
    changeCityInput.classList.remove('error')
    weatherToSave = weatherCitySet
  }

  const data = await res.json()

  const temp = Math.round(data.main.temp)
  const feelTemp = Math.round(data.main.feels_like)
  const description =  data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)
  const wind = Math.round(data.wind.speed)
  let feelText = 'Ощущается как'
  let windText = 'Ветер'
  let humidityText = 'Влажность'

  if (settingList.language === 'en') {
    feelText = 'Feels like'
    windText = 'Wind speed'
    humidityText = 'Humidity'
  } 

  weatherIcon.className = 'weatherIcon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.innerHTML = `${temp}°C`
  feelsLike.innerHTML = `${feelText} ${feelTemp}°C`
  windSpeed.innerHTML = `${windText} ${wind} м/с`
  humidity.innerHTML = `${humidityText} ${data.main.humidity}%`
  weatherDescription.innerHTML = `${description}`
  weatherCity.innerHTML = `${data.name}`
  
  setTimeout(getWeather, 300000)
}
getWeather()

function showChangeCity () {
  changeCityForm.classList.add('active')
  setTimeout(()=>changeCityInput.focus(), 500);
}

function hideChangeCity () {
  changeCityForm.classList.remove('active')
  weatherCitySet = changeCityInput.value
  changeCityInput.value = ''
}

async function showQuote () {
  let quotes
  if (settingList.language === 'ru') {
    quotes = 'quotes.json'
  } else {
    quotes = 'quotes-eng.json'
  }
  const res = await fetch(quotes)
  const data = await res.json()
  let randomNumber = Math.floor(Math.random() * data.length)

  quoteText.innerHTML = `"${data[randomNumber].text}"`
  quoteAuthor.innerHTML = data[randomNumber].author
}

function changeQuote () {
  quoteText.classList.add('invisible')
  quoteAuthor.classList.add('invisible')
  setTimeout(()=>showQuote(), 300);
  setTimeout(()=>quoteText.classList.remove('invisible'), 300);
  setTimeout(()=>quoteAuthor.classList.remove('invisible'), 300); 
}

function showPlayingTrack () {
  const tracks = document.querySelectorAll('.track')
  tracks.forEach((value, index) => {
    if (index === trackNumber) {
      value.classList.replace('notActive', 'active')
      value.scrollIntoView({
        block: 'center' ,
        behavior: 'smooth'
      })
      currentTrack.innerHTML = `${value.innerHTML}`
      
    } else {
      value.classList.replace('active', 'notActive')
    }
  }) 
}

function playAudio () {
  audio.src = musicList[trackNumber].src
  audio.currentTime = 0
  showPlayingTrack()
  audio.play()
  mainMusicButton.classList.replace('fa-play', 'fa-pause')
  musicPlay = true
}

function pauseAudio () {
  audio.pause()
  mainMusicButton.classList.replace('fa-pause', 'fa-play')
  musicPlay = false
}

function startStopMusic () {
if (musicPlay === false) {
  playAudio()
} else {
  pauseAudio()
}
}

function playPreviousTrack () {
  if (trackNumber === 0) {
   trackNumber = musicList.length - 1
  } else {
    trackNumber = trackNumber - 1
  }
  playAudio()
  musicPlay = true
  mainMusicButton.classList.replace('fa-play', 'fa-pause')
}

function playNextTrack () {
  if (trackNumber === musicList.length - 1) {
   trackNumber = 0
  } else {
    trackNumber = trackNumber + 1
  }
  playAudio()
  musicPlay = true
  mainMusicButton.classList.replace('fa-play', 'fa-pause')
}

function createPlayList () {
  musicList.forEach((element, index) => {
    const li = document.createElement('li');
    li.classList.add('track')
    li.classList.add('notActive')
    li.innerHTML = musicList[index].title
    playlist.append(li)
  })
}
createPlayList()

function cycleAudio () {
  if (audio.duration === audio.currentTime) {
    playNextTrack()
  }
}


function changePlayerSize () {
  player.classList.toggle('big')
  playerSize.classList.toggle('fa-expand')
  document.body.classList.toggle('block')
  playerSize.classList.toggle('fa-compress')

  wrapper.classList.toggle('shrink')
  backgrounds3.classList.toggle('dark')
  if (player.classList.contains('big')) {
    pSize = 'big'
  } else {
    pSize = 'mini'
    setTimeout(showPlayingTrack, 300)
  }
}

function changeMute () {
  if (muted === false) {
  audio.muted = true
  muted = true
  muteButton.classList.add('active')
  } else {
    audio.muted = false
    muted = false
    muteButton.classList.remove('active')
  }
  showCurrentVolume()
}

function showCurrentVolume () {
  let volumeLevel = ''
  if (muted === true) {
    volumeLevel = 'mute'
  } else {
    volumeLevel = Math.round(audio.volume * 100) + '%'
  }
  volumeValue.innerHTML = `Volume ${volumeLevel}`
  volume.style.width = audio.volume * 100 + '%'
}
showCurrentVolume()

function showAudioDuration() {
  const a = Math.round(audio.duration)
  const c = a % 60
  const b = (a - c) / 60
  let durationMinutes = '0'
  let durationSeconds = '00'

  if (audio.duration > 0) {
    durationMinutes = b.toString()
  }
  if (audio.duration > 0) {
    durationSeconds = c.toString().padStart(2, 0)
  }

  progressMax.innerHTML = `${durationMinutes}:${durationSeconds}`
}


function showAudioCurrentTime() {
  const a = Math.round(audio.currentTime)
  const c = a % 60
  const b = (a - c) / 60
  let currentMinutes = '0'
  let currentSeconds = '00'

  if (audio.currentTime > 0) {
    currentMinutes = b.toString()
  }
  if (audio.currentTime > 0) {
    currentSeconds = c.toString().padStart(2, 0)
  }

  currentProgress.innerHTML = `${currentMinutes}:${currentSeconds}`
}

function showProgress () {
const duration = audio.duration
const currentTime = audio.currentTime
const thisCurrentProgress = currentTime / duration * 100
progress.style.width = thisCurrentProgress + '%'
}

function setProgress (event) {
  const allWidth = progressContainer.clientWidth
  const xPosition = event.offsetX
  const positionProcent = xPosition / allWidth
  if (currentTrack.innerHTML) {
  audio.currentTime = audio.duration * positionProcent
  }
}

function setVolume (event) {
  const allWidth = volumeContainer.clientWidth
  const xPosition = event.offsetX
  const positionProcent = xPosition / allWidth
  audio.volume = positionProcent
  if (muted === true) {
    changeMute()
  }
  showCurrentVolume()
}

function addVolume () {
  if (audio.volume <= 0.95) {
  audio.volume = audio.volume + 0.05
  } else {
    audio.volume = 1
  }
    if (muted === true) {
    changeMute()
  }
  showCurrentVolume()
}

function turnDownVolume () {
  if (audio.volume >= 0.05) {
  audio.volume = audio.volume - 0.05
  } else {
    audio.volume = 0
  }
    if (muted === true) {
    changeMute()
  }
  showCurrentVolume()
}

function showSettings () {
  settings.classList.add('active')
  backgrounds4.classList.add('dark')
  wrapper.classList.add('shrink')
  document.body.classList.add('block')
  player.classList.add('shrink')
}

function hideSettings () {
  settings.classList.remove('active')
  backgrounds4.classList.remove('dark')
  wrapper.classList.remove('shrink')
  document.body.classList.remove('block')
  player.classList.remove('shrink')
  player.classList.remove('shrink')
}

function showToDoList () {
  toDoList.classList.add('active')
  backgrounds4.classList.add('dark')
  wrapper.classList.add('shrink')
  document.body.classList.add('block')
  player.classList.add('shrink')
}

function hideToDoList () {
  toDoList.classList.remove('active')
  backgrounds4.classList.remove('dark')
  wrapper.classList.remove('shrink')
  document.body.classList.remove('block')
  player.classList.remove('shrink')
}


function removeElement (event) {
  if (event.target.classList.contains('toDoI')) {
     event.target.parentElement.classList.add('delete')
    setTimeout(() => {
      event.target.parentElement.remove()  
    }, 500);
  }
  showCleanToDoSection()
  showCleanDoneSection()
}


function changeList(click) {
  const li = click.target.parentElement.parentElement.parentElement

  if (click.target.checked === true) {
    showCleanToDoSection()
    li.classList.add('doneLi')
    li.classList.add('hide')
    setTimeout(() => {
    done.append(li)
    li.classList.remove('hide')
    hideCleanDoneSection()
    }, 300);

  } else {
    showCleanDoneSection()
    li.classList.add('hide')
    setTimeout(() => {
    toDo.append(li)
    li.classList.remove('hide')
    li.classList.remove('doneLi')
    hideCleanToDoSectionFast()
    }, 300);
  }
}

function addNewToDo (value) {  

  const li = document.createElement('li');
  li.classList.add('toDoLi')
  li.classList.add('active')
  const span = document.createElement('span');
  span.classList.add('toDoSpan')
  span.innerHTML = value
  span.setAttribute('contenteditable', 'true');
  const check = document.createElement('input')
  check.type = "checkbox"
  check.classList.add('toDoCheck')
  const label = document.createElement('label')
  label.classList.add('toDoLabel')
  
  check.addEventListener('click', changeList)
 
  const v1 = document.createElement('span')
  v1.classList.add('v1')
  const v2 = document.createElement('span')
  v2.classList.add('v2')
  
  const div = document.createElement('div')
  div.classList.add('toDoDiv')
  const i = document.createElement('i')
  i.classList.add('fa-solid')
  i.classList.add('fa-xmark')
  i.classList.add('toDoI')

  label.append(check, v1, v2,)
  div.append(label, span)

  li.append(div, i)
  li.addEventListener('mouseover', function () {
    i.classList.add('hover')
    li.classList.add('hover')
  })
  li.addEventListener('mouseout', function () {
    i.classList.remove('hover')
    li.classList.remove('hover')
  })
  li.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
      event.target.blur()
    }
  })
  return li
}

function pushToDo (value) {
  const li = addNewToDo(value)
  toDo.append(li)
  toDoListForm.newToDo.value = '' 
}

function pushDone (value) {
  const li = addNewToDo(value)
  li.classList.add('doneLi')
  done.append(li)
}

function showToDoSection () {
  titleDoneButton.classList.remove('active')
  doneWrapper.classList.remove('active')
  titleToDoButton.classList.add('active')
  toDoWrapper.classList.add('active')
}

function showDoneSection () {
  titleDoneButton.classList.add('active')
  doneWrapper.classList.add('active')
  titleToDoButton.classList.remove('active')
  toDoWrapper.classList.remove('active')
}

function hideCleanDoneSection () {
  setTimeout(() => {
  if (done.childElementCount >= 2) {
    cleanDoneText.classList.add('hide')
    cleanDoneText.classList.add('none')
  }    
  }, 500);
}

function hideCleanToDoSectionFast () {
  setTimeout(() => {
  if (toDo.childElementCount >= 2) {
    cleanToDoText.classList.add('hide')
    cleanToDoText.classList.add('none')
  }    
  }, 300);
}

function hideCleanToDoSection () {
  if (toDo.childElementCount >= 2) {
    cleanToDoText.classList.add('hide')
    setTimeout(() => {
    cleanToDoText.classList.add('none')
    }, 500)
  }    

}

function showCleanDoneSection () {
  setTimeout(() => {
  if ((done.childElementCount === 1) && (titleDoneButton.classList.contains('active'))) {
    cleanDoneText.classList.remove('none')
    setTimeout(() => {
    cleanDoneText.classList.remove('hide')
    }, 100);
  }    
  }, 500);
}

function showCleanToDoSection () {
  setTimeout(() => {
  if ((toDo.childElementCount === 1) && (titleToDoButton.classList.contains('active'))) {
    cleanToDoText.classList.remove('none')
    setTimeout(() => {
    cleanToDoText.classList.remove('hide')
    }, 100);
  }    
  }, 500);
}

function cleanList () {
  const toDoLi = document.querySelectorAll('.toDoLi')
  if (titleToDoButton.classList.contains('active')) { 
    toDoLi.forEach((value) => {
      if (!value.classList.contains('doneLi')) {
      value.classList.add('delete')
      setTimeout(() => {
      value.remove()  
      }, 500);
      }
    })
    showCleanToDoSection()
  } else {
    toDoLi.forEach((value) => {
      if (value.classList.contains('doneLi')) {
      value.classList.add('delete')
      setTimeout(() => {
      value.remove()  
      }, 500);
      }
    })  
  }
  
}






function getToDoArr () {
  localStorage.removeItem('toDo')
  settingList.toDo = []
  for (let key in toDo.children) {
    if ((key !== '0') && (typeof toDo.children[key] === 'object')) {
    settingList.toDo.push(toDo.children[key].children[0].children[1].innerHTML)
    }
  }
  localStorage.setItem('toDo', JSON.stringify(settingList.toDo))
}

function getDoneArr () {
  localStorage.removeItem('done')
  settingList.done = []
  for (let key in done.children) {
    if ((key !== '0') && (typeof done.children[key] === 'object')) {
    settingList.done.push(done.children[key].children[0].children[1].innerHTML)
    }
  }
  localStorage.setItem('done', JSON.stringify(settingList.done))
}

/////////////////////////////////////////////////////////////////////////

function setLocalStorage() {
  localStorage.setItem('username', yourNameInputJS.value)
  localStorage.setItem('weatherCity', weatherToSave)
  localStorage.setItem('volume', audio.volume)
  localStorage.setItem('viewBlocks', settingList.viewBlocks)
  localStorage.setItem('languageSelect', settingList.language)
  localStorage.setItem('photoSelect', settingList.photoSource)
  localStorage.setItem('tags', settingList.tags)
}

 // -------

yourName.addEventListener('click', showPopupYourName)

popupYourName.addEventListener('click', function (event) {
  if(event.target.classList.contains('popupYourName') && pSize === 'mini' )  {
    hidePopupYourName()
    setUsername()
  }
})

yourNameFormJS.addEventListener('submit', function (e) {
  e.preventDefault()
  hidePopupYourName()
  setUsername()
})

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('beforeunload', getToDoArr)
window.addEventListener('beforeunload', getDoneArr)


sliderButton[1].addEventListener('click', slideToRight)
sliderButton[0].addEventListener('click', slideToLeft)

weather.addEventListener('click', showChangeCity)

document.addEventListener('click', (e) => {
  if (changeCityForm.classList.contains('active')){
  if (!e.target.closest('.weather')) {
    hideChangeCity()
    getWeather()
  }
  }
})
changeCityForm.addEventListener('submit', function (e) {
  e.preventDefault()
  hideChangeCity()
  getWeather()
})

refreshQuote.addEventListener('click', changeQuote)

mainMusicButton.addEventListener('click', startStopMusic)


previousTrack.addEventListener('click', playPreviousTrack)
nextTrack.addEventListener('click', playNextTrack)

playlist.addEventListener('click', function changeTrack (event) {
  if(event.target.classList.contains('notActive')) {
    const tracks = document.querySelectorAll('.track')
    tracks.forEach((value, index) => {
    if (event.target.innerHTML === value.innerHTML) {
      trackNumber = index
      playAudio()
    } 
  })
  } else {
    startStopMusic()
  }
})

audio.addEventListener('timeupdate', cycleAudio)
playerSize.addEventListener('click', changePlayerSize)
backgrounds3.addEventListener('click', changePlayerSize)
muteButton.addEventListener('click', changeMute)
audio.addEventListener('timeupdate', showAudioCurrentTime)
audio.addEventListener('timeupdate', showProgress)
audio.addEventListener('timeupdate', showAudioDuration)
progressContainer.addEventListener('click', setProgress)
volumeContainer.addEventListener('click', setVolume)
volumeMax.addEventListener('click', addVolume)
volumeMin.addEventListener('click', turnDownVolume)
settingsButton.addEventListener('click', showSettings)

settingsCloseButton.addEventListener('click', hideSettings)
displayElements.addEventListener('click', function(event) {
  if (event.target.classList.contains('checkbox')) {
    changeSettingBlocks ()
  }
})
backgrounds4.addEventListener('click', hideSettings)
backgrounds4.addEventListener('click', hideToDoList)
languageSelector.addEventListener('change', changeLanguage)
imagesSelector.addEventListener('change', changePictures)
settingsTextInput.addEventListener('blur', changeTags)
settings.addEventListener('submit', function(e) {
e.preventDefault()
hideSettings()
changeTags()
})
toDoButton.addEventListener('click', showToDoList)
toDoCloseButton.addEventListener('click', hideToDoList)
toDoListForm.addEventListener('submit', function (event) {
  event.preventDefault()
  pushToDo(toDoListForm.newToDo.value)
})
toDoListForm.addEventListener('submit', hideCleanToDoSection)
toDo.addEventListener('click', removeElement)
done.addEventListener('click', removeElement)
titleToDoButton.addEventListener('click', showToDoSection)
titleDoneButton.addEventListener('click', showDoneSection)
toDoListForm.addEventListener('submit', showToDoSection)
cleanButton.addEventListener('click', cleanList)
cleanButton.addEventListener('click', showCleanDoneSection)
testButton.addEventListener('click', getDoneArr)
