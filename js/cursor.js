(function () {
    if (typeof window.CUSTOM_CURSOR_ENABLED !== 'undefined' && !window.CUSTOM_CURSOR_ENABLED) {
        return;
    }

    var style = document.createElement('style');
    style.id = 'cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.insertBefore(style, document.head.firstChild);

    function init() {
        var cursor = document.createElement('div');
        cursor.className = 'custom-cursor default';
        document.body.appendChild(cursor);

        var mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        var currentState = 'default';
        var isDown = false;

        var interactive = 'a,button,input,select,textarea,label,img,svg,[role="button"],[onclick],[tabindex],.product,.categoria-btn,.hamburguer,.clickable,.btn,.action-btn,.carrossel-btn,.payment-method,i';

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        (function animate() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animate);
        })();

        function setState(s) {
            if (currentState !== s) {
                currentState = s;
                cursor.className = 'custom-cursor ' + s;
            }
        }

        document.addEventListener('mousedown', function () { isDown = true; setState('click'); }, { passive: true });
        document.addEventListener('mouseup', function () {
            isDown = false;
            var el = document.elementFromPoint(mouseX, mouseY);
            setState(el && el.closest && el.closest(interactive) ? 'hover' : 'default');
        }, { passive: true });

        document.addEventListener('mouseover', function (e) {
            if (!isDown && e.target.closest && e.target.closest(interactive)) setState('hover');
        }, { passive: true });

        document.addEventListener('mouseout', function (e) {
            if (!isDown && e.target.closest && e.target.closest(interactive)) setState('default');
        }, { passive: true });

        document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; }, { passive: true });
        document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; }, { passive: true });

        document.addEventListener('dragstart', function (e) {
            if (e.target.tagName === 'IMG') e.preventDefault();
        });
    }

    if (document.body) init();
    else document.addEventListener('DOMContentLoaded', init);
})();
