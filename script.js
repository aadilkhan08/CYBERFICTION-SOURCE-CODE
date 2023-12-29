// Function to initialize LocomotiveScroll and GSAP ScrollTrigger
function locomotive() {
    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize LocomotiveScroll with smooth scrolling on #main element
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    
    // Update ScrollTrigger on scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    // Proxy #main element for ScrollTrigger
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            // If value is provided, scroll to the value, else return current scroll position
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },

        getBoundingClientRect() {
            // Return bounding client rect for #main element
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },

        // Determine pinType based on #main element's transform style
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });
    
    // Update LocomotiveScroll on ScrollTrigger refresh
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
}
// Call locomotive function
locomotive();

// Get canvas and its context
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Set canvas width and height to window's inner width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas width and height on window resize
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

// Function to generate file path for image sequence
function files(index) {
    let fileNumber = String(index + 1).padStart(4, '0'); // This will ensure the number is always 4 digits
    let filePath = `./assets/male${fileNumber}.png`;
    return filePath;
}

// Total number of frames in the image sequence
const frameCount = 300;

// Array to hold image elements for the sequence
const images = [];
const imageSeq = {
    frame: 1,
};

// Create image elements for each frame and add to images array
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
}

// Animate image sequence with GSAP and ScrollTrigger
gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
        scrub: 0.15,
        trigger: `#page>canvas`,
        start: `top top`,
        end: `600% top`,
        scroller: `#main`,
    },
    onUpdate: render,
});

// Render first frame when it loads
images[1].onload = render;

// Function to render current frame
function render() {
    scaleImage(images[imageSeq.frame], context);
}

// Function to scale image to fit canvas
function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
}

// Create ScrollTrigger for canvas
ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `600% top`,
});

// Create ScrollTriggers for #page1, #page2, and #page3
gsap.to("#page1", {
    scrollTrigger: {
        trigger: `#page1`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
    }
})
gsap.to("#page2", {
    scrollTrigger: {
        trigger: `#page2`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
    }
})
gsap.to("#page3", {
    scrollTrigger: {
        trigger: `#page3`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
    }
})