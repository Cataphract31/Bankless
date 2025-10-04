// --- Scroll-Triggered Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});


// --- "Hacker" Text Scramble Effect ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const h1 = document.querySelector("h1");
if (h1) {
    const originalText = h1.dataset.value;
    let interval = null;

    const runScrambleAnimation = () => {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
            h1.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    };

    window.onload = () => {
        // A small delay can help ensure all elements are loaded before animation
        setTimeout(runScrambleAnimation, 100);
    };
}


// --- Click-to-Copy Contract Address ---
function copyContractAddress() {
    const contractInput = document.getElementById("contractInput");
    if (!contractInput) return;

    contractInput.select();
    contractInput.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(contractInput.value);
        const tooltip = document.getElementById("copyTooltip");
        if (tooltip) {
            tooltip.textContent = "Copied!";
            setTimeout(() => {
                tooltip.textContent = "Click to copy";
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}