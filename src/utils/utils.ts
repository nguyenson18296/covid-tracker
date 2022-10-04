// ==============================
// Scroll Helpers
// ==============================
export function isDocumentElement(
    el: HTMLElement | typeof window
  ): el is typeof window {
      return [document.documentElement, document.body, window].indexOf(el) > -1;
  }

// Normalized scrollTo & scrollTop
// ------------------------------
export function getScrolltoTop(el: HTMLElement | typeof window): number {
    if (isDocumentElement(el)) {
        return window.innerHeight;
    }

    return el.clientHeight;
}

export function scrollTo(el: HTMLElement | typeof window, top: number): void {
    if (isDocumentElement(el)) {
        window.scrollTo(0, top);
        return;
    }

    el.scrollTop = top;
}

// Scroll Into View
// ------------------------------

export function scrollIntoView(
    menuEl: HTMLElement,
    focusedEl: HTMLElement
): void {
    const menuRect = menuEl.getBoundingClientRect();
    const focusedRect = focusedEl.getBoundingClientRect();
    const overScroll = focusedEl.offsetHeight / 3;

    console.log("focusedEl", focusedEl);
    console.log("menuRect", menuRect);
    console.log("focusedRect", focusedRect);
    console.log("overScroll", overScroll);

    if (focusedRect.bottom + overScroll > menuRect.bottom) {
        console.log("aaaaaa");
        scrollTo(
            menuEl,
            Math.min(
                focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll,
                menuEl.scrollHeight
            )
        )
    } else if (focusedRect.top - overScroll < menuRect.top) {
        console.log("bbbbbbb");
        scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
    }
}