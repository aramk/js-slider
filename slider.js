/*
This script initialises Swipe and adds some extra functionality. Requires jQuery.
The content in this project adopts the same licence as Swipe. */
(function ($) {
	function swipe() {
        var swipeElem = document.getElementById('slider');
        var $swipe = $(swipeElem);
        var swipe;
        var $nav = $swipe.next('.nav');
        var slideCount = $swipe.find('li').length;
        var activeCSS = 'pointer-active';
        var posAttr = 'data-pos';
        // Set up DOM
        $nav.html('');
        var wrapper = $('<div class="pointers"></div>');
        $nav.append(wrapper);
        // Create the pointers
        var pointers = [];
        for (var i = 0; i < slideCount; i++) {
            var pointer = $('<a href="#" class="pointer" ' + posAttr + '="' + i + '"></a>');
            pointers.push(pointer);
            wrapper.append(pointer);
            pointer.click(function (event) {
                if (swipe) {
                    var index = $(this).attr(posAttr);
                    swipe.slide(parseInt(index));
                }
                event.preventDefault();
            });
        }
        // Stop moving on hover
        $([$swipe, $nav]).each(function (i, $obj) {
            $obj.hover(function () {
                if (swipe) {
                    swipe.stop();
                }
            }, function () {
                if (swipe) {
                    swipe.resume();
                }
            });
        });
        // Configure state
        var startIndex = 0;
        var lastPointer = pointers[startIndex];
        var updateSwipe = function (index) {
            if (index < pointers.length) {
                var currPointer = pointers[index];
                currPointer.addClass(activeCSS);
                if (lastPointer != currPointer) {
                    lastPointer.removeClass(activeCSS);
                }
                lastPointer = currPointer;
            }
        };
        updateSwipe(startIndex);
        // Create the slider
        swipe = new Swipe(swipeElem, {
                callback: function (event, index, elem) {
                    updateSwipe(index);
                },
                auto: 2000
            }
        );
    }

    $(document).ready(function () {
    	swipe();
    })
})(jQuery);
