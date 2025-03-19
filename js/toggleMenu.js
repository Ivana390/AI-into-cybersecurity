function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    const mainContent = document.querySelector(".main-content");
    const footer = document.querySelector(".footer-content");
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
        mainContent.style.transform = "translateY(200px)";
        footer.style.transform = "translateY(200px)" // Adjust the value as needed
    } else {
        mainContent.style.transform = "translateY(0)";
        footer.style.transform = "translateY(0)" // Adjust the value as needed
    }
}