
const shareButtons = document.querySelectorAll('.tile-share-button');
console.log(shareButtons)
// Add an event listener to each share button
shareButtons.forEach(button => {
    button.addEventListener('click', copyText);
});

async function copyText(e) {
    e.preventDefault();  // Prevent default action (if needed)
    
    // Get the 'link' attribute from the button that was clicked
    const link = this.getAttribute('link');
    console.log(link);
    
    if (link) {
        try {
            // Use the Clipboard API to write the text to the clipboard
            await navigator.clipboard.writeText(link);
            alert("Copied the text: " + link);
        } catch (err) {
            console.error('Error copying text: ', err);
        }
    } else {
        console.error('No link attribute found.');
    }
}



document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed(".text", {
        strings: [ "Hey There!","I Am... Shyam" , "Frontend Developer", "Connect With Me"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});