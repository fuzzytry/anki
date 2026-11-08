// craft.js — additive behaviour layered over app.js. No dependencies.
(() => {
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s))
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches

  // Flowers bloom once, when they arrive on screen (hero ones are staggered by CSS delay).
  const bloomObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      e.target.classList.add('in')
      bloomObserver.unobserve(e.target)
    })
  }, { threshold: 0.25 })
  $$('.flower-svg').forEach((flower, i) => {
    if (!flower.classList.contains('hf')) flower.style.setProperty('--d', `${(i % 3) * 0.18}s`)
    bloomObserver.observe(flower)
  })

  // Prints settle onto the page as they scroll in, like they were just laid down.
  if (!calm) {
    const printObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('settled')
        printObserver.unobserve(e.target)
      })
    }, { threshold: 0.12 })
    $$('.spread > figure').forEach((fig) => { fig.classList.add('pre'); printObserver.observe(fig) })
  }

  // The garden: tap anywhere and a hibiscus blooms there. They fade away on their own.
  const garden = $('.garden-illustration')
  const note = $('#bloom-message')
  let planted = 0
  garden.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return
    const box = garden.getBoundingClientRect()
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 200 200')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('class', 'planted')
    svg.style.left = `${event.clientX - box.left}px`
    svg.style.top = `${event.clientY - box.top}px`
    svg.style.rotate = `${Math.round(Math.random() * 60 - 30)}deg`
    svg.innerHTML = '<g class="fl"><use href="#hibiscus"/></g>'
    garden.appendChild(svg)
    window.setTimeout(() => svg.remove(), 14000)
    if (++planted === 1 && note) {
      note.classList.add('visible')
      window.setTimeout(() => note.classList.remove('visible'), 2400)
    }
    while ($$('.planted', garden).length > 14) $('.planted', garden).remove()
  })

  // Photo viewer: fade each photo in once decoded, and warm up its neighbours.
  const img = $('#lightbox-image')
  if (img) {
    new MutationObserver(() => {
      img.classList.remove('ready')
      const src = img.getAttribute('src')
      if (!src) return
      const all = $$('[data-photo] img').map((p) => p.getAttribute('src'))
      const at = all.indexOf(src)
      ;[at - 1, at + 1].forEach((n) => { if (all[n]) new Image().src = all[n] })
    }).observe(img, { attributes: true, attributeFilter: ['src'] })
    img.addEventListener('load', () => img.classList.add('ready'))
    if (calm) img.classList.add('ready')
  }
})()
