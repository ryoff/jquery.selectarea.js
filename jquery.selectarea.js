/**
 *  jquery selection area plugin
 *  
 *  author
 *      ryoff
 */
(function(jQuery) {
    jQuery.fn.selectArea = function(config){
        if (!!window.opera&&!window.console) {console={log:opera.postError}};
//        var defaults = {
//        };
//        var opt = jQuery.extend(defaults, config);
        // elementの状態
        var obj_state = {
            x: this.position().left,
            y: this.position().top
        };
        // state
        var state = {
            down: false,
            sx: 0, // start X : pageX at mouse down
            sy: 0,
            px: 0, // pageX
            py: 0,
            ox: 0, // pageX - obj_state.x
            oy: 0,
            box :   jQuery(document.createElement('div')).css({
                        width: 1,
                        height: 1,
                        position: 'absolute',
                        top: 1,
                        left: 1,
                        border: '1px dotted gray',
                        zIndex: '1',
                        id: 'selectAreaBox'
                    })
        };

        
        // bind mouse down
        this.bind('mousedown.selectArea', mouseDownSelectArea);
        state.box.bind('mousedown.selectArea', mouseDownSelectArea);
        function mouseDownSelectArea(e){
            state.down = true;
            state.px = state.sx = e.pageX;
            state.py = state.sy = e.pageY;
            state.box.css('top', state.sy)
                     .css('left', state.sx)
                     .css('width', 1)
                     .css('height', 1)
            // 範囲枠作成
            $("body").prepend(state.box);
        };

        // bind mouse move
        this.bind('mousemove.selectArea', mouseMoveSelectArea);
        state.box.bind('mousemove.selectArea', mouseMoveSelectArea);
        function mouseMoveSelectArea(e){
            if (!state.down) return false;
            state.px = e.pageX;
            state.py = e.pageY;
            state.box.css('width', state.px - state.sx)
                     .css('height', state.py - state.sy);
            
            // debug
            $('#info').text("state: " + state.down);
        };

        // bind mouse up
        this.bind('mouseup.selectArea', mouseUpSelectArea);
        state.box.bind('mouseup.selectArea', mouseUpSelectArea);
        function mouseUpSelectArea(e){
            state.down = false;
            state.ox = state.px - obj_state.x;
            state.oy = state.py - obj_state.y;
        };
    }
})(jQuery);
