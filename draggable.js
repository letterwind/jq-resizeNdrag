(function($){
    $.fn.draggable = function (options) {
        const $document = $(document);
        const $draggableElement = this;

        const minX = 20;
        const minY = 20;

        let clientX = 0, clientY = 0, elementX = 0, elementY = 0; 
        $draggableElement.addClass('draggable');
        $draggableElement.css('cursor', 'move');
        $draggableElement.on('mouseup', function(e){
            e.preventDefault();
            $draggableElement.unbind('mousemove');
        });

        $draggableElement.on('mousedown', function(e) {
            e.preventDefault();
            clientX = e.clientX;
            clientY = e.clientY;
            elementX = $(this).offset().left;
            elementY = $(this).offset().top;
            $draggableElement.on('mousemove', function(e) {
                const dx = e.clientX - clientX;
                const dy = e.clientY - clientY;

                $(this).offset({left: elementX + dx ,top: elementY + dy});
            });
        });

        return this;
    }
}(jQuery));