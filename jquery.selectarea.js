/**
 *  jquery selection area plugin
 *  
 *  author
 *      ryoff
 */
(function(jQuery) {
    jQuery.fn.selectArea = function(fn){
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
            box :   jQuery(document.createElement('layer')).css({
                        width: 1,
                        height: 1,
                        position: 'absolute',
                        top: 1,
                        left: 1,
                        border: '1px dotted gray',
                        display: 'none',
                    })
        };
        // 範囲枠作成
        $("body").prepend(state.box);

        
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
                     .css('display', 'block')
            return false;
        };

        // bind mouse move
        this.bind('mousemove.selectArea', mouseMoveSelectArea);
        state.box.bind('mousemove.selectArea', mouseMoveSelectArea);
        function mouseMoveSelectArea(e){
            if (!state.down) return false;
            state.py = e.pageY;
            state.px = e.pageX;
            if (state.sy <= state.py) {
                state.box.css('height', state.py - state.sy);
            }
            else {
                state.box.css('top', state.py);
                state.box.css('height', state.sy - state.py);
            }
            if (state.sx <= state.px) {
                state.box.css('width', state.px - state.sx);
            }
            else {
                state.box.css('left', state.px);
                state.box.css('width', state.sx - state.px);
            }
            // debug
            $('#info').text("state: " + state.down + '   px:'+state.px+' py:'+state.py+' sx:'+state.sx+' sy:'+state.sy);
            return false;   
        };

        // bind mouse up
        this.bind('mouseup.selectArea', mouseUpSelectArea);
        state.box.bind('mouseup.selectArea', mouseUpSelectArea);
        function mouseUpSelectArea(e){
            state.down = false;
            state.ox = state.px - obj_state.x;
            state.oy = state.py - obj_state.y;
            var rtn = {
                'ay': parseInt(state.box.css('top')) - obj_state.y,
                'ax': parseInt(state.box.css('left')) - obj_state.x,
                'by': parseInt(state.box.css('top')) + parseInt(state.box.css('top')) - obj_state.y,
                'bx': parseInt(state.box.css('left')) + parseInt(state.box.css('left')) - obj_state.x,
            };
            fn(rtn);
        };
    }
})(jQuery);
