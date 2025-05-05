// Click counter logic for each link
function getClickCounts() {
    return JSON.parse(localStorage.getItem('linktree_click_counts') || '{}');
}

function setClickCounts(counts) {
    localStorage.setItem('linktree_click_counts', JSON.stringify(counts));
}

document.addEventListener('DOMContentLoaded', function () {
    // Typed.js animation
    var typed = new Typed('.text', {
        strings: ["Hey There!", "I Am... Shyam", "Frontend Developer", "Connect With Me"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Click counter setup
    const counts = getClickCounts();
    document.querySelectorAll('.click-count').forEach(function (el) {
        const key = el.getAttribute('data-link');
        el.textContent = counts[key] || 0;
    });

    document.querySelectorAll('.tile').forEach(function (tile) {
        tile.addEventListener('click', function () {
            const label = tile.querySelector('.click-count');
            if (!label) return;
            const key = label.getAttribute('data-link');
            const counts = getClickCounts();
            counts[key] = (counts[key] || 0) + 1;
            setClickCounts(counts);
            label.textContent = counts[key];
        });
    });

    // Share button logic
    const shareBtn = document.querySelector('.share-button');
    if (shareBtn) {
        function doShare() {
            const shareData = {
                title: document.title,
                text: 'Check out my Linktree!',
                url: window.location.href
            };
            if (navigator.share) {
                navigator.share(shareData).catch(() => {});
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showShareNotification('Link copied to clipboard!');
                });
            } else {
                // fallback
                prompt('Copy this link:', window.location.href);
            }
        }
        shareBtn.addEventListener('click', doShare);
        shareBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                doShare();
            }
        });
    }

    // Add ARIA live region for notification
    if (!document.getElementById('share-notification')) {
        const notif = document.createElement('div');
        notif.id = 'share-notification';
        notif.setAttribute('aria-live', 'polite');
        notif.style.position = 'fixed';
        notif.style.bottom = '24px';
        notif.style.left = '50%';
        notif.style.transform = 'translateX(-50%)';
        notif.style.background = '#232526';
        notif.style.color = '#fff';
        notif.style.padding = '10px 24px';
        notif.style.borderRadius = '16px';
        notif.style.fontSize = '1rem';
        notif.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
        notif.style.display = 'none';
        notif.style.zIndex = '9999';
        document.body.appendChild(notif);
    }
});

function showShareNotification(msg) {
    const notif = document.getElementById('share-notification');
    if (notif) {
        notif.textContent = msg;
        notif.style.display = 'block';
        setTimeout(() => {
            notif.style.display = 'none';
        }, 1800);
    }
}
