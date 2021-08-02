(function($){
    $.fn.resizable = function (options) {
        // This is the easiest way to have default options.
        // var settings = $.extend({
        //     // These are the defaults.
        //     color: "#556b2f",
        //     backgroundColor: "white"
        // }, options );

        const $document = $(document);
        const $resizableElement = this;

        const minX = 20;
        const minY = 20;
        const minWidth = 10;
        const minheight = 10;

        // current position of mouse
        let clientX = 0;
        let clientY = 0;

        // dimension of element
        let w = 0;
        let h = 0;
        $resizableElement.addClass('resizable')
        $('<div class="resizer resize-r" />').appendTo($resizableElement);
        $('<div class="resizer resize-b" />').appendTo($resizableElement);
        $('<div class="resizer resize-rb" />').appendTo($resizableElement);
        $('<div class="resizer resize-l" />').appendTo($resizableElement);
        $('<div class="resizer resize-t" />').appendTo($resizableElement);
        $('<div class="resizer resize-lt" />').appendTo($resizableElement);
        $resizableElement.find('.resizer').on('mouseup', function(e){
            e.preventDefault();
            e.stopPropagation();
            $document.unbind('mousemove');
            $document.unbind('mousedown');
        });

        const resizeRBDownHandler = (e) => {
            e.preventDefault();
            resizeRightDownHandler(e);
            resizeBottomDownHandler(e);
        };

        const resizeRightMoveHandler = (e) => {
            e.preventDefault();                
            const dx = e.clientX - clientX                            
            let new_width = w + dx;
            $resizableElement.width(new_width > minWidth ? new_width : minWidth);
        };

        const resizeRightDownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // mouse X of document
            clientX = parseFloat(e.clientX);
            w = parseFloat($resizableElement.width());
            
            $document.bind('mousemove', resizeRightMoveHandler);
        };

        const resizeBottomMoveHandler = (e) => {
            e.preventDefault();
            const dy = e.clientY - clientY;                            
            let new_height = h + dy;
            if(new_height > minheight) {
                $resizableElement.height(new_height);
            }
        };

        const resizeBottomDownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // mouse Y of document
            clientY = parseFloat(e.clientY);
            h = parseFloat($resizableElement.height());            
            $document.bind('mousemove', resizeBottomMoveHandler);
        };

        // ========

        const resizeLTDownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            resizeLeftDownHandler(e);
            resizeTopDownHandler(e);
        };

        const resizeLeftMoveHandler = (e) => {
            e.preventDefault();
            if(e.clientX <= minX) return;
            const dx = e.clientX - clientX
            let new_width = w - dx;
            if(new_width > minWidth) {
                $resizableElement.width(new_width);
                $resizableElement.offset({left: e.clientX});
            } else {
                $resizableElement.width(minWidth);
            }
        };

        const resizeLeftDownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // mouse X of document
            clientX = parseFloat(e.clientX);
            w = parseFloat($resizableElement.width());            
            $document.bind('mousemove', resizeLeftMoveHandler);
        };

        const resizeTopMoveHandler = (e) => {
            e.preventDefault();
            if(e.clientY <= minY) return;
            const dy = e.clientY - clientY;                            
            let new_height = h - dy;
            if(new_height > minheight) {
                $resizableElement.height(new_height);
                $resizableElement.offset({top: e.clientY});
            }
        };

        const resizeTopDownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // mouse Y of document
            clientY = parseFloat(e.clientY);
            h = parseFloat($resizableElement.height());            
            $document.bind('mousemove', resizeTopMoveHandler);
        };

        // =====

        $resizableElement.on('mousedown', '.resize-r', resizeRightDownHandler);
        $resizableElement.on('mousedown', '.resize-b', resizeBottomDownHandler);
        $resizableElement.on('mousedown', '.resize-rb', resizeRBDownHandler);

        // ======

        $resizableElement.on('mousedown', '.resize-l', resizeLeftDownHandler);
        $resizableElement.on('mousedown', '.resize-t', resizeTopDownHandler);
        $resizableElement.on('mousedown', '.resize-lt', resizeLTDownHandler);
        return this;
    };
}(jQuery));