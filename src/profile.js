/* 
 * Hanwoorii Profile Image Viewer
 *
 * Copyright (C) 2011  Hojung Youn <am0c@perl.kr>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function(){
    var exts = [ "bmp", "gif", "png", "jpg" ];
    var prfls = {};
    var do_cmtsimg = creat_creater(".replyContent", "prfl_c");
    var do_headimg = creat_creater("#columnRight .contentBody .xe_content", "prfl_h");
    function cmtsimg(o, id) {  do_cmtsimg(o, id, exts.length)  }
    function headimg(o, id) {  do_headimg(o, id, exts.length)  }
    function imgurl(id) {
        var b = "http://hanwoorii.com/xe/files/member_extra_info/profile_image/";
        return b + id.tail + "/" + id.head + "/" + id.number + ".";
    }
    function creat_creater(loc, cls) {
        return function(o, id, cnt) {
            var func = arguments.callee;
            var img;
            if (cnt == 0) {
                prfls[id.number] = "<img class='prfl_x " + cls + "'>"; 
                $(loc, o).prepend(prfls[id.number]);
                return;
            }
            if (id.number in prfls) {
                $(loc, o).prepend(prfls[id.number]);
                return;
            }
            img = imgurl(id) + exts[cnt-1];
            $.ajax({
                url: img,
                success: function() {
                    prfls[id.number] = "<img class='" + cls + "' src='" + img + "' />";
                    $(loc, o).prepend(prfls[id.number]);
                },
                error: function() {
                    func(o, id, cnt-1);
                }
            });
        }
    }
    function parse_mem_id(ms) {
        var id = ms.match(/^member_((\d+?)(\d{3}))$/);
        var hs = id[2];
        var ts = id[3];
        while (hs.length < 3)
            hs = "0".concat(hs);
        if (id == null)
            return;
        return { full: hs.concat(ts), head: hs, tail: ts, number: id[1] };
    }
    function head() {
        var memstr = $("#columnRight .titleAndUser .author span").attr("class");
        var id = parse_mem_id(memstr);
        headimg(document.documentElement, id);
    }
    function cmts() {
        $("#columnRight .replyItem").each(function(idx){
            var memstr = $(".author div", this).attr("class");
            var id = parse_mem_id(memstr);
            cmtsimg(this, id);
        })
    }
    head();
    cmts();
})();

