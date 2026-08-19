// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Part 1: The Trap &amp; The Brainwashing</li><li class="chapter-item expanded "><a href="01.html"><strong aria-hidden="true">1.</strong> Chapter 1: The Mirage of Safety</a></li><li class="chapter-item expanded "><a href="02.html"><strong aria-hidden="true">2.</strong> Chapter 2: The Universal Prison: How We Got Hooked</a></li><li class="chapter-item expanded "><a href="03.html"><strong aria-hidden="true">3.</strong> Chapter 3: The Two Monsters: Primitive Glitch vs. Mental Fiction</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 2: Dismantling the Illusions</li><li class="chapter-item expanded "><a href="04.html"><strong aria-hidden="true">4.</strong> Chapter 4: The Arithmetic of "No": Why You Never Lose What You Don&#39;t Have</a></li><li class="chapter-item expanded "><a href="05.html"><strong aria-hidden="true">5.</strong> Chapter 5: The Fallacy of the Value Thief: Who Holds Your Self-Esteem?</a></li><li class="chapter-item expanded "><a href="06.html"><strong aria-hidden="true">6.</strong> Chapter 6: The Magic Trick Exposed: The False High of Avoidance</a></li><li class="chapter-item expanded "><a href="07.html"><strong aria-hidden="true">7.</strong> Chapter 7: The Myth of the Harsh Spotlight: The Invisible Audience</a></li><li class="chapter-item expanded "><a href="08.html"><strong aria-hidden="true">8.</strong> Chapter 8: The People-Pleasing Trap: The Most Selfish Virtue</a></li><li class="chapter-item expanded "><a href="09.html"><strong aria-hidden="true">9.</strong> Chapter 9: Professional Phantoms: Resumes, Raises, and Boardroom Ghosts</a></li><li class="chapter-item expanded "><a href="10.html"><strong aria-hidden="true">10.</strong> Chapter 10: Romantic Illusions: Chemistry vs. Personal Validation</a></li><li class="chapter-item expanded "><a href="11.html"><strong aria-hidden="true">11.</strong> Chapter 11: The Overthinking Maze: Why Rehearsing Failure Guarantees It</a></li><li class="chapter-item expanded "><a href="12.html"><strong aria-hidden="true">12.</strong> Chapter 12: The Myth of "Thick Skin": Why Courage Is Unnecessary</a></li><li class="chapter-item expanded "><a href="13.html"><strong aria-hidden="true">13.</strong> Chapter 13: Substitute Addictions: Perfectionism, Isolation, and the Cynic&#39;s Shield</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 3: The Reframe</li><li class="chapter-item expanded "><a href="14.html"><strong aria-hidden="true">14.</strong> Chapter 14: Real Hunger vs. The Craving for Approval</a></li><li class="chapter-item expanded "><a href="15.html"><strong aria-hidden="true">15.</strong> Chapter 15: Rejection as a Sorting Mechanism, Not a Sentence</a></li><li class="chapter-item expanded "><a href="16.html"><strong aria-hidden="true">16.</strong> Chapter 16: The Freedom of Immunity: Life Without the Mask</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 4: Liberation</li><li class="chapter-item expanded "><a href="17.html"><strong aria-hidden="true">17.</strong> Chapter 17: The Closing Ritual: Resigning from Self-Rejection</a></li><li class="chapter-item expanded "><a href="18.html"><strong aria-hidden="true">18.</strong> Chapter 18: The Non-Fearful Life: Walking in Permanent Sunshine</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
