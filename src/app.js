const archiveEntries = {
  tea: {
    title: 'Tea, both kinds',
    note: 'Confidentiality level: questionable.',
    body: "Actual tea, and the other kind. You have strong opinions on both.",
    artwork: `<svg viewBox="0 0 160 140" aria-hidden="true"><g fill="none" stroke="#665b4c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M47 58 H111 L105 104 Q80 116 55 104Z" fill="#fff8eb"/><path d="M111 68 H123 Q145 69 137 90 Q132 102 109 97"/><path d="M42 112 Q80 124 118 112"/><path d="M67 48 C57 37 73 32 65 19 M84 49 C75 39 91 33 84 18 M99 49 C91 41 104 35 99 26" stroke="#b77b72" stroke-width="1.7"/><path d="M55 66 H102" stroke="#c56f69" stroke-width="1.5"/></g><ellipse cx="79" cy="112" rx="49" ry="8" fill="#bba98f" opacity=".22"/></svg>`,
  },
  baking: {
    title: 'The baking era',
    note: 'Nobody saw it coming. Least of all me.',
    body: "The sudden baking-and-cooking era. One day it was just a rumour, the next there were cinnamon rolls. Character development, apparently.",
    artwork: `<svg viewBox="0 0 160 140" aria-hidden="true"><g stroke="#665b4c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M35 82 Q80 68 126 82 L119 111 Q80 124 42 111Z" fill="#d9b18a"/><path d="M42 84 Q80 95 119 84" fill="none"/>${[56, 79, 102].map((x) => `<g><circle cx="${x}" cy="78" r="13" fill="#c98961"/><circle cx="${x-4}" cy="75" r="1.5" fill="#705542" stroke="none"/><circle cx="${x+4}" cy="81" r="1.5" fill="#705542" stroke="none"/></g>`).join('')}<path d="M111 40 Q123 26 130 38 M114 44 Q122 54 128 44 M119 42 L93 69 M27 50 L44 37 L56 50" fill="none"/></g><ellipse cx="80" cy="119" rx="52" ry="7" fill="#bba98f" opacity=".2"/></svg>`,
  },
  tiger: {
    title: 'Tiger cub, flowers',
    note: 'All bite. Some bloom.',
    body: "A tiger cub with flowers, permanently. Strong-willed, stubborn, and a bit softer than you let on. Honestly checks out.",
    artwork: `<img class="archive-tiger" src="art/tiger-hibiscus.png" alt="Ink illustration of a tiger cub with hibiscus flowers">`,
  },
  music: {
    title: 'The playlists',
    note: 'Chatpate songs are a lifestyle.',
    body: "Loud, dramatic and unapologetically chatpate. The song choice is a full personality statement and I have no complaints.",
    artwork: `<svg viewBox="0 0 160 140" aria-hidden="true"><g stroke="#665b4c" stroke-width="2.2" stroke-linejoin="round"><rect x="42" y="23" width="76" height="99" rx="7" fill="#7f8c73"/><rect x="51" y="33" width="58" height="38" rx="2" fill="#e8dfc9"/><path d="M60 49 H100 M60 58 H88" stroke="#a66b64" stroke-width="2"/><circle cx="80" cy="91" r="14" fill="#e6d6b5"/><circle cx="80" cy="91" r="4" fill="#756a58"/><circle cx="58" cy="91" r="3" fill="#e6d6b5"/><circle cx="102" cy="91" r="3" fill="#e6d6b5"/></g><path d="M118 40 Q136 28 139 44 M119 49 Q131 43 133 55" fill="none" stroke="#b66d68" stroke-width="2" stroke-linecap="round"/><ellipse cx="80" cy="125" rx="44" ry="6" fill="#bba98f" opacity=".2"/></svg>`,
  },
  lore: {
    title: 'Need-to-know',
    note: 'Your secrets are safe. Mostly.',
    body: "Tea and lore, mostly. What gets said here stays here. Mostly.",
    artwork: `<svg viewBox="0 0 160 140" aria-hidden="true"><path d="M30 44 L80 79 L130 44" fill="none" stroke="#665b4c" stroke-width="2.3"/><path d="M30 44 H130 V110 H30Z" fill="#eee1c9" stroke="#665b4c" stroke-width="2.3" stroke-linejoin="round"/><path d="M30 110 L70 73 M130 110 L90 73" fill="none" stroke="#a47769" stroke-width="1.7"/><circle cx="80" cy="82" r="10" fill="#bd6664" stroke="#93514f" stroke-width="1.5"/><path d="M80 72 V92 M70 82 H90" stroke="#f2d9ba" stroke-width="1"/></svg>`,
  },
}

const $ = (selector, root = document) => root.querySelector(selector)
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

// The garden archive changes one illustrated artefact at a time.
$$('[data-archive]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.archive
    const item = archiveEntries[key]
    if (!item) return
    $$('[data-archive]').forEach((tab) => {
      const active = tab === button
      tab.classList.toggle('active', active)
      tab.setAttribute('aria-selected', String(active))
      $('.archive-plus', tab).textContent = active ? '−' : '+'
    })
    $('#archive-title').textContent = item.title
    $('#archive-body').textContent = item.body
    $('#archive-note').textContent = item.note
    $('#archive-object').innerHTML = item.artwork
    $('#archive-object').className = `archive-object object-${key}`
    $('#archive-detail').classList.remove('detail-refresh')
    requestAnimationFrame(() => $('#archive-detail').classList.add('detail-refresh'))
  })
})

// First-meeting replay: a tiny entrance, one "hello", then the stamp.
let meetingTimer
$('#replay-meeting').addEventListener('click', () => {
  clearTimeout(meetingTimer)
  const person = $('#little-person')
  const bubble = $('#speech-bubble')
  const stamp = $('#cinema-stamp')
  person.classList.remove('person-arrived')
  bubble.classList.remove('speech-show')
  stamp.classList.remove('cinema-visible')
  meetingTimer = window.setTimeout(() => person.classList.add('person-arrived'), 120)
  meetingTimer = window.setTimeout(() => bubble.classList.add('speech-show'), 650)
  meetingTimer = window.setTimeout(() => stamp.classList.add('cinema-visible'), 1250)
  $('#replay-meeting span').textContent = 'Replay the awkwardness'
})

// A very serious fashion runway. Obviously.
$('#replay-runway').addEventListener('click', () => {
  const runway = $('#runway-visual')
  runway.classList.remove('runway-playing')
  void runway.offsetWidth
  runway.classList.add('runway-playing')
  $('#replay-runway span').textContent = 'Run it back'
})

// The court will accept the first verdict. It is not a particularly reliable court.
$$('[data-verdict]').forEach((button) => {
  button.addEventListener('click', () => {
    const verdict = button.dataset.verdict
    $$('[data-verdict]').forEach((choice) => choice.classList.toggle('chosen', choice === button))
    $('#verdict-line').innerHTML = verdict === 'guilty'
      ? 'See? This is why the legal system cannot be trusted. <span>Case remains open.</span>'
      : 'Finally. Justice has been served. <span>Case remains open.</span>'
  })
})

// Envelope can be opened from either the illustration or its text control.
function togglePostscript() {
  const open = !$('#envelope').classList.contains('open')
  $('#envelope').classList.toggle('open', open)
  $('#postscript-message').classList.toggle('visible', open)
  $('#postscript-message').setAttribute('aria-hidden', String(!open))
  $('#envelope').setAttribute('aria-expanded', String(open))
  $('#postscript-toggle').setAttribute('aria-expanded', String(open))
  $('#postscript-toggle span').textContent = open ? 'Fold it away' : 'Open this'
}
$('#envelope').addEventListener('click', togglePostscript)
$('#postscript-toggle').addEventListener('click', togglePostscript)

// Letter copy is revealed as each paragraph enters the reading area.
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      letterObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.22 })
$$('[data-letter-paragraph]').forEach((paragraph) => letterObserver.observe(paragraph))

// One flower is touchable. The garden needn't be a screensaver.
$('.bloom-button').addEventListener('click', () => {
  $('.bloom-button').classList.remove('bloomed')
  void $('.bloom-button').offsetWidth
  $('.bloom-button').classList.add('bloomed')
  $('#bloom-message').classList.add('visible')
  window.setTimeout(() => $('#bloom-message').classList.remove('visible'), 2200)
})

// Opening transition and anchor scroll.
$('#enter-button').addEventListener('click', () => {
  $('.hero').classList.add('hero-entered')
  $('#enter-button span:first-child').textContent = 'Enjoy the garden'
  $('#garden').scrollIntoView({ behavior: 'smooth' })
})

// A very quiet original ambient pad. It starts only after the visitor asks for it.
let ambient = null
let soundOn = false
async function toggleAmbience() {
  const button = $('#sound-toggle')
  if (soundOn) {
    if (ambient) {
      const current = ambient
      current.gain.gain.setTargetAtTime(0, current.context.currentTime, 0.18)
      window.setTimeout(() => {
        current.oscillators.forEach((oscillator) => { try { oscillator.stop() } catch { /* already stopped */ } })
        current.context.close().catch(() => {})
        if (ambient === current) ambient = null
      }, 750)
    }
    soundOn = false
  } else {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      $('#sound-label').textContent = 'SOUND UNAVAILABLE'
      return
    }
    const context = new AudioContextClass()
    await context.resume()
    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    const gain = context.createGain()
    gain.gain.setValueAtTime(0, context.currentTime)
    gain.gain.setTargetAtTime(0.008, context.currentTime, 1.2)
    filter.connect(gain)
    gain.connect(context.destination)
    const oscillators = [110, 164.81, 220].map((frequency, index) => {
      const oscillator = context.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      oscillator.detune.value = index * 3 - 3
      oscillator.connect(filter)
      oscillator.start()
      return oscillator
    })
    ambient = { context, oscillators, gain }
    soundOn = true
  }
  button.classList.toggle('is-on', soundOn)
  button.setAttribute('aria-pressed', String(soundOn))
  button.setAttribute('aria-label', soundOn ? 'Turn sound off' : 'Turn sound on')
  $('#sound-label').textContent = soundOn ? 'SOUND ON' : 'SOUND OFF'
}
$('#sound-toggle').addEventListener('click', () => { toggleAmbience().catch(() => {}) })
window.addEventListener('pagehide', () => {
  if (!ambient) return
  ambient.oscillators.forEach((oscillator) => { try { oscillator.stop() } catch { /* already stopped */ } })
  ambient.context.close().catch(() => {})
  ambient = null
})

// Make a wish: a restrained warm flash, no sound, no pop-up.
$('#wish-button').addEventListener('click', () => {
  document.body.classList.add('wish-made')
  $('#wish-response').hidden = false
  $('#wish-button span').textContent = 'Wish sent'
  $('#wish-button').setAttribute('aria-pressed', 'true')
})

// Tiny footer easter egg.
$('#secret-button').addEventListener('click', () => {
  $('#secret-note').hidden = false
  window.setTimeout(() => { $('#secret-note').hidden = true }, 4800)
  $('#final').scrollIntoView({ behavior: 'smooth' })
})

// Photo archive: three small collections, one shared viewer, originals left intact.
const galleryTabs = $$('[data-gallery-tab]')
const galleryPanels = $$('[data-gallery-panel]')
function activateGalleryTab(tab) {
  const key = tab.dataset.galleryTab
  galleryTabs.forEach((item) => {
    const selected = item === tab
    item.classList.toggle('active', selected)
    item.setAttribute('aria-selected', String(selected))
    item.tabIndex = selected ? 0 : -1
  })
  galleryPanels.forEach((panel) => {
    const selected = panel.dataset.galleryPanel === key
    panel.hidden = !selected
    panel.classList.toggle('active', selected)
  })
}
galleryTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateGalleryTab(tab))
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const current = galleryTabs.indexOf(tab)
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? galleryTabs.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + galleryTabs.length) % galleryTabs.length
    galleryTabs[next].focus()
    activateGalleryTab(galleryTabs[next])
  })
})

const galleryPhotos = $$('[data-photo]').map((button) => ({
  src: $('img', button).getAttribute('src'),
  alt: $('img', button).alt,
  caption: $('figcaption p', button.closest('figure')).textContent,
  trigger: button,
}))
const lightbox = $('#photo-lightbox')
let activePhoto = 0
let lastPhotoTrigger = null
function showPhoto(index) {
  activePhoto = (index + galleryPhotos.length) % galleryPhotos.length
  const photo = galleryPhotos[activePhoto]
  $('#lightbox-image').src = photo.src
  $('#lightbox-image').alt = photo.alt
  $('#lightbox-caption').textContent = photo.caption
  $('#lightbox-count').textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(galleryPhotos.length).padStart(2, '0')}`
}
$$('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    lastPhotoTrigger = button
    showPhoto(Number(button.dataset.photo))
    if (!lightbox.open) lightbox.showModal()
    $('#lightbox-close').focus()
  })
})
$('#lightbox-prev').addEventListener('click', () => showPhoto(activePhoto - 1))
$('#lightbox-next').addEventListener('click', () => showPhoto(activePhoto + 1))
$('#lightbox-close').addEventListener('click', () => lightbox.close())
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close()
})
lightbox.addEventListener('close', () => {
  $('#lightbox-image').removeAttribute('src')
  if (lastPhotoTrigger && document.contains(lastPhotoTrigger)) lastPhotoTrigger.focus()
})
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return
  if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1)
  if (event.key === 'ArrowRight') showPhoto(activePhoto + 1)
})
let touchStartX = null
lightbox.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX
}, { passive: true })
lightbox.addEventListener('touchend', (event) => {
  if (touchStartX === null) return
  const delta = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) > 48) showPhoto(activePhoto + (delta < 0 ? 1 : -1))
  touchStartX = null
}, { passive: true })
