/* ═══════════════════════════════════════════════════════════════
   THE ENTROPIC SCRIPTURES - MAIN SCRIPT
   Navigation, interactivity, and rendering
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderBookList();
    renderScriptures();
    setupEventListeners();
    updateProgress();
}

// ═══════════════════════════════════════════════════════════════
// RENDER NAVIGATION
// ═══════════════════════════════════════════════════════════════

function renderBookList() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = SCRIPTURES.map((book, index) => `
        <li>
            <a href="#book-${index}" class="${index === 0 ? 'active' : ''}">
                <span class="book-num">${toRoman(index + 1)}.</span> ${book.title}
            </a>
        </li>
    `).join('');
}

function toRoman(num) {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return roman[num - 1] || num;
}

// ═══════════════════════════════════════════════════════════════
// RENDER SCRIPTURES
// ═══════════════════════════════════════════════════════════════

function renderScriptures() {
    const container = document.getElementById('scriptureContainer');
    container.innerHTML = SCRIPTURES.map((book, bookIndex) => `
        <section class="book-section" id="book-${bookIndex}">
            <header class="book-header">
                <div class="book-number">Book ${toRoman(bookIndex + 1)}</div>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-subtitle">${book.subtitle}</p>
                <p class="book-intro">${book.intro}</p>
            </header>
            ${book.chapters.map((chapter, chapterIndex) => renderChapter(chapter, bookIndex, chapterIndex)).join('')}
            <div class="sacred-divider"><span>✦</span></div>
        </section>
    `).join('');
}

function renderChapter(chapter, bookIndex, chapterIndex) {
    return `
        <div class="chapter">
            <h3 class="chapter-title">${chapter.title}</h3>
            ${chapter.verses.map((verse, verseIndex) => renderVerse(verse, bookIndex, chapterIndex, verseIndex)).join('')}
            ${chapter.revelation ? `<div class="revelation-box"><p>${chapter.revelation}</p></div>` : ''}
        </div>
    `;
}

function renderVerse(verse, bookIndex, chapterIndex, verseIndex) {
    const verseNum = `${bookIndex + 1}:${chapterIndex + 1}:${verseIndex + 1}`;
    const classes = ['verse-text'];
    if (verse.emphasis) classes.push('emphasis');
    if (verse.commandment) classes.push('commandment');

    return `
        <div class="verse" data-verse="${verseNum}">
            <span class="verse-number">${verseIndex + 1}</span>
            <span class="${classes.join(' ')}">${verse.text}</span>
        </div>
    `;
}

// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Book navigation
    document.querySelectorAll('.book-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.book-list a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    // Font size
    const fontSelect = document.getElementById('fontSizeSelect');
    fontSelect.addEventListener('change', (e) => {
        const container = document.getElementById('scriptureContainer');
        container.classList.remove('font-small', 'font-medium', 'font-large');
        container.classList.add(`font-${e.target.value}`);
    });

    // Scroll progress
    window.addEventListener('scroll', updateProgress);

    // Active section highlighting
    window.addEventListener('scroll', highlightActiveSection);
}

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('.book-section');
    const links = document.querySelectorAll('.book-list a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
